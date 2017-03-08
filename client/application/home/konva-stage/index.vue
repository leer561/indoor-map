<script>
    import Konva from '../../../plugins/konva/konva-map'
	export default {
    	directives:{
    		konva:{
				inserted: function (el, binding, vnode) {
					let konva = new Konva()
					konva.addBackGroundImg()
                    konva.bindEvents()
				}
			}
        }
	}
</script>

<template>
    <div id="konva-stage" v-konva></div>
</template>

<style lang="sass">
    @import "./index.scss"
</style>