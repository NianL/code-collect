<template>
  <div id="app">
    <div class="header">
      <div class="header-main">
        <menu-nav class="header-main-menu"
          v-if="menuHighlight" 
          :default-value="menuHighlight" 
          :data="menuData" 
          @menu-click="menuClick" />
      </div>
    </div>
    <div class="main">
        <router-view class="main-layout" @now-menu="nowMenu" />
    </div>
  </div>
</template>

<script>
import MenuNav from "@/module/MenuNav";

export default {
  name: "App",
  data() {
    return {
      menuHighlight: null,
      menuData: [
        {
          text: "首页",
          value: "home"
        },
        {
          text: "小玩意",
          value: "tool"
        },
        {
          text: "关于",
          value: "about"
        }
      ]
    };
  },
  components: {
    "menu-nav": MenuNav
  },
  methods: {
    nowMenu(value) {
      this.menuHighlight = value;
    },
    menuClick(item) {
      this.$router.push({
        name: item.value
      });
    }
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  background: #fff;
  color: #333;
}

a {
  cursor: pointer;
}

input::-webkit-input-placeholder {
  color: #ccc;
}

input,
textarea,
select,
button {
  outline: none;
  resize: none;
}

textarea {
  display: block;
}

.header {
  background: #f5f5f5;
  position: fixed;
  z-index: 10;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 40px;
  border: 1px solid #eee;
}

.header-main {
  width: 1100px;
  margin: 0 auto;
}

.header-main-menu {
  position: absolute;
  bottom: 0px;
}

.main {
  width: 100%;
}

.main-layout {
  width: 1100px;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 20px;
}

.main-layout::after {
  content: "";
  display: block;
  clear: both;
  height: 0px;
  overflow: hidden;
}

.main input,
.main .input {
  color: #333;
  font-size: 14px;
  line-height: 18px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 5px;
}

.main textarea,
.main .textarea {
  color: #333;
  font-size: 14px;
  line-height: 18px;
  width: 770px;
  height: 144px;
  background: #fff;
  border: 1px solid #ddd;
  word-break: break-all;
  overflow: auto;
  margin: 2px 0px;
  padding: 5px;
}

.main input:focus,
.main .input:focus,
.main textarea:focus,
.main .textarea:focus {
  border: 1px solid #999;
}

.main button {
  font-size: 14px;
  color: #666;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 2px 10px;
  display: inline-block;
  line-height: 24px;
  cursor: pointer;
}

.main button:hover {
  background: #eee;
}

.main button.submit {
  background: #888;
  color: #fff;
}

.main button.submit:hover {
  background: #666;
}

.main-search input {
  background: #fff;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #666;
  width: 200px;
  height: 24px;
  line-height: 24px;
  padding: 3px 10px 3px 30px;
  background-image: url(image/ico-search.png);
  background-repeat: no-repeat;
  background-position: 5px 7px;
}

.main-search input:focus {
  border-color: #999;
}
</style>
