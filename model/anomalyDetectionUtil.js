function Point(x, y) {
    this.x = x
    this.y = y
}

function Line(a, b) {
    this.a = a
    this.a = b
    this.f = function(x) {
        return a * x + b
    }
}

// average of arr
function avg(arr){
	let sum = 0
	for (const num of arr) {
        sum += num
    }
	return sum/arr.length
}

// variance of arr
function variance(arr){
	let av = avg(arr)
	let sum = 0
	for (const num of arr) {
        sum += num * num
    }
	return sum/arr.length - av*av
}

// covariance of arr1 and arr2
function covariance(arr1, arr2){
	let sum = 0
	for (let i = 0; i < arr1.length; ++i){
		sum += arr1[i] * arr2[i]
	}
	sum /= arr1.length
	return sum - avg(arr1) * avg(arr2)
}

// Pearson correlation coefficient of arr1 and arr2
function pearson(arr1, arr2){
	return covariance(arr1, arr2) / (Math.sqrt(variance(arr1)) * Math.sqrt(variance(arr2)))
}

// performs a linear regression and returns the line equation
function linear_reg(points){
	let xs = []
    let ys = []
	for (let i = 0; i < points.length; ++i) {
		xs[i]=points[i].x
		ys[i]=points[i].y
	}
	let a = covariance(xs,ys) / variance(xs)
	let b = avg(ys) - a * avg(xs)
	return new Line(a,b)
}

// returns the deviation between point and line
function dev(point, line){
	return Math.abs(point.y - line.f(point.x))
}

module.exports.Point = Point
module.exports.Line = Line
module.exports.pearson = pearson
module.exports.linear_reg = linear_reg
module.exports.dev = dev
