<template>
  <div id="layout-wrapper" data-sidebar="dark">
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <nuxt></nuxt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("auth");

export default {
  middleware({ store, redirect }) {
    if (!store.state.auth.token) {
      return redirect("login");
    }
  },

  computed: {
    ...mapState(["user"]),
  },
};
</script>
<style scoped>
.main-content {
  margin-left: 250px !important;
}
</style>
