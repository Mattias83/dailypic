export function sidebar(bool) {
    const sidebar = document.querySelector("nav ul");
    console.log(sidebar);
    if (bool) {
        sidebar.classList.remove("sidebar-close");
        sidebar.classList.add("sidebar-open");
    } else {
        sidebar.classList.remove("sidebar-open");
        sidebar.classList.add("sidebar-close");
    }
}