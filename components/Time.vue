<template>
  <div class="flex">
    <div>
      <div
        class="relative text-white bg-gray-400 border border-gray-600 py-2 border-r-0 uppercase text-3xl px-2 font-bold"
        style="background-color: rgb(20, 32, 44)"
      >
        {{ $dayOfYear() }}
      </div>
      <p class="text-center text-white capitalize font-medium">date</p>
    </div>
    <div>
      <div
        class="relative text-white border border-gray-600 py-2 text-3xl px-3 font-bold uppercase"
        style="background-color: rgb(20, 32, 44)"
      >
        {{ time }} utc
      </div>
      <p class="text-center text-white capitalize font-medium">time</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "00:00:00",
      date: "079",
      timer: null,
    };
  },
  mounted() {
    this.updateTime();
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    updateTime() {
      //get time in utc
      const now = new Date().toISOString().substr(11, 8);
      this.time = now;
    },
  },
};
</script>
