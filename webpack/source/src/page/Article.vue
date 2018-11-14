<template>
    <div>
        文章列表
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$emit("now-menu", "article");
  },
  methods: {
    init() {}
  }
};
</script>

<style>
</style>