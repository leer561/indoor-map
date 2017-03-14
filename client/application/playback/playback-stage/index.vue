<script>
	import Konva from '../../../plugins/konva/main'
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

			// 请求数据
			this.$http.get('/api/v1/maps/1').then(res => {
				let covers = res.body
				if (!covers.length) return
				konva.drawCovers(covers)
			})
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