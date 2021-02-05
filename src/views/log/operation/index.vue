<template>
    <div class="table-container">
        <h2>管理员操作明细</h2>
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
            <el-table-column label="操作时间" width="300">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ parseTime(scope.row.update_time) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="管理员" width="250">
                <template slot-scope="scope" >
                    <svg-icon icon-class="user"/>
                    <span style="margin-left: 10px">{{scope.row.user_name}}  ({{scope.row.user_no}})</span>
                </template>
            </el-table-column>
            <el-table-column label='操作明细'>
                <template slot-scope="scope">
                    <span>{{ scope.row.detail}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
            @current-change="num => { 
                pageNo = num
                initOperationRecord() 
            }" 
            :total="accessRecordsCount" 
            background layout="prev, pager, next" 
            style="text-align: center;margin: 20px 0;">
        </el-pagination>
    </div>
</template>

<script>
import * as recordApi from '../../../api/record'
import * as userApi from '../../../api/user'
import { parseTime } from '@/utils/index'
export default {
    data(){
        return {
            accessRecords: [],
            accessRecordsCount: 0,
            pageNo: 1,
            pageSize: 10,
            user_no: null,
            inputValue: '',
            suggestionArr: ['a','b']
        }
    },

    mounted(){
        this.initOperationRecord()
    },

    methods: {
        parseTime,
        //初始化
        async initOperationRecord(){
            var res = await recordApi.listRecord({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                theme_id: this.$store.state.admin.themeInfo.id,
                user_no: this.user_no
            })
            this.accessRecordsCount = res.data.count
            this.accessRecords = res.data.rows
            this.user_no = null
        },

        async querySearch(queryString, cb) {
            var res = await userApi.getUserInfo({
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
            this.user_no = e.user_no
            this.initOperationRecord()
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