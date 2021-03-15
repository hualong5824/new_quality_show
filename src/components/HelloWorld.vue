<template>
  <div class="body">
    <span>{{'我的id是：'+ttt()}}</span>
  </div>
</template>
 
<script>
export default {
  computed: {
    id: function () {
      return this.$route.params.id //参数都保存在params中
    }
  },
	methods:{
		ttt(){
			return '我的第一个id是'+this.$route.params.id +'我的第二个id是'+this.$route.params.uuuu//参数都保存在params中
		}
	},
  created () {
    console.log(this.$route) // 当前子页面路由信息
    console.log(this.$router) // 全局路由信息
  }
}
</script>
 
<style  scoped>
.body{
  margin-top: 20px;
  padding: 20px;
  height: 400px;
  background: greenyellow;
}
</style>