
<script>
	import playbackStage from './playback-stage'
    import playbackSearch from './playback-search'
	export default {
		components:{
			playbackStage,
			playbackSearch
		}
	}
</script>

<template>
    <div id="playback" class="page container-fluid">
        <playback-search></playback-search>
        <playback-stage></playback-stage>
    </div>
</template>