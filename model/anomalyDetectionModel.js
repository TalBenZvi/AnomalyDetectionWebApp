var simpleDetection = require('./simpleAnomalyDetector.js')
var ts = require('./timeSeries.js')

const algorithms = {
    REGRESSION_BASED: "regression_based",
    HYBRID: "hybrid",
}

function detect(normalDataString, anomalousDataString, algorithm) {
    let normalTimeSeries = new ts.TimeSeries(normalDataString)
    let anomalousTimeSeries = new ts.TimeSeries(anomalousDataString)
    switch (algorithm) {
        case algorithms.REGRESSION_BASED:
            return new simpleDetection.SimpleAnomalyDetector().detect(normalTimeSeries, anomalousTimeSeries)
        case algorithms.HYBRID:
            break;
        default:
            break;
    }
}

module.exports.algorithms = algorithms
module.exports.detect = detect