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
					let imageObj = new Image()
					imageObj.onload = function() {
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
					imageObj.src = img
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