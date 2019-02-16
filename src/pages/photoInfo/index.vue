<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dataFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>

    <hr>

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <img
        class="preview-img"
        v-for="(item, index) in list"
        :key="index"
        :src="item.src"
        height="100"
        @click="$preview.open(index, list)"
      >
    </div>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置一个现成的 评论子组件 -->
    <comment :id="id"></comment>
  </div>
</template>
<script>
// 1. 导入 评论子组件
// import comment from "../../components/subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: []
    };
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("getimageInfo/" + this.id).then(result => {
          console.log(result.body.message)
        if (result.body.status == 0) {
          this.photoinfo = result.body.message[0];
        }
      });
    },
    getThumbs() {
      this.$http.get("getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 循环每个图片数据，补全图片的宽和高
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          // 把完整的数据保存到 list 中
          this.list = result.body.message;
        }
      });
    }
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs()
  }
};
</script>
<style lang="less" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs {
    img {
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>