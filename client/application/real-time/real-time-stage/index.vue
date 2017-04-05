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
			this.konva = konva
		},
		methods: {
			showCover: function (data) {
				this.show = data
				this.konva.showCover(data)
			},
			showPoints: function () {
				this.$http.get(`/api/v1/realTime/${this.selectedMap.id}`).then(res => {
					let points = res.body
					if (!points.length) return
					this.konva.drawPoints(points)
				})
			}
		},
		computed: Vuex.mapState('realTime', [
			'selectedMap'
		]),
		watch: {
			selectedMap: function (map) {
				if (!map.id) return
				this.konva.addBackGroundImg(map.background)
				this.konva.drawCovers(map.covers)
				// 获取实时数据
				this.showPoints()
				this.showPointsInterval = setInterval(this.showPoints, 5000)
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