<script>
	export default {
		data: () => {
			return {
				selectedMap: {}
			}
		},
		mounted(){
			// 请求数据
			this.$http.get('/weidian/api/maps').then(res => this.getMaps(res.body))
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