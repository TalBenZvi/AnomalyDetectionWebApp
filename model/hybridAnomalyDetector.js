var anomalyDetectionUtil = require('./anomalyDetectionUtil.js')
var simpleAnomalyDetection = require('./simpleAnomalyDetector.js')
var minCircle = require('./minCircle.js')

const HYBRID_CORRELATION_THRESHOLD = 0.5
const ANOMALY_THRESHOLD_INCREASE = 1.1

class HybridAnomalyDetector extends simpleAnomalyDetection.SimpleAnomalyDetector {
    constructor() {
        super()
    }

    learnHelper(pearson, index1, index2, points, correlatedFeaturesCollection) {
        super.learnHelper(pearson, index1, index2, points, correlatedFeaturesCollection)
        if (pearson > HYBRID_CORRELATION_THRESHOLD && pearson < this.threshold) {
            circle = findMinCircle(points)
            correlatedFeaturesCollection.push(new simpleAnomalyDetection.CorrelatedFeatures(
                index1,
                index2,
                pearson,
                null,
                circle.radius * ANOMALY_THRESHOLD_INCREASE,
                circle.x,
                circle.y
            ))
        }
    }

    isAnomalous(point, correlatedFeatures) {
        return (correlatedFeatures.correlation >= this.threshold && super.isAnomalous(point, correlatedFeatures))
            || (correlatedFeatures.correlation > HYBRID_CORRELATION_THRESHOLD && correlatedFeatures.correlation < this.threshold 
                && minCircle.dist(new anomalyDetectionUtil.Point(correlatedFeatures.cx, correlatedFeatures.cy), point) > correlatedFeatures.threshold)
    }             
}

module.exports.HybridAnomalyDetector = HybridAnomalyDetector