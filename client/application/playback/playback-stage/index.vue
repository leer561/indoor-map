<script>
	import Konva from '../../../plugins/konva/main'
	export default {
		// 实例挂载后的生命周期，不保证组件已在document中
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
		methods: {},
		components: {}

	}
</script>

<template>
    <div class="row">
        <div class="col-10">
            <div id="konva-stage"></div>
        </div>
        <div class="col-2">
            是否显示


        </div>
    </div>
</template>

<style lang="sass">
    @import "./index.scss"
</style>