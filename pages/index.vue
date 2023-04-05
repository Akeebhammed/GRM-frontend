<template>
  <div class="w-full bg-[#E5E5E5] h-screen">
    <div
      class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
    >
      <div>
        <h2
          class="text-7xl text-[#093545] capitalize text-center font-semibold"
        >
          sign in
        </h2>
        <p class="text-lg text-[#093545] font-medium mt-10">
          Sign in and start managing your dashboard
        </p>

        <form @submit.prevent="loginHandler" action="" class="mt-10 px-5">
          <div>
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
                value="hammed"
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
          <p class="text-lg text-[#20DF7F] font-medium mt-5">
            Dont't hane an account?
            <span>
              <NuxtLink to="/signup" class="text-black hover:text-gray-400"
                >Sign up</NuxtLink
              >
            </span>
            instead
          </p>
          <div class="mt-6">
            <button
              :disabled="button"
              class="capitalize w-full text-black text-base py-2 px-3 text-center rounded-lg bg-[#20DF7F] cursor-pointer"
              :class="button ? ' cursor-not-allowed' : 'cursor-pointer'"
            >
              login
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
      button: false,
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    loginHandler() {
      this.button = true;
      axios
        .post("http://localhost:3000/auth/login", this.form)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          const remainingMillliseconds = 60 * 60 * 1000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMillliseconds
          );
          localStorage.setItem("expiryDate", expiryDate.toISOString());

          this.$router.push("/dashboard");
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
