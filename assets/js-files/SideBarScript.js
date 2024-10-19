const sidebar1 = document.getElementById('main_sidebar');
const overlay1 = document.querySelector('.overlay_mainsidebar');

// Show overlay when sidebar is open
document.getElementById('open_main_sidebar').addEventListener('mouseenter', function () {
    sidebar1.classList.add('show_side_bar');
    overlay1.style.display = 'block';
});

// Hide sidebar and overlay when clicking outside
overlay1.addEventListener('click', function () {
    sidebar1.classList.remove('show_side_bar');
    overlay1.style.display = 'none';
});

// Hide sidebar and overlay on document click, except sidebar or sidebar container
document.addEventListener('click', function (event) {
    if (!sidebar1.contains(event.target) && !document.getElementById('open_main_sidebar').contains(event.target)) {
        sidebar1.classList.remove('show_side_bar');
        overlay1.style.display = 'none';
    }
});
