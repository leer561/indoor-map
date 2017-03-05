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
					let layer = new Konva.Layer()

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
						layer.add(yoda)
						stage.add(layer)
					}

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
						stage.on('mousemove', () => {
							let pointEnd = stage.getPointerPosition()
							console.log('usual mousemove ' + JSON.stringify(stage.getPointerPosition()))
						})
					})

					stage.on('mouseup', () => {
						console.log('usual mouseup ' + JSON.stringify(stage.getPointerPosition()))
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