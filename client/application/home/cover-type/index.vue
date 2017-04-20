<script>
	import merge from 'lodash/merge'
	import {changeData} from '../../../vuex/change-data'
	export default {
		data: () => {
			return {
				types: {矩形: 'rect', 圆形: 'circle', 多边形: 'polygon'}
			}
		},
		methods: {
			selectType: function (type) {
				this.$emit('selectType', type)
			},
			saveCovers: function () {
				let tempMap = merge({}, this.selectedMap, {covers: this.covers})
				delete tempMap.covers
				merge(tempMap, {covers: this.covers})
				tempMap.covers = changeData(tempMap.covers)
				this.$http.put(`/weidian/api/maps/${tempMap.id}`, tempMap).then(data => {
					let map = data.body
					map.covers = changeData(map.covers, 'Pxels')
					this.updateMap(map)
				})
			},
			...Vuex.mapActions('home', [
				'showDelete',
				'updateMap'
			])
		},
		computed: Vuex.mapState('home', [
			'selectedType',
			'covers',
			'selectedMap'
		])
	}
</script>


<template lang="pug" src="./index.pug"></template>
<style lang="sass">
    @import "./index.scss"
</style>