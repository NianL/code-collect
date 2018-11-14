<template>
    <div class="main-tool">
      <template v-if="tabType==1">
        <div class="main-search">
          <input v-model="searchContent" onfocus="this.select()" placeholder="输入关键词模糊查询" />
        </div>
        <div class="main-tool-list">
          <template v-for="(item,index) in c_itemList">
            <a :key="index" class="item" @click="toolItemHandle(item)">{{item.title}}</a>
          </template>
        </div>
      </template>
      <template v-if="tabType==2">
        <go-back :name="currentMenu" />
        <component class="main-tool-item" :is="componentName" />
      </template>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentMenu: "tool",
      tabType: 1,
      searchContent: "",
      componentName: "",
      toolInfo: {
        routerName: "tool-item",
        list: [
          {
            title: "base64字符转换",
            name: "base64"
          },
          {
            title: "图片转base64",
            path: "script/module/tool/base64-img.js",
            name: "base64-img"
          },
          {
            title: "生成二维码",
            path: "script/module/tool/qrcode.js",
            name: "qrcode"
          },
          {
            title: "json格式化",
            path: "script/module/tool/json-format.js",
            name: "json-format"
          },
          {
            title: "文本编辑器",
            path: "script/module/tool/editor.js",
            name: "editor"
          }
        ]
      }
    };
  },
  components: {
    goBack: () => import("@/module/GoBack"),
    base64: () => import("./tool/base64")
  },
  watch: {
    $route() {
      this.init();
    }
  },
  computed: {
    c_itemList() {
      var result = [];
      var search = this.searchContent.toLowerCase();
      if (this.toolInfo.list && this.toolInfo.list.length) {
        this.toolInfo.list.map(item => {
          if (item.title.toLowerCase().indexOf(search) != -1) result.push(item);
        });
      }
      return result;
    }
  },
  created() {
    this.$emit("now-menu", this.currentMenu);
    this.init();
  },
  methods: {
    init() {
      var itemName = this.$route.params.name;
      if (itemName) {
        this.tabType = 2;
        this.componentName = itemName;
      } else {
        this.tabType = 1;
      }
    },
    toolItemHandle(item) {
      this.$router.push({
        name: this.toolInfo.routerName,
        params: {
          name: item.name
        }
      });
    }
  }
};
</script>

<style>
.main-tool .item {
  background: #eee;
  color: #666;
  font-size: 14px;
  border-radius: 2px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  padding: 0px 6px;
  margin-right: 8px;
  margin-bottom: 8px;
}

.main-tool .item:hover {
  background: #666;
  color: #eee;
}

.main-tool-list {
  padding-top: 15px;
}

.main-tool-item h3 {
  margin-bottom: 15px;
}

.main-form {
  line-height: 26px;
}

.main-form input {
  width: 600px;
  padding: 3px 2px;
  color: #333;
  font-size: 14px;
  line-height: 18px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 5px;
}

.main-form input:focus,
.main-form .input:focus,
.main-form textarea:focus,
.main-form .textarea:focus {
  border: 1px solid #999;
}

.main-form textarea,
.main-form .textarea {
  color: #333;
  font-size: 14px;
  line-height: 18px;
  width: 600px;
  height: 72px;
  background: #fff;
  border: 1px solid #ddd;
  word-break: break-all;
  overflow: auto;
  margin: 2px 0px;
  padding: 5px;
}
</style>