<script>
	import groupBy from 'lodash/fp/groupBy'
	import forEach from 'lodash/forEach'
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
			this.$http.get('/weidian/api/maps').then(res => this.maps.push(...res.body))
		},
		methods: {
			getTracks: function () {
				this.isLoading = true
				this.$http.get('/api/dart', {
					params: {
						gte: new Date(this.startTime).getTime()/1000,
						//mapId: this.selectedMap.id,
						lte: new Date(this.endTime).getTime()/1000,
						filter: 'x,y,tag',
						by: 'timestamp'
					}
				}).then(res => {
					let data = res.body
					if (!data.length) {
						alert('没查询到数据!')
						return
					}
					// 清空数据
					if (this.tracks.length) {
						this.tracks.splice(0, this.tracks.length)
					}

					// 处理数据
					forEach(groupBy(item => item.tag)(data), (value, key) => {
						let itemPoint = {
							name: key,
							tracks: []
						}
						forEach(value, item => itemPoint.tracks.push(item.x, item.y))
						this.tracks.push(itemPoint)
					})
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