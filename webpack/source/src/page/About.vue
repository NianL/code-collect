<template>
    <div>
        作者：liun
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$emit("now-menu", "about");
  },
  methods: {
    init() {}
  }
};
</script>

<style>
</style>