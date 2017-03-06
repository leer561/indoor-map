<script>
	let img = require('../../../assets/background.jpg')
	import Konva from 'konva'
	export default {
		directives: {
			konva: {
				inserted: function (el, binding, vnode) {
					let stage = new Konva.Stage({
						container: 'konva-stage',   // id of container <div>
						width: 1366,
						height: 768
					})
					let imgLayer = new Konva.Layer()

					// 添加背景图
					let imageObj = new Image()
					imageObj.src = img
					imageObj.onload = function () {
						let yoda = new Konva.Image({
							x: 0,
							y: 0,
							image: imageObj,
							width: 1366,
							height: 768
						})
						imgLayer.add(yoda)
						stage.add(imgLayer)
						imgLayer.moveToBottom()
						imgLayer.draw()
					}

					// 添加遮罩图层
					let coverLayer = new Konva.Layer({opacity: 0.5})
					// 添加临时矩形与绘图层
					let moveRect
					let moveLayer = new Konva.Layer({opacity: 0.5})

					stage.add(coverLayer)
					stage.add(moveLayer)

					// 画出的遮罩
					let coverHash = {}

					// 获取长宽函数
					let getSize = (pointStart, pointEnd) => {
						return {
							width: pointEnd.x - pointStart.x,
							height: pointEnd.y - pointStart.y
						}
					}

					// 监听事件
					stage.on('mousedown', () => {
						let pointStart = stage.getPointerPosition()
						moveRect = new Konva.Rect({
							x: pointStart.x,
							y: pointStart.y,
							width: 1,
							height: 1,
							fill: 'green',
							stroke: 'black',
							strokeWidth: 1
						})
						moveLayer.add(moveRect)

						// 鼠标移动
						stage.on('mousemove', () => {
							moveRect.size(getSize(pointStart, stage.getPointerPosition()))
							moveLayer.draw()
						})
					})

					stage.on('mouseup', () => {
						let rect = moveRect.clone()
						rect.size(getSize(rect.position(), stage.getPointerPosition()))
						moveRect.destroy()
						moveRect = null
						coverLayer.add(rect)
						coverLayer.draw()
						moveLayer.draw()
						stage.off('mousemove')
					})

				}
			}
		}
	}
</script>

<template>
    <div id="konva-stage" v-konva></div>
</template>

<style lang="sass">
    @import "./index.scss"
</style>