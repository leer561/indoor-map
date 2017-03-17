<script>
	export default {
		data: () => {
			return {
				maps: [],
				tracks: [],
				selectedMap: {},
				selectedTrack: [],
				startTime: null,
				endTime: null
			}
		},
		mounted(){
			// 请求数据
			this.$http.get('/api/v1/maps').then(res => this.maps.push(...res.body))
		},
		methods: {
			getTracks: function (map) {
				this.selectMap(map)
				this.$http.get(`/api/v1/tracks/${map.id}`).then(res => {
					if (this.tracks.length) {
						this.tracks.splice(0, this.tracks.length)
					}
					this.tracks.push(...res.body)
				})
			},
			...Vuex.mapActions('playback', [
				'selectTrack',
				'selectMap'
			])
		}
	}
</script>
<template lang="pug" src="./index.pug"></template>
<style lang="sass">
    @import "./index.scss"
</style>