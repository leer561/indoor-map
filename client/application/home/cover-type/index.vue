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
				this.$http.put(`/weidian/api/maps/${tempMap.id}`, tempMap).then(data => this.updateMap(data.body))
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