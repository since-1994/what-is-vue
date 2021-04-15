<template>
    <div>
    </div>
</template>

<script>
    export default {
        name:"App",
        data(){
            return {
                name: "",
                age: "",
                users:[
                    {
                        name: "minseok",
                        age: 28
                    }
                ]
            }
        },
        methods:{
            addUser(){
                this.users.push({
                    name: this.name,
                    age: 28
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>