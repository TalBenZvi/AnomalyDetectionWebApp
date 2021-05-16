var simpleDetection = require('./simpleAnomalyDetector.js')
var hybridDetection = require('./hybridAnomalyDetector.js')
var ts = require('./timeSeries.js')

const algorithms = {
    REGRESSION_BASED: "Regression_based",
    HYBRID: "Hybrid",
}

function detect(normalDataString, anomalousDataString, algorithm) {
    let normalTimeSeries = new ts.TimeSeries(normalDataString)
    let anomalousTimeSeries = new ts.TimeSeries(anomalousDataString)
    if (algorithm == "Regression_based") {
        return new simpleDetection.SimpleAnomalyDetector().detect(normalTimeSeries, anomalousTimeSeries)
    } else if (algorithm == "Hybrid") {
        return new hybridDetection.HybridAnomalyDetector().detect(normalTimeSeries, anomalousTimeSeries)
    }
}

module.exports.algorithms = algorithms
module.exports.detect = detect