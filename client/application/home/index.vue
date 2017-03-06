<script>
    import konvaStage from './konva-stage'
	export default {
    	components:{
    		konvaStage
        }
	}
</script>

<template>
    <div id="home" class="page container-fluid">
        <div class="row">
            <div class="col-10">
                <konva-stage></konva-stage>
            </div>
            <div class="col-2"></div>
        </div>

    </div>
</template>

<style lang="sass">
    @import "./index.scss"
</style>