<script>
	import Konva from '../../../plugins/konva/playback'
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
			this.$http.get('/api/v1/tracks/1').then(res => {
				let tracks = res.body
				if (!tracks.length) return
				konva.drawTracks(tracks)
			})
		},
		methods: {
			showCover: function (data) {
				this.show = data
				this.konva.showCover(data)
			}
		}

	}
</script>

<template lang="pug" src="./index.pug"></template>

<style lang="sass">
    @import "./index.scss"
</style>