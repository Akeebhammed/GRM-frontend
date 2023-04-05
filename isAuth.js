const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  //   console.log(token);
  const expiryDate = localStorage.getItem("expiryDate");
  if (token && expiryDate) {
    return true;
  } else {
    return false;
  }
};
export default isAuthenticated;
