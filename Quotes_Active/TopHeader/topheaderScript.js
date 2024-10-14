const overlay = document.getElementById("overlay");
const drawer = document.getElementById("drawer");

// Function to toggle drawer visibility
function toggleDrawer() {
    if (!drawer.classList.contains("show")) {
        drawer.classList.add("show");
        overlay.style.display = "block"; // Show overlay
    } else {
        drawer.classList.remove("show");
        overlay.style.display = "none"; // Hide overlay
    }
}

// Show drawer on icon click
document.getElementById("show_drawer").onclick = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    toggleDrawer();
};

// Hide drawer on overlay click
overlay.onclick = () => {
    drawer.classList.remove("show");
    overlay.style.display = "none"; // Hide overlay
};

// Hide drawer when clicking outside
document.body.onclick = (event) => {
    if (drawer.classList.contains("show") && !drawer.contains(event.target) && event.target.id !== "show_drawer") {
        drawer.classList.remove("show");
        overlay.style.display = "none"; // Hide overlay
    }
};


// MUI scripts
// Initialize the first switch component
const switchElement1 = document.querySelector('#selected-switch-1');
let isChecked1 = false;

switchElement1.addEventListener('click', function () {
  isChecked1 = !isChecked1;
  switchElement1.setAttribute('aria-checked', isChecked1);
  if (isChecked1) {
    switchElement1.classList.add('mdc-switch--selected');
  } else {
    switchElement1.classList.remove('mdc-switch--selected');
  }
});

// Initialize the second switch component
const switchElement2 = document.querySelector('#selected-switch-2');
let isChecked2 = false;

switchElement2.addEventListener('click', function () {
  isChecked2 = !isChecked2;
  switchElement2.setAttribute('aria-checked', isChecked2);
  if (isChecked2) {
    switchElement2.classList.add('mdc-switch--selected');
  } else {
    switchElement2.classList.remove('mdc-switch--selected');
  }
});