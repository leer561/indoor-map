export const IMG = require('../../assets/background.jpg')
export const SIZE = {
	container: 'konva-stage',   // id of container <div>
	width: 1366,
	height: 768
}

// 矩形需要的长宽
export let getSize = (pointStart, pointEnd) => {
	return {
		width: pointEnd.x - pointStart.x,
		height: pointEnd.y - pointStart.y
	}
}

// 圆形需要的半径
export let getRadius = (pointStart, pointEnd) => {
	let temp = Math.pow((pointEnd.x - pointStart.x), 2) + Math.pow((pointEnd.y - pointStart.y), 2)
	return Math.round(Math.sqrt(temp))
}

// 多边形是否靠近起点的判断
export let checkClosed = (pointStart, pointEnd, consult = 5) => {
	return Math.abs(pointEnd.x - pointStart.x) <= consult || Math.abs(pointEnd.y - pointStart.y) <= consult
}


