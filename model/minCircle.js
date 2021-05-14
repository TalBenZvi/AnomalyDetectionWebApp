var util = require('./anomalyDetectionUtil.js')

function Circle(centerPoint, radius) {
    this.center = centerPoint
    this.radius = radius
}

function dist(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y))
}

function circleFrom2Points(a, b) {
    let x = (a.x + b.x) / 2
	let y = (a.y + b.y) / 2
	let r = dist(a, b) / 2
	return new Circle(new util.Point(x,y),r)
}

function circleFrom3Points(a, b, c) {
	// find the circumcenter of the triangle a,b,c
	let mAB = new util.Point((a.x + b.x) / 2, (a.y + b.y) / 2)              // mid point of line AB
	let slopAB = (b.y - a.y) / (b.x - a.x)                                  // the slop of AB
	let pSlopAB = -1 / slopAB                                               // the perpendicular slop of AB
	// pSlop equation is:
	// y - mAB.y = pSlopAB * (x - mAB.x) ==> y = pSlopAB * (x - mAB.x) + mAB.y
	
	let mBC = new util.Point((b.x + c.x) / 2, (b.y + c.y) / 2)              // mid point of line BC
	let slopBC = (c.y - b.y) / (c.x - b.x)                                  // the slop of BC
	let pSlopBC = -1 / slopBC                                               // the perpendicular slop of BC
	// pSlop equation is:
	// y - mBC.y = pSlopBC * (x - mBC.x) ==> y = pSlopBC * (x - mBC.x) + mBC.y
	
	let x = (-pSlopBC * mBC.x + mBC.y + pSlopAB*mAB.x - mAB.y) / (pSlopAB - pSlopBC)
	let y = pSlopAB * (x - mAB.x) + mAB.y
	let center = new util.Point(x, y)
	let r = dist(center, a)
	return new Circle(center, r)
}

function trivialCircle(points){
	if (points.length == 0) {
        return new Circle(new util.Point(0, 0), 0)
    } else if (points.length == 1) {
		return new Circle(points[0], 0)
    } else if (points.length == 2) {
		return circleFrom2Points(points[0], points[1])
    }
	// maybe 2 of the points define a small circle that contains the 3ed point
	let c = circleFrom2Points(points[0], points[1])
	if (dist(points[2], c.center) <= c.radius) {
		return c
    }
	c = circleFrom2Points(points[0], points[2])
	if (dist(points[1], c.center) <= c.radius) {
		return c
    }
	c = circleFrom2Points(points[1], points[2])
	if (dist(points[0], c.center) <= c.radius) {
		return c
    }
	// else find the unique circle from 3 points
	return circleFrom3Points(points[0], points[1], points[2])
}

/*
algorithm welzl
    input: Finite sets P and R of points in the plane |R|<= 3.
    output: Minimal disk enclosing P with R on the boundary.

    if P is empty or |R| = 3 then
        return trivial(R)
    choose p in P (randomly and uniformly)
    D := welzl(P - { p }, R)
    if p is in D then
        return D

    return welzl(P - { p }, R U { p })
*/
function welzl(P, R) {
	if (P.length == 0 || R.length == 3) {
		let c0 = trivialCircle(R)
		return c0
	}

	// remove random point p
	let index = Math.floor(Math.random() * P.length)
    let p = new util.Point(P[index].x, P[index].y)
    let PCopy = [...P]
    PCopy.splice(index, 1)
	let c = welzl(PCopy, R)
	if (dist(p, c.center) <= c.radius)
		return c
	RCopy = [...R]
	RCopy.push(p)
	let c2 = welzl(PCopy, RCopy)
	return c2
}

function findMinCircle(points) {
	return welzl(points, [])
}

module.exports.Circle = Circle
module.exports.findMinCircle = findMinCircle