// const sidebar1 = document.getElementById("main_sidebar");
// const overlay1 = document.querySelector(".overlay_mainsidebar");

// // Show overlay when sidebar is open
// document
//   .getElementById("open_main_sidebar")
//   .addEventListener("mouseenter", function () {
//     sidebar1.classList.add("show_side_bar");
//     overlay1.style.display = "block";
//   });

// // Hide sidebar and overlay when clicking outside
// overlay1.addEventListener("click", function () {
//   sidebar1.classList.remove("show_side_bar");
//   overlay1.style.display = "none";
// });

// // Hide sidebar and overlay on document click, except sidebar or sidebar container
// document.addEventListener("click", function (event) {
//   if (
//     !sidebar1.contains(event.target) &&
//     !document.getElementById("open_main_sidebar").contains(event.target)
//   ) {
//     sidebar1.classList.remove("show_side_bar");
//     overlay1.style.display = "none";
//   }
// });

const sidebar = document.getElementById("main_sidebar");
const drawerTrigger = document.getElementById("open_main_sidebar");
const overlay = document.querySelector(".overlay_mainsidebar");
const closeBtn = document.getElementById("close_sidebar");

// Show sidebar on hover (desktop)
drawerTrigger.addEventListener("mouseenter", () => {
  sidebar.classList.add("show_side_bar");
  // overlay.classList.add("active");
  overlay.style.display = "block";
});

// Show sidebar on click (mobile)
drawerTrigger.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent closing immediately
  sidebar.classList.add("show_side_bar");
  overlay.classList.add("active");
});

// Close on overlay click
overlay.addEventListener("click", () => {
  sidebar.classList.remove("show_side_bar");
  overlay.style.display = "none";
});

// Optional close button for mobile
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show_side_bar");
    overlay.style.display = "none";
  });
}

// Prevent closing when clicking inside sidebar or dropdown
document.addEventListener("click", function (e) {
  const insideSidebar = sidebar.contains(e.target);
  const insideDrawer = drawerTrigger.contains(e.target);
  const insideDropdown = e.target.closest(".dropdown-menu");

  if (!insideSidebar && !insideDrawer && !insideDropdown) {
    sidebar.classList.remove("show_side_bar");
    overlay.style.display = "none";
  }
});

// Prevent dropdown from bubbling up
document.querySelectorAll(".dropdown-menu").forEach((menu) => {
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});





// vertically UI
const changeUI = () => {
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
