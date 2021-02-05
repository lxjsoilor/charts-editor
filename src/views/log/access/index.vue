<template>
    <div>
        <count></count>
        <detail></detail>
    </div>
</template>

<script>
import Detail from './detail'
import Count from './count'

export default {
    name: 'accessLog',
    components: {
        Detail,
        Count
    }
}
</script>

