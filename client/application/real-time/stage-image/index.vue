<script>
	import {changeData} from '../../../vuex/change-data'
	import forEach from 'lodash/forEach'
	export default {
		data: () => {
			return {
				maps: [],
				selectedMap: {}
			}
		},
		mounted(){
			// 请求数据
			this.$http.get('/weidian/api/maps').then(res => {
				let maps = res.body
				forEach(maps,map=>map.covers = changeData(map.covers, 'Pxels'))
				this.maps.push(...maps)
			})
		},
		methods: {
			...Vuex.mapActions('realTime', [
				'selectMap'
			])
		}
	}
</script>
<template lang="pug" src="./index.pug"></template>
<style lang="sass">
    @import "./index.scss"
</style>