<template>
    <div class="newsinfo-container">
      <h1 class="title">{{newsinfo.title}}</h1>
      <p class="subtitle">
          <span>发表时间：{{ newsinfo.add_time | dataFormat}}</span>
      <span>点击：{{ newsinfo.click }}次</span>
      </p>
      <br>
      <!-- 内容区域 -->
      <div class="content" v-html="newsinfo.content"></div>
       <!-- 评论子组件区域 -->
    <comment :id="this.id"></comment>
    </div>
</template>
<script>
// 1. 导入 评论子组件
// import comment from "../subcomponents/comment.vue";
export default {
    data(){
        return {
            id:this.$route.params.id,
            newsinfo:{}
        };
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('getnew/'+this.id).then(result=>{
                this.newsinfo=result.body.message[0]
                console.log(result.body.message[0])
            })
        }
    },
    components:{
        // // 用来注册子组件的节点
        // "comment-box": comment
    }
}
</script>
<style lang="less">
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
