<script>
	export default {
		computed: Vuex.mapState('home', [
			'covers'
		]),
		methods: {
			deleteCover: function (cover) {
				this.$emit('delete', cover)
			},
            ...Vuex.mapActions('home',[
            	'showDelete'
            ])
		}
	}
</script>
<template lang="pug" src="./index.pug"></template>
<style lang="sass">
    @import "./index.scss"
</style>