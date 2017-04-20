<script>
	import {changeData} from '../../../vuex/change-data'
	import forEach from 'lodash/forEach'
	export default {
		data: () => {
			return {
				selectedMap: {}
			}
		},
		mounted(){
			// 请求数据
			this.$http.get('/weidian/api/maps').then(res => {
				let maps = res.body
				forEach(maps, map => map.covers = changeData(map.covers, 'Pxels'))
				this.getMaps(maps)
			})
		},
		methods: {
			...Vuex.mapActions('home', [
				'selectMap',
				'getMaps'
			])
		},
		computed: Vuex.mapState('home', [
			'maps'
		])
	}
</script>
<template lang="pug" src="./index.pug"></template>
<style lang="sass">
    @import "./index.scss"
</style>