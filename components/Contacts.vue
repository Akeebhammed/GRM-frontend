<template>
  <div class="h-[87vh]" style="background-color: rgb(0, 72, 114)">
    <div style="background-color: rgb(15, 34, 51)">
      <div class="h-[10vh]">
        <h2 class="text-3xl text-white py-2 capitalize px-3">
          current contacts
        </h2>
      </div>
      <div style="background-color: rgb(31, 69, 102)">
        <div class="flex justify-between py-2 px-14 h-[10vh]">
          <div class="flex space-x-20">
            <div>
              <p class="text-5xl flex justify-center text-white font-bold">
                {{ totalContacts }}
              </p>
              <p class="capitalize text-white font-medium">contacts</p>
            </div>
            <div>
              <p class="text-5xl flex justify-center text-yellow-600 font-bold">
                {{ totalFailed }}
              </p>
              <p class="capitalize text-yellow-600 font-medium">failed</p>
            </div>
            <div>
              <p class="text-5xl flex justify-center text-white font-bold">
                {{ totalExecuting }}
              </p>
              <p class="capitalize text-white font-medium">executing</p>
            </div>
          </div>
          <div>
            <p class="capitalize text-white text-base font-semibold">status</p>
            <div class="mt-2">
              <select
                name="status"
                v-model="status"
                id=""
                class="text-white text-base px-1 py-1 rounded-sm w-28 capitalize focus: border-none"
                style="background-color: rgb(62, 138, 204)"
              >
                <option
                  v-for="status in statuses"
                  :key="status"
                  :value="status.value"
                  class="bg-white text-black"
                >
                  {{ status.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="scrollbar overflow-y-scroll h-[60vh]">
          <table id="secondTable" class="w-full">
            <thead class="border-b-[0.5px] border-t-[0.5px]">
              <tr>
                <th
                  scope="col"
                  class="text-base text-gray-400 px-6 py-4 text-left capitalize cursor-pointer"
                ></th>
                <th
                  scope="col"
                  class="text-base text-gray-400 px-6 py-4 text-left capitalize"
                >
                  name
                </th>
                <th
                  scope="col"
                  class="text-base text-gray-400 px-6 py-4 text-left capitalize"
                >
                  GS
                </th>
                <th
                  scope="col"
                  class="text-base text-gray-400 px-6 py-4 text-left capitalize"
                >
                  equipmen string
                </th>
                <th
                  scope="col"
                  class="text-base text-gray-400 px-6 py-4 text-left capitalize"
                >
                  status
                </th>
              </tr>
            </thead>
            <tbody
              class="border-b"
              v-for="contact in contacts"
              :key="contact._id"
            >
              <tr
                class="border-b-2 border-b-black text-white cursor-pointer"
                @click="openDetails(contact._id)"
              >
                <td
                  class="text-base text-white font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ contact.icon }}
                </td>
                <td
                  class="text-base text-white font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ contact.contactName }}
                </td>
                <td
                  class="text-base text-white font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ contact.contactGround }}
                </td>
                <td
                  class="text-base text-white font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ contact.contactEquipment }}
                </td>
                <td
                  class="text-base text-white font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ contact.contactState }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end pr-7 h-[7vh] items-center">
          <!-- <p>Showing{{ currentPage }} of {{ totalPage }}</p> -->
          <div class="flex space-x-3">
            <button
              :disabled="currentIndex === 0"
              class="cursor-pointer"
              @click="showPrevNumbers"
            >
              <img src="~assets/doubleL.svg" alt="" />
            </button>
            <button
              :disabled="currentPage == 1"
              class="cursor-pointer"
              @click="fetch((currentPage = currentPage - 1))"
            >
              <img src="~assets/right.svg" alt="" />
              <!-- {{ currentPage }} -->
            </button>
            <ul class="flex space-x-4">
              <li
                @click.prevent="fetch((currentPage = i))"
                v-for="i in displayedNumbers"
                :key="i"
                class="rounded-full cursor-pointer py-1 px-3 text-gray-400 text-base"
                :class="i == currentPage ? 'bg-brand-purple' : 'bg-white'"
              >
                {{ i + 1 }}
              </li>
            </ul>
            <button
              :disabled="currentPage == 20"
              class="cursor-pointer"
              @click="fetch((currentPage = currentPage + 1))"
            >
              <img src="~assets/left.svg" alt="" />
            </button>
            <button
              :disabled="currentIndex + 5 >= totalPage"
              class="cursor-pointer"
              @click="showNextNumbers"
            >
              <img src="~assets/doubleR.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  beforeMount() {
    axios
      .get(`http://localhost:3000/auth/contacts?page=${this.currentPage}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        this.contacts = response.data.contacts;
        this.totalExecuting = response.data.totalExecuting;
        this.totalFailed = response.data.totalFailed;
        this.totalPage = response.data.totalPages;
        this.totalContacts = response.data.totalItems;
        for (let i = 0; i < this.totalPage; i++) {
          this.numbers.push(i);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {
    status: function (newVal) {
      axios
        .get(
          `http://localhost:3000/auth/contacts?page=${this.currentPage}`,
          {
            params: { contactState: newVal },
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.contacts = response.data.contacts;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      currentPage: 1,
      status: "",
      totalFailed: "",
      totalContacts: "",
      totalExecuting: "",
      totalPage: "",
      currentIndex: 0,
      numbers: [],
      statuses: [
        { name: "all", value: "" },
        { name: "executing", value: "executing" },
        { name: "failed", value: "failed" },
      ],
      commands: [
        { name: "manual", value: "manual" },
        { name: "semi-automated", value: "semi-automated" },
        { name: "fully-automated", value: "fully-automated" },
      ],
      contacts: [],
    };
  },
  computed: {
    displayedNumbers() {
      return this.numbers.slice(this.currentIndex, this.currentIndex + 5);
    },
  },
  methods: {
    showNextNumbers() {
      if (this.currentIndex + 5 < this.totalPage) {
        this.currentIndex += 5;
      }
    },
    showPrevNumbers() {
      if (this.currentIndex >= 5) {
        this.currentIndex -= 5;
      }
    },
    fetch() {
      if (this.currentIndex + 1 < this.totalPage) {
        this.currentIndex += 1;
      }
      if (this.currentIndex >= 1) {
        this.currentIndex -= 1;
      }

      axios
        .get(`http://localhost:3000/auth/contacts?page=${this.currentPage}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.contacts = response.data.contacts;
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
