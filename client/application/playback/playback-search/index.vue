<script>
	export default {
		data: () => {
			return {
				maps: [],
				tracks: [],
				selectedMap: {},
				selectedTrack: [],
				startTime: null,
				endTime: null,
				isLoading: true
			}
		},
		mounted(){
			// 请求数据
			this.$http.get('/api/maps').then(res => this.maps.push(...res.body))
		},
		methods: {
			getTracks: function () {
				this.isLoading = true
				this.$http.get('/api/tracks', {
					params: {
						startTime: new Date(this.startTime).getTime(),
						mapId: this.selectedMap.id,
						endTime: new Date(this.endTime).getTime()
					}
				}).then(res => {
					if (this.tracks.length) {
						this.tracks.splice(0, this.tracks.length)
					}
					this.tracks.push(...res.body)
					this.isLoading = false
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