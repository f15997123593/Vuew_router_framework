<template>
  <div>
    <el-upload
        action=""
        :auto-upload="false"
        list-type="picture-card"
        :before-upload="beforeAvatarUpload"
        :on-preview="handlePictureCardPreview">
         <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "UserInfo",
  data() {
    return {
        dialogImageUrl: '',
        dialogVisible: false
    };
  },
  methods: {
      beforeAvatarUpload(file) {
        console.log(file);
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handlePictureCardPreview(file) {
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
  },
  mounted() {}
};
</script>

<style scoped>

</style>


