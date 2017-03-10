<script>
    import Konva from '../../../plugins/konva/konva-map'

	export default {
    	// 实例挂载后的生命周期，不保证组件已在document中
		mounted(){
			let konva = new Konva()
			konva.addBackGroundImg()
			konva.bindEvents(this)
            console.log(this)
            this.konva = konva
		},
		// 销毁先动作
		beforeDestory(){

        },
		methods:{
			...Vuex.mapActions('home',[
				'outputCover',
				'deleteCover'
			])
		}

	}
</script>

<template>
    <div id="konva-stage"></div>
</template>

<style lang="sass">
    @import "./index.scss"
</style>