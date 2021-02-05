<template>
	<div class="container">
		<router-view />
	</div>
</template>

<script>
export default {
	
};
</script>

<style lang="scss">
body{
	background-color: #eee;
}
.container{
	min-height: 100vh;
	width: 1100px;
	margin: 10px auto;
	background-color: #fff;
	box-shadow: 0 0 5px #eee;
	border: 1px solid #ddd;
	padding: 20px 10px;
}
</style>