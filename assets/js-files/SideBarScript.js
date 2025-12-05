
// vertically UI
const changeUI = () => {
  console.log("======on click this button");
  
  const elements = [...document.getElementsByClassName("vertical_ui")]; // Convert to an array
  const width100 = [...document.getElementsByClassName("verti_width_100_row")]; // Convert to an array

  if (width100) {
    width100.forEach((element) => {
      if (element.classList.contains("w-100")) {
        element.classList.remove("w-100");
      } else {
        element.classList.add("w-100");
      }
    });
  }
  if (!elements) return;
  elements.forEach((element) => {
    if (element.classList.contains("vertical_ui_design")) {
      element.classList.remove("vertical_ui_design");
    } else {
      element.classList.add("vertical_ui_design");
    }
  });
};

const sidebar = document.getElementById("main_sidebar");
const drawerTrigger = document.getElementById("open_main_sidebar");
const overlay = document.querySelector(".overlay_mainsidebar");
const closeBtn = document.getElementById("close_sidebar");
const drawerElement = document.getElementById("quote_drawer");

let isDrawerOpen = false;

// Detect if it's a touch device (mobile)
const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

// Show sidebar
const openSidebar = () => {
  if (isDrawerOpen) {
    console.log("Drawer is open — sidebar will not open.");
    return;
  }
  console.log("Sidebar opening...");
  sidebar.classList.add("show_side_bar");
  overlay.style.display = "block";
};

// Hide sidebar
const closeSidebar = () => {
  sidebar.classList.remove("show_side_bar");
  overlay.style.display = "none";
};

if (!isTouchDevice()) {
  drawerTrigger.addEventListener("mouseenter", openSidebar);
}

drawerTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  openSidebar(); // this now respects isDrawerOpen inside
});

// Close on overlay click
overlay.addEventListener("click", closeSidebar);

// Optional close button
if (closeBtn) {
  closeBtn.addEventListener("click", closeSidebar);
}

// Click outside to close
document.addEventListener("click", (e) => {
  const insideSidebar = sidebar.contains(e.target);
  const insideDrawer = drawerTrigger.contains(e.target);
  const insideDropdown = e.target.closest(".dropdown-menu");
  const isDropdownToggle = e.target.closest('[data-bs-toggle="dropdown"]');

  if (insideSidebar || insideDrawer || insideDropdown || isDropdownToggle)
    return;

  closeSidebar();
});

// Prevent dropdown clicks from bubbling
document.querySelectorAll(".dropdown-menu").forEach((menu) => {
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

// Track drawer open/close state
drawerElement.addEventListener("shown.bs.offcanvas", () => {
  isDrawerOpen = true;
  closeSidebar(); // optional: auto-close sidebar
});

drawerElement.addEventListener("hidden.bs.offcanvas", () => {
  isDrawerOpen = false;
});

const collapsButton = () => {
  
}
