<template>
    <div id="app">
        <div id="editor-main">
            <le-editor v-model="value" :hljs-css="hljsCss" :image-uploader="imageUploader" @save="save"></le-editor>
        </div>
    </div>
</template>
  
<script>
export default {
    name:'MarkdownComp',
    // ...
    setup:{
        data() {
        return {
            hljsCss: 'agate',
            value: '这里放markdown内容',
            // 自定义
            imageUploader: {
                custom: false,
                fileType: 'file',
                fileNameType: '',
                imagePrefix: 'http://106.54.92.121', // 图片上传成功后，预览地址前缀
                type: 'server',
                url: 'http://106.54.92.121:82/upload' // 上传接口地址
            }
        }
    },
    methods: {
        // 自定义图片上传
        // uploadImg: function ($vm, file, fileName) {
        //   console.log($vm)
        //   console.log(file)
        //   console.log(fileName)
        //   // 添加图片
        //   // 两个参数 第一个是图片访问路径 第二个是文件名
        //   $vm.insertImg(`${$vm.config.imageUploader.imagePrefix}${fileName}`, fileName)
        // },
        save: function (val) {
            // 获取预览文本
            console.log(this.value) // 这里是原markdown文本
            console.log(val) // 这个是解析出的html
        }
    },
    mounted() {
    }
    }
}
</script>
  
<style lang="scss">
#app {
    width: 1200px;
    height: 500px;
    margin: 50px auto;
}

#editor-main {
    color: #2c3e50;
    width: 100%;
    height: 100%;
}
</style>