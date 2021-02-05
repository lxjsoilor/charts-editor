<template>
    <div class="container">
        <div class="head">权限列表</div>
        <el-table
            :data="list"
            cell-class-name="cell"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="标识"
                width="220">
            </el-table-column>
            <el-table-column
                prop="remark"
                label="名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="remark"
                label="类型"
                width="180">
                <template slot-scope="scope">
                    {{scope.row.type == 1 ? '按钮' : '页面'}}
                </template>
            </el-table-column>
            <el-table-column
                prop="url"
                label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { getAccessList } from '@/api/admin'
export default {
    name: 'Access',

    data(){
        return {
            list: []
        }
    },

    mounted(){
        getAccessList().then(res => {
            this.list = res.data
        })
    }
}
</script>
