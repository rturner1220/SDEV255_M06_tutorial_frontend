const auth = new Auth();

const btn = document.querySelector("#logout");
if (btn) {
  btn.addEventListener("click", () => auth.logOut());
}
