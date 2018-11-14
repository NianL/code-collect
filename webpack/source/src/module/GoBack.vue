<template>
    <div class="go-back">
        <a v-text="'&lt;返回'" @click="goBack"></a> 
    </div>
</template>

<script>
export default {
  props: ["name"],
  methods: {
    goBack() {
      if (this.name) {
        this.$router.push({
          name: this.name
        });
      } else {
        history.go(-1);
      }
    }
  }
};
</script>

<style scoped>
.go-back {
  margin-bottom: 15px;
}

.go-back a {
  font-size: 14px;
  color: #666;
}

.go-back a:hover {
  color: #333;
}
</style>