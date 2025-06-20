$(document).ready(function () {
  // Attach event to each dropdown toggle
  $('.dropdown .dropdown-toggle').each(function () {
    const $toggleBtn = $(this);
    const $dropdown = $toggleBtn.closest('.dropdown');
    const $menu = $dropdown.find('.dropdown-menu');

    // Disable Bootstrap default toggle
    $toggleBtn.attr('data-bs-toggle', '');

    // Handle click on toggle
    $toggleBtn.on('click', function (e) {
      e.preventDefault();

      // If already open, close it
      if ($menu.parent()[0] === document.body && $menu.hasClass('show')) {
        $menu.removeClass('show').detach();
        return;
      }

      // Close all other open dropdowns
      $('.dropdown-menu.show').each(function () {
        const $openMenu = $(this);
        if ($openMenu.parent()[0] === document.body) {
          $openMenu.removeClass('show').detach();
        }
      });

      // Position and show the menu
      const rect = $toggleBtn[0].getBoundingClientRect();
      $menu.css({
        position: 'absolute',
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        zIndex: 1050
      });

      $menu.addClass('show').appendTo('body');
    });

    // Handle outside click
    $(document).on('click', function (e) {
      if (
        !$dropdown.is(e.target) &&
        $dropdown.has(e.target).length === 0 &&
        !$menu.is(e.target) &&
        $menu.has(e.target).length === 0
      ) {
        if ($menu.parent()[0] === document.body) {
          $menu.removeClass('show').detach();
        }
      }
    });

    // Close menu when any item is clicked
    $menu.on('click', '.dropdown-item', function () {
      if ($menu.parent()[0] === document.body) {
        $menu.removeClass('show').detach();
      }
    });
  });
});
