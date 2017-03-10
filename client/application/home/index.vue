<script>
    import konvaStage from './konva-stage'
    import coverList from './cover-list'
	export default {
    	components:{
    		konvaStage,
			coverList
        }
	}
</script>

<template>
    <div id="home" class="page container-fluid">
        <div class="row">
            <div class="col-10">
                <konva-stage></konva-stage>
            </div>
        </div>
        <cover-list></cover-list>

    </div>
</template>

<style lang="sass">
    @import "./index.scss"
</style>