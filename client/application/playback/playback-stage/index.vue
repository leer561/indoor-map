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
			this.konva = konva
		},
		methods: {
			showCover: function (data) {
				this.show = data
				this.konva.showCover(data)
			}
		},
		computed: Vuex.mapState('playback', [
			'selectedMap',
            'selectedTrack'
		]),
		watch: {
			selectedMap: function (map) {
				if(!map.id) return
				this.konva.addBackGroundImg(map.background)
				this.konva.drawCovers(map.covers)
			},
			selectedTrack: function (track) {
				this.konva.drawTracks(track.tracks)
			}
		}

	}
</script>

<template lang="pug" src="./index.pug"></template>

<style lang="sass">
    @import "./index.scss"
</style>