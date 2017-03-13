<script>
	export default {
		data: () => {
			return {
				types: {矩形: 'rect', 圆形: 'circular', 多边形: 'polygon'}
			}
		},
		methods: {
			selectType: function (type) {
				this.$emit('selectType', type)
			},
			...Vuex.mapActions('home', [
				'showDelete'
			])
		},
		computed: Vuex.mapState('home', [
			'selectedType'
		])
	}
</script>


<template lang="pug" src="./index.pug"></template>
<style lang="sass">
    @import "./index.scss"
</style>