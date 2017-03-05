<template lang="pug" src="./index.pug"></template>

<script>
    export default{
        data: function(){
            return{
                title:'demo',
                nav:[
                    {text:'home', value:'home'}
                ],
                currentRouter:'#home'
            }
        }
    }
</script>
<style lang="sass">
    @import "./index.scss";
</style>