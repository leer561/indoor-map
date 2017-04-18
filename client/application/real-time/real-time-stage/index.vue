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
			}
		},
		computed: {
			...Vuex.mapState('realTime', ['selectedMap']),
			...Vuex.mapState('dataExpress', ['dart'])
		},
		watch: {
			selectedMap: function (map) {
				if (!map.id) return
				this.konva.addBackGroundImg(map.background)
				this.konva.drawCovers(map.covers)
				// 获取实时数据
				this.konva.drawPoints(this.points)
			},
			dart: function () {
				this.konva.drawPoints(this.points)
			}
		}

	}
</script>

<template lang="pug" src="./index.pug"></template>

<style lang="sass">
    @import "./index.scss"
</style>