<script>
	import forEach from 'lodash/fp/forEach'
	import Konva from '../../../plugins/konva/konva-map'
	import coverList from '../cover-list'
	import coverType from '../cover-type'
	export default {
		// 实例挂载后的生命周期，不保证组件已在document中
		mounted(){
			let konva = new Konva()
			this.konva = konva
			this.konva.bindEvents(this)
		},
		methods: {
			// 删除图形
			deleteFromCovers: function (cover) {
				this.deleteCover(cover)
				this.konva.deleteCoverByName(cover)
			},
			// 选择图形类型
			selectCoverType: function (type) {
				this.selectType(type)
				this.konva.graphicType = type
				this.konva.remark = prompt("请输入简单备注", "例如儿童商店一号厅")
			},
			...Vuex.mapActions('home', [
				'outputCover',
				'deleteCover',
				'selectType',
                'clearCovers'
			])
		},
		computed: Vuex.mapState('home', [
			'showDelete',
			'selectedMap'
		]),
		watch: {
			selectedMap: function (map) {
				if (!map.id) return
				this.konva.addBackGroundImg(map.background)
				this.konva.drawCovers(map.covers)
				this.clearCovers()
				forEach(cover => this.outputCover(cover), map.covers)
			}
		},
		components: {
			coverList,
			coverType
		}

	}
</script>

<template>
    <div class="row">
        <div class="col-10">
            <div id="konva-stage"></div>
            <cover-list v-on:delete='deleteFromCovers' v-if="showDelete"></cover-list>
        </div>
        <div class="col-2">
            <cover-type v-on:selectType='selectCoverType'></cover-type>
        </div>
    </div>
</template>

<style lang="sass">
    @import "./index.scss"
</style>