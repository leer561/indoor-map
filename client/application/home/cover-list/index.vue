<script>
	export default {
		computed: Vuex.mapState('home', [
			'covers'
		])
	}
</script>


<template lang="pug" src="./index.pug"></template>
<style lang="sass">
    @import "./index.scss"
</style>