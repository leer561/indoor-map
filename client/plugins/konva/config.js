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

// 绘图工具的图形
export const RECT = require('../../assets/rect.png')
export const POLYGON = require('../../assets/polygon.png')
export const CIRCULAR = require('../../assets/circular.png')

export let addInstrction = function (position = 1371) {
	[RECT, CIRCULAR, POLYGON].forEach((item, index) => {
		// TODO 需要改进正则表达式匹配
		let name = item.match(/\/(.*)\./)[1].split('/')[1]
		let yoda = new Konva.Image({
			x: position,
			y: 10 + index * 45,
			width: 30,
			height: 30,
			fill: '#29e',
			id: name,
			name: name
		})
		this.instructionLayer.add(yoda)

		// TODO 绑定hover 用于背景变色
		// yoda.on('mouseenter', evt => {
		// 	let shape = evt.target
		// 	document.body.style.cursor = 'pointer'
		// 	shape.scaleX(1.2);
		// 	shape.scaleY(1.2);
		// 	this.instructionLayer.draw()
		// })
		// yoda.on('mouseenter', evt => {
		// 	let shape = evt.target
		// 	document.body.style.cursor = 'default'
		// 	shape.scaleX(1);
		// 	shape.scaleY(1);
		// 	this.instructionLayer.draw()
		// })

		//绑定点击事件，选取工具
		yoda.on('click', evt => {
			this.graphicType = evt.target.name()
			evt.cancelBubble = true
			this.remark = prompt("请输入简单备注", "例如儿童商店一号厅")
		})

		let imageObj = new Image()
		imageObj.src = item
		imageObj.onload = () => {
			yoda.image(imageObj)
			this.instructionLayer.draw()
		}

	})
}

// 绘图工具增加背景层
export let addBackColor = function (position = 1366) {
	let rect = new Konva.Rect({
		x: position,
		y: 0,
		width: 40,
		height: 150,
		fill: '#ddd',
		opacity: 0.5,
		stroke: '#aaa',
		strokeWidth: '1'
	})
	this.instructionLayer.add(rect)
}



