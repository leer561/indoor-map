<template>
    <div id="app">
        <main-header></main-header>
        <router-view></router-view>
    </div>
</template>
<script>
	import MainHeader from './components/main-header/index.vue'

	export default {
		components: {
			MainHeader
		}
	}

</script>