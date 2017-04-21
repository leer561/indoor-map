<script>
	import groupBy from 'lodash/fp/groupBy'
	import forEach from 'lodash/forEach'
	import {changeData, changeToPxelsFunc} from '../../../vuex/change-data'
	import {DatePicker} from 'element-ui'
    import round from 'lodash/round'
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
			this.$http.get('/weidian/api/maps').then(res => {
				let maps = res.body
				forEach(maps, map => map.covers = changeData(map.covers, 'Pxels'))
				this.maps.push(...maps)
			})
		},
		methods: {
			getTracks: function () {
				this.isLoading = true
				this.$http.get('/api/dart', {
					params: {
						gte: round(this.startTime.getTime() / 1000),
						//mapId: this.selectedMap.id,
						lte: round(this.endTime.getTime() / 1000),
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
						itemPoint.tracks = changeToPxelsFunc(itemPoint.tracks)
						this.tracks.push(itemPoint)
					})
					this.isLoading = false
				})
			},
			...Vuex.mapActions('playback', [
				'selectTrack',
				'selectMap'
			])
		},
		components: {
			'data-picker': DatePicker
		}
	}
</script>
<template lang="pug" src="./index.pug"></template>
<style lang="sass">
    @import "./index.scss"
</style>