<template>
    <div>
        文章详细页面
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$emit("now-menu", "article-detail");
  },
  methods: {
    init() {}
  }
};
</script>

<style>
</style>