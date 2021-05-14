var util = require('./anomalyDetectionUtil.js')

const CORRELATION_THRESHOLD = 0.9
const ANOMALY_THRESHOLD_INCREASE = 1.1

function CorrelatedFeatures(index1, index2, correlation, line_reg, threshold) {
    this.index1 = index1
    this.index2 = index2
    this.correlation = correlation
    this.line_reg = line_reg
    this.threshold = threshold
}

function toPoints(xs, ys){
	let points = []
    for (let i = 0; i < xs.length; ++i) {
        points.push(new util.Point(xs[i], ys[i]))
    }
    return points
}

function findThreshold(points, line_reg) {
    let max = 0
    for (const point of points) {
        let d = util.dev(point, line_reg)
        if (d > max) {
            max = d
        }
    }
    return max
}

function SimpleAnomalyDetector() {
    this.learnHelper = function(pearson, index1, index2, points) {
        if (pearson > CORRELATION_THRESHOLD){
            let linear_reg = util.linear_reg(points)
            return new CorrelatedFeatures(
                index1,
                index2,
                pearson,
                linear_reg,
                findThreshold(points, linear_reg) * ANOMALY_THRESHOLD_INCREASE
            )
        }
        return null
    }

    this.learnNormal = function(timeSeries) {
        let correlatedFeaturesCollection = []
        let data = timeSeries.data
        for (let i = 0; i < data.length; ++i) {
            let maxCorrelation = 0
            let maxCorrelationIndex = 0
            for (let j = i + 1; j < data.length; ++j) {
                let pearson = Math.abs(util.pearson(data[i], data[j]))
                if (pearson > maxCorrelation) {
                    maxCorrelation = pearson
                    maxCorrelationIndex = j
                }
            }
            let points = toPoints(data[i], data[maxCorrelationIndex])
            let correlatedFeatures = this.learnHelper(maxCorrelation, i, maxCorrelationIndex, points)
            if (correlatedFeatures != null) {
                correlatedFeaturesCollection.push(correlatedFeatures)
            }
        }
        return correlatedFeaturesCollection
    }

    this.isAnomalous = function(point, correlatedFeatures){
        return util.dev(point, correlatedFeatures.line_reg) > correlatedFeatures.threshold
    }

    this.detect = function(normalTimeSeries, anomalousTimeSeries) {
        let anomalyReport = ""
        let anomalousData = anomalousTimeSeries.data
        let correlatedFeaturesCollection = this.learnNormal(normalTimeSeries)
        for (const correlatedFeatures of correlatedFeaturesCollection) {
            let anomalousIndices = []
            let featurePoints = toPoints(anomalousData[correlatedFeatures.index1], anomalousData[correlatedFeatures.index2])
            for (let j = 0; j < featurePoints.length; ++j) {
                if (this.isAnomalous(featurePoints[j], correlatedFeatures)) {
                    anomalousIndices.push(j)
                }
            }
            if (anomalousIndices.length != 0) {
                let reportLine = "Attributes " + correlatedFeatures.index1 + " and " + correlatedFeatures.index2 + " - anomalies in lines:"
                let range_start = anomalousIndices[0]
                let range_end = anomalousIndices[0]
                let i = 0
                while (i < anomalousIndices.length) {
                    while (i < anomalousIndices.length && anomalousIndices[i] + 1 == anomalousIndices[i + 1]) {
                        range_end = anomalousIndices[i + 1]
                        ++i
                    }
                    if (range_start == range_end) {
                        reportLine += " " + range_start + ","
                    } else {
                        reportLine += " " + range_start + "-" + range_end + ","
                    }
                    ++i
                    if (i < anomalousIndices.length) {
                        range_start = anomalousIndices[i]
                        range_end = anomalousIndices[i]
                    }
                }
                reportLine = reportLine.slice(0, -1) + '\n'
                anomalyReport += reportLine
            }
        }
        return anomalyReport
    }
}

module.exports.SimpleAnomalyDetector = SimpleAnomalyDetector