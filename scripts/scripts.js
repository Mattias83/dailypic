import { sidebar } from "./modules/sidebar.js";

const openSideBar = document.querySelector(".open-icon");
const closeSideBar = document.querySelector(".close-icon");

openSideBar.addEventListener("click", (e) => {
    sidebar(true);
});

closeSideBar.addEventListener("click", (e) => {
    sidebar(false);
});