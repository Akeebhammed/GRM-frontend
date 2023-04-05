export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem("token");
  const expiryDate = localStorage.getItem("expiryDate");
  if (!token && !expiryDate) {
    return navigateTo("/");
  }
});
