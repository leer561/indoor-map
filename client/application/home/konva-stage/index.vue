<script>
	import Konva from '../../../plugins/konva/konva-map'
	import coverList from '../cover-list'
	export default {
		// 实例挂载后的生命周期，不保证组件已在document中
		mounted(){
			let konva = new Konva()
			konva.addBackGroundImg()
			konva.bindEvents(this)
			this.konva = konva
		},
		// 销毁先动作
		beforeDestory(){

		},
		methods: {
			deleteFromCovers:function (cover) {
                this.deleteCover(cover)
                this.konva.deleteCover(cover)
			},
			...Vuex.mapActions('home', [
				'outputCover',
                'deleteCover'
			])
		},
		components: {
			coverList
		}

	}
</script>

<template>
    <div>
        <div id="konva-stage"></div>
        <cover-list v-on:delete = 'deleteFromCovers'></cover-list>
    </div>
</template>

<style lang="sass">
    @import "./index.scss"
</style>