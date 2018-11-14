<template>
    <div>
        首页
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$emit("now-menu", "home");
  },
  methods: {
    init() {}
  }
};
</script>

<style>
</style>