var model = require('./model/anomalyDetectionModel.js')

anomalyReport = model.detect("1,1,1,1\n2,2,2,8\n3,3,3,3\n4,4,4,7\n5,5,6,4\n", "1,1,1,99\n99,2,99,8\n3,3,99,3\n99,4,4,7\n5,5,99,4\n", model.algorithms.REGRESSION_BASED)

console.log(anomalyReport)