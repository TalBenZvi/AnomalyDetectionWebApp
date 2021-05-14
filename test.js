var model = require('./model/anomalyDetectionModel.js')

//anomalyReport = model.detect("1,1,1,1\n2,2,2,8\n3,3,3,3\n4,4,4,7\n5,5,6,4\n", "1,1,1,99\n99,2,99,8\n3,3,99,3\n99,4,4,7\n5,5,99,4\n", model.algorithms.REGRESSION_BASED)
anomalyReport = model.detect("1,1,1,1\n2,2,2,8\n3,3,3,3\n4,4,4,7\n5,5,5,4\n", "1,1,100,1\n2,2,200,8\n3,3,300,3\n4,4,400,7\n5.1,5,500,4\n", model.algorithms.HYBRID)

console.log(anomalyReport)