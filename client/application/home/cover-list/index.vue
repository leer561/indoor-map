<script>
	import {mapActions} from 'vuex'
	export default {
		computed: {
			list () {
				return this.$store.state.konva.coordinate
			}
		},
		methods:{
			...mapActions([
				'deleteCover'
			])
        }
	}
</script>


<template lang="pug" src="./index.pug"></template>
<style lang="sass">
    @import "./index.scss"
</style>