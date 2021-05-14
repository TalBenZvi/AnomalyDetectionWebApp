var simpleDetection = require('./simpleAnomalyDetector.js')
var ts = require('./timeSeries.js')

const algorithms = {
    REGRESSION_BASED: "regression_based",
    HYBRID: "hybrid",
}

function detect(normalDataString, anomalousDataString, algorithm) {
    normalTimeSeries = new ts.TimeSeries(normalDataString)
    anomalousTimeSeries = new ts.TimeSeries(anomalousDataString)
    switch (algorithm) {
        case algorithms.REGRESSION_BASED:
            report = new simpleDetection.SimpleAnomalyDetector().detect(normalTimeSeries, anomalousTimeSeries)
            return report
        case algorithms.HYBRID:
            break;
        default:
            break;
    }
}

module.exports.algorithms = algorithms
module.exports.detect = detect