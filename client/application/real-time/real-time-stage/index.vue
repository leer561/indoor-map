<script>
	import Konva from '../../../plugins/konva/real-time'
	export default {
		data: () => {
			return {
				show: true
			}
		},
		mounted(){
			let konva = new Konva()
			konva.addBackGroundImg()
			this.konva = konva

			// 请求数据
			this.$http.get('/api/v1/maps/1').then(res => {
				let covers = res.body
				if (!covers.length) return
				konva.drawCovers(covers)
			})

			// 获取实时数据
			this.showPoints()
			this.showPointsInterval = setInterval(this.showPoints, 5000)
		},
		methods: {
			showCover: function (data) {
				this.show = data
				this.konva.showCover(data)
			},
			showPoints: function () {
				this.$http.get('/api/v1/realTime').then(res => {
					let points = res.body
					if (!points.length) return
					this.konva.drawPoints(points)
				})
			}
		},

		//组件销毁
		destroyed(){
			if (this.showPointsInterval) {
				clearInterval(this.showPointsInterval)
			}
        }

	}
</script>

<template lang="pug" src="./index.pug"></template>

<style lang="sass">
    @import "./index.scss"
</style>