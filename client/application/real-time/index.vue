<script>
	import realTimeStage from './real-time-stage'
	import stageImage from './stage-image'
	export default {
		components: {
			realTimeStage,
			stageImage
		}
	}
</script>

<template>
    <div id="#real-time" class="page container-fluid">
        <stage-image></stage-image>
        <real-time-stage></real-time-stage>
    </div>
</template>