<template>
  <div class="border-b-[0.5px] border-r-[0.5px] border-gray-100">
    <div class="w-[80%] ml-auto flex justify-between py-4 px-4">
      <div>
        <p class="text-5xl text-white font-bold">{{ alerts.length }}</p>
        <p class="capitalize text-white">active alerts</p>
      </div>
      <div class="flex space-x-10">
        <div>
          <p class="capitalize text-white text-base font-semibold">severity</p>
          <div class="mt-2">
            <select
              name="severity"
              v-model="errors.errorSeverity"
              id=""
              class="text-white text-base px-1 py-1 rounded-sm w-28 capitalize focus: border-none"
              style="background-color: rgb(62, 138, 204)"
            >
              <option
                v-for="severity in severities"
                :key="severity"
                :value="severity.value"
                class="bg-white text-black"
              >
                {{ severity.name }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <p class="capitalize text-white text-base font-semibold">category</p>
          <div class="mt-2">
            <select
              name="category"
              v-model="errors.errorCategory"
              id=""
              class="text-white text-base px-1 py-1 rounded-sm w-28 capitalize focus: border-none"
              style="background-color: rgb(62, 138, 204)"
            >
              <option
                v-for="category in categories"
                :key="category"
                :value="category.value"
                class="bg-white text-black"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <table id="secondTable" class="w-full">
        <thead class="border-b border-t" style="background: #d8d8d8">
          <tr>
            <th
              @click="selectAll"
              scope="col"
              class="text-base text-brand-black px-6 py-4 text-left capitalize cursor-pointer"
            >
              {{ checkedAll ? "select none" : "select all" }}
            </th>
            <th
              scope="col"
              class="text-base text-brand-black px-6 py-4 text-left capitalize"
            ></th>
            <th
              scope="col"
              class="text-base text- brand-black px-6 py-4 text-left capitalize"
            >
              message
            </th>
            <th
              scope="col"
              class="text-base text- brand-black px-6 py-4 text-left capitalize"
            >
              category
            </th>
            <th
              scope="col"
              class="text-base text- brand-black px-6 py-4 text-left capitalize"
            >
              time
            </th>
          </tr>
        </thead>
        <tbody class="border-b" v-for="alert in alerts" :key="alert._id">
          <tr
            class="border-b-2 border-b-black text-white cursor-pointer"
            @click="openDetails(alert._id)"
          >
            <td
              class="text-base text-white font-light px-6 py-4 whitespace-nowrap"
            >
              <input type="checkbox" v-model="alert.selected" />
            </td>
            <td
              class="text-base text-white font-light px-6 py-4 whitespace-nowrap"
            >
              <img
                v-if="alert.errorSeverity === 'serious'"
                src="~assets/serious.svg"
                alt=""
                class="rotate-45"
              />
              <img
                v-if="alert.errorSeverity === 'critical'"
                src="~assets/critical.svg"
                alt=""
              />
              <img
                v-if="alert.errorSeverity === 'caution'"
                src="~assets/caution.svg"
                alt=""
              />
            </td>
            <td
              class="text-base text-white font-light px-6 py-4 whitespace-nowrap"
            >
              {{ alert.errorMessage }}
            </td>
            <td
              class="text-base text-white font-light px-6 py-4 whitespace-nowrap"
            >
              {{ alert.errorCategory }}
            </td>
            <td
              class="text-base text-white font-light px-6 py-4 whitespace-nowrap"
            >
              {{ time(alert.longMessage) }}
            </td>
          </tr>
          <tr v-if="alert.expanded">
            <td
              colspan="5"
              class="text-base text-white font-light px-6 py-4 whitespace-nowrap"
            >
              <div class="w-[95%] ml-auto">{{ alert.longMessage }}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <div class="flex justify-center space-x-6 py-10 opacity-40">
          <button
            class="rounded-md px-4 py-1 text-white font-medium text-lg capitalize cursor-not-allowed"
            style="background-color: rgb(62, 138, 204)"
          >
            dsimiss
          </button>
          <button
            class="rounded-md px-4 py-1 text-white font-medium text-lg capitalize cursor-not-allowed"
            style="background-color: rgb(62, 138, 204)"
          >
            acknowledge
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async beforeMount() {
    const { data } = await axios.get(
      "http://localhost:3000/auth/severity",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      {
        params: this.errors,
      }
    );
    this.alerts = data.alerts;
  },
  watch: {
    errors: {
      handler: function (newVal, oldVal) {
        this.fetchAlertData(newVal.errorCategory, newVal.errorSeverity);
      },
      deep: true,
    },
  },
  data() {
    return {
      errors: {
        errorSeverity: "",
        errorCategory: "",
      },
      checkedAll: false,
      alerts: [],
      severities: [
        { name: "All", value: "" },
        { name: "critical", value: "critical" },
        { name: "serious", value: "serious" },
        { name: "cautions", value: "caution" },
      ],
      categories: [
        { name: "all", value: "" },
        { name: "software", value: "software" },
        { name: "hardware", value: "hardware" },
        { name: "spacecraft", value: "spacecraft" },
      ],
    };
  },
  methods: {
    fetchAlertData(category, severity) {
      axios
        .get(
          "http://localhost:3000/auth/severity",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
          {
            params: {
              errorCategory: category,
              errorSeverity: severity,
            },
          }
        )
        .then((response) => {
          this.alerts = response.data.alerts;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectAll() {
      this.checkedAll = !this.checkedAll;
      for (let i = 0; i < this.alerts.length; i++) {
        this.alerts[i].selected = this.checkedAll;
      }
    },
    openDetails(id) {
      this.alerts.find((detail) => detail._id === id).expanded =
        !this.alerts.find((detail) => detail._id === id).expanded;
    },
  },
  computed: {
    time() {
      const regex = /(\d{2}:\d{2}:\d{2})$/;
      return (str) => str.match(regex)[1];
    },
  },
};
</script>
