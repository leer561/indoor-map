<script>
	export default {
		data: () => {
			return {
				maps: [],
				selectedMap: {}
			}
		},
		mounted(){
			// 请求数据
			this.$http.get('/api/maps').then(res => this.maps.push(...res.body))
		},
		methods: {
			...Vuex.mapActions('home', [
				'selectMap'
			])
		}
	}
</script>
<template lang="pug" src="./index.pug"></template>
<style lang="sass">
    @import "./index.scss"
</style>