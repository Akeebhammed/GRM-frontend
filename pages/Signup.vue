<template>
  <div class="w-full bg-[#E5E5E5] h-screen">
    <div
      class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
    >
      <div>
        <h2
          class="text-7xl text-[#093545] capitalize text-center font-semibold"
        >
          sign up
        </h2>
        <p class="text-lg text-[#093545] font-medium mt-10">
          Sign up and start managing your dashboard
        </p>
        <form @submit.prevent="signupHandler" action="" class="mt-10 px-5">
          <div>
            <input
              type="text"
              placeholder="Enter your full-name here"
              v-model="form.name"
              class="w-full rounded-lg bg-[#093545] text-white placeholder:text-white px-3 placeholder:text-base py-3 focus:border-none focus:outline-0"
            />
          </div>
          <div class="mt-10">
            <input
              type="text"
              placeholder="Email-address"
              v-model="form.email"
              class="w-full rounded-lg bg-[#093545] text-white placeholder:text-white px-3 placeholder:text-base py-3 focus:border-none focus:outline-0"
            />
          </div>
          <div class="mt-10">
            <label for="" class="flex bg- rounded-lg bg-[#093545]">
              <input
                :type="type"
                v-model="form.password"
                placeholder="Password"
                class="w-full rounded-lg bg-[#093545] text-white placeholder:text-white px-3 placeholder:text-base py-3 focus:border-none focus:outline-0"
              />
              <button @click.prevent="showPassword">
                <img :src="show" alt="" />
              </button>
            </label>
          </div>
          <div class="flex justify-between mt-7">
            <div>
              <input
                class="styled-checkbox rounded-lg"
                id="styled-checkbox-1"
                type="checkbox"
              />
              <label
                for="styled-checkbox-1"
                class="flex space-x-3 cursor-pointer text-[#093545]"
                >Remember me</label
              >
            </div>
            <div>
              <p class="text-base text-black font-medium cursor-pointer">
                Forget password?
              </p>
            </div>
          </div>
          <div class="mt-6">
            <button
              class="capitalize w-full text-black text-base py-2 px-3 text-center rounded-lg bg-[#20DF7F] cursor-pointer"
            >
              sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="absolute w-full -translate-y-[10.4rem]">
    <img
      src="https://veb-dasturchi.github.io/img/Vectors_light.svg"
      class="w-full"
      alt=""
    />
  </div>
</template>

<script>
import show from "../assets/show.svg";
import hide from "../assets/hide.svg";
import axios from "axios";
export default {
  data() {
    return {
      type: "password",
      show: show,
      form: {
        email: "",
        password: "",
        name: "",
      },
    };
  },
  methods: {
    signupHandler() {
      axios
        .put("http://localhost:3000/auth/signup", this.form)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.show = hide;
      } else {
        this.type = "password";
        this.show = show;
      }
    },
  },
};
</script>

<style scoped>
.styled-checkbox {
  position: absolute;
  opacity: 0;
}
.styled-checkbox + label {
  position: relative;
  cursor: pointer;
  padding: 0;
}
.styled-checkbox + label:before {
  content: "";
  margin-right: 10px;
  display: inline-block;
  vertical-align: text-top;
  width: 20px;
  height: 20px;
  background: #093545;
}

.styled-checkbox:hover + label:before {
  background: #093545;
}

.styled-checkbox:focus + label:before {
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
}

.styled-checkbox:checked + label:before {
  background: #093545;
}
.styled-checkbox:checked + label:after {
  content: "";
  position: absolute;
  left: 5px;
  top: 9px;
  background: #093545;
  width: 2px;
  height: 2px;
  box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white,
    4px -6px 0 white, 4px -8px 0 white;
  transform: rotate(45deg);
}
</style>
