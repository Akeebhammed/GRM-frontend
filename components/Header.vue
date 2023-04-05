<template>
  <nav class="bg-black py-6">
    <div class="w-[95%] mx-auto flex space-x-56">
      <div class="uppercase text-4xl font-medium">
        <div class="flex space-x-5 items-center">
          <div class="">
            <p class="text-white text-base">icon</p>
          </div>
          <div>
            <span class="font-bold text-white">grm</span>
            <span class="text-gray-300 pl-4">dashboard</span>
            <p class="text-white text-base capitalize">j.smith</p>
          </div>
        </div>
      </div>
      <Time />
      <div
        class="text-white items-center justify-center flex"
        @click="logoutHandler"
      >
        <button
          class="border border-gray-500 rounded-lg bg-gray-500 hover:bg-gray-400 px-7 py-2"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const remainingMillliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setAutoLogout(remainingMillliseconds);
  },
  data() {
    return {};
  },
  methods: {
    logoutHandler() {
      localStorage.removeItem("token");
      localStorage.removeItem("expiryDate");
      localStorage.removeItem("userId");
      // window.location.reload();
      this.$router.push("/");
    },
    setAutoLogout(milliseconds) {
      setTimeout(() => {
        this.logoutHandler();
      }, milliseconds);
    },
  },
};
</script>
