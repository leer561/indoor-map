<script>
	import merge from 'lodash/merge'
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
				this.$http.put(`/api/v1/maps/${tempMap.id}`, tempMap)
			},
			...Vuex.mapActions('home', [
				'showDelete'
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