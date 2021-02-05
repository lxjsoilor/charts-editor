<template>
    <div class="container">
        <div class="head">当前角色：{{role_name}}</div>
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkOptions">
            <el-checkbox v-for="item in options" :label="item.id" :key="item.id">{{item.remark}}</el-checkbox>
        </el-checkbox-group>
        <div class="btn-group">
            <el-button type="info" size="small">清空</el-button>
            <el-button type="success" size="small" @click="save">保存</el-button>
        </div>
    </div>
</template>
<script>
import * as api from '@/api/admin'
export default {
    name: 'AdminAuth',

    data(){
        return {
            role_name: '',
            checkAll: false,
            options: [],
            checkOptions: []
        }
    },

    mounted(){
        this.role_name = this.$route.query.name
        api.getAccessList().then(res => {
            this.options = res.data
        })
        api.getAccessList({
            role_id: this.$route.query.id
        }).then(res => {
            var checkOptions = []
            res.data.map(item => {
                checkOptions.push(item.id)
            })
            this.checkOptions = checkOptions
        })
    },

    methods: {
        handleCheckAllChange(value){
            if(value){
                this.checkOptions = this.options.reduce((acc, curValue) => ([...acc, curValue.id]),[])
            }else{
                this.checkOptions = []
            }            
        },

        save(){
            this.loading = this.$loading()
            api.assignAccessToRole({
                role_id: this.$route.query.id,
                access_id: this.checkOptions
            }).then(res => {
                this.loading.close()
                this.$router.go(-1)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .el-checkbox{
        margin: 15px;
    }
    .btn-group{
        margin-top: 50px;
        text-align: center;
    }
</style>