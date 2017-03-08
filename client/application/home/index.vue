<script>
    import konvaStage from './konva-stage'
    import coverType from './cover-type'
    import coverList from './cover-list'
	export default {
    	components:{
    		konvaStage,
            coverType,
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
            <!--<div class="col-2">-->
                <!--<cover-type></cover-type>-->
                <!--<cover-list></cover-list>-->
            <!--</div>-->
        </div>

    </div>
</template>

<style lang="sass">
    @import "./index.scss"
</style>