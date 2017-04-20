<template lang="pug" src="./index.pug"></template>

<script>
    export default{
        data: function(){
            return{
                title:'微店室内定位项目',
                nav:[
                    {text:'设置', value:'home'},
					{text:'轨迹回放', value:'playback'},
					{text:'实时展示', value:'real-time'}
                ],
                currentRouter:'#home'
            }
        }
    }
</script>
<style lang="sass">
    @import "./index.scss"
</style>