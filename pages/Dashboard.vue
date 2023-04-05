<template>
  <div class="w-full h-100vh">
    <div class="h-[13vh]"><Header /></div>
    <div
      class="grid grid-cols-12 h-[87vh]"
      style="background-color: rgb(15, 34, 51)"
    >
      <div class="col-span-5 overflow-y-scroll h-[87vh] scrollbar">
        <Alerts />
      </div>
      <div class="col-span-7">
        <!-- <div>
            <ul>
              <li @click="currentPage = 'contact'">contact</li>
              <li @click="currentPage = 'equipment'">equipment</li>
            </ul>
          </div> -->
        <!-- <component :is="currentPage" /> -->
        <Contacts />
      </div>
      <!-- <div class="col-span-8"><Equipment /></div> -->
    </div>
  </div>
</template>

<script>
definePageMeta({
  middleware: ["is-auth"],
});
export default {
  data() {
    return { currentPage: "contacts" };
  },
};
</script>

<style scoped>
.scrollbar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: rgb(40, 63, 88);
}

.scrollbar::-webkit-scrollbar {
  width: 12px;
  background-color: rgb(40, 63, 88);
}

.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgb(77, 172, 255);
}
</style>
