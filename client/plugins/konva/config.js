export const IMG = require('../../assets/background.jpg')
export const SIZE = {
	container: 'konva-stage',   // id of container <div>
	width: 1366,
	height: 768
}

export let getSize = (pointStart, pointEnd) => {
	return {
		width: pointEnd.x - pointStart.x,
		height: pointEnd.y - pointStart.y
	}
}

