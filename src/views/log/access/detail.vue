<template>
    <div class="table-container">
        <h2>用户访问明细</h2>
        <div class="clearfix mb10">
            <div class="form-item">

                <el-autocomplete
                    class="inline-input"
                    v-model="inputValue"
                    :fetch-suggestions="querySearch"
                    placeholder="工号/姓名"
                    :trigger-on-focus="false"
                    @select="searchUserAccessRecord"
                >
                </el-autocomplete>

                <!-- <el-button size="mini" @click="searchUserAccessRecord">搜素</el-button> -->
            </div>
        </div>
        <el-table :data="accessRecords" style="width: 100%;">
            <el-table-column label="访问时间" width="300">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ parseTime(scope.row.time) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="访问用户" width="250">
                <template slot-scope="scope" v-if="scope.row.user ">
                    <svg-icon icon-class="user" v-if="$store.state.admin.themeInfo.manager_id == scope.row.user.user_no || scope.row.user.user_no == 'admin'" />
                    <span style="margin-left: 10px">{{scope.row.user.user_name }}</span>
                </template>
            </el-table-column>
            <el-table-column label='访问页面'>
                <template slot-scope="scope">
                    <span style="display: inline-block; width: 120px;">{{ scope.row.resource && scope.row.resource.menu_title }}</span>
                    <el-button circle icon="el-icon-share" size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
            @current-change="num => { 
                pageNo = num
                initAccessRecord() 
            }" 
            :total="accessRecordsCount" 
            background layout="prev, pager, next" 
            style="text-align: center;margin: 20px 0;">
        </el-pagination>
    </div>
</template>

<script>
import * as userAPi from '../../../api/user'
import { parseTime } from '@/utils/index'
export default {
    data(){
        return {
            accessRecords: [],
            accessRecordsCount: 0,
            pageNo: 1,
            pageSize: 10,
            user_id: null,
            inputValue: '',
            suggestionArr: ['a','b']
        }
    },

    mounted(){
        this.initAccessRecord()
    },

    methods: {
        parseTime,
        //初始化
        async initAccessRecord(){
            var res = await userAPi.getAccessRecord({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                theme_id: this.$store.state.admin.themeInfo.id,
                user_id: this.user_id
            })
            this.accessRecordsCount = res.data.count
            this.accessRecords = res.data.rows
            this.user_id = null
        },

        async querySearch(queryString, cb) {
            var res = await userAPi.getUserInfo({
                user_no: this.inputValue,
                user_name: this.inputValue
            })
            if(res.data){
                res.data.map(item => {
                    item.value = item.user_name + '(' + (item.job_desc || '') + ')'
                })
            }
            cb(res.data)
        },

        //根据用户工号搜索访问记录
        async searchUserAccessRecord(e){
            this.user_id = e.id
            this.initAccessRecord()
        }
    }
}
</script>

<style lang="scss">
.table-container{
    width: 80%;
    margin: 20px auto;
}
h2{
    text-align: center;
    font-size: 20px;
    color: #333;
}
.form-item{
    display: flex;
    justify-content: space-around;
    width: 200px;
    float: right;
}
</style>