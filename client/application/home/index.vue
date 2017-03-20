<script>
	import konvaStage from './konva-stage'
    import stageImage from './stage-image'
	export default {
		components:{
			konvaStage,
			stageImage
		}
	}
</script>

<template>
    <div id="home" class="page container-fluid">
        <stage-image></stage-image>
        <konva-stage></konva-stage>
    </div>
</template>