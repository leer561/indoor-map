<script>
	import Konva from '../../../plugins/konva/playback'
	export default {
		data: () => {
			return {
				show: true
			}
		},
		mounted(){
			let konva = new Konva()
			konva.addBackGroundImg()
			this.konva = konva
		},
		methods: {
			showCover: function (data) {
				this.show = data
				this.konva.showCover(data)
			}
		}

	}
</script>

<template lang="pug" src="./index.pug"></template>

<style lang="sass">
    @import "./index.scss"
</style>