// toggle div
function toggleDiv() {
  const div = document.getElementById("toggleDiv");
  console.log("clicked==", div);

  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}

// to get date picker
// Initialize the datepicker
$(document).ready(function () {
  $("#datePickerInput").datepicker({
    format: "mm/dd/yyyy", // Customize the date format
    autoclose: true, // Close the picker after selecting a date
  });
});

// Open the datepicker when clicking the icon
function openDatePicker() {
  console.log("=======clicked");

  $("#datePickerInput").datepicker("show");
}

// graph slider jquary code
// Initialize Slick Slider when the modal opens
$("#sliderModal").on("shown.bs.modal", function () {
  if (!$(".slick-slider").hasClass("slick-initialized")) {
    $(".slick-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: $(window).width() > 768, // Show arrows only on larger screens
      dots: $(window).width() <= 768, // Show dots on mobile screens (<= 768px)
    });
  }
});

// Reinitialize the Slick Slider on window resize
$(window).on("resize", function () {
  if ($(".slick-slider").hasClass("slick-initialized")) {
    $(".slick-slider").slick("unslick"); // Destroy the previous instance
    $(".slick-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: $(window).width() > 768, // Show arrows only on larger screens
      dots: $(window).width() <= 768, // Show dots on mobile screens (<= 768px)
    });
  }
});

// In your Javascript (external .js resource or <script> tag)
$(document).ready(function () {
  setTimeout(() => {
    $(".js-example-basic-single").each(function () {
      const $select = $(this);
      const hideSearch = $select.hasClass("hide_search");

      $select.wrap('<div class="select2-wrapper"></div>');

      $select.select2({
        dropdownParent: $select.parent(),
        minimumResultsForSearch: hideSearch ? Infinity : 0,
        width: '100%',
      });
    });

    // Focus classes
    $(".js-example-basic-single").on("select2:open", function () {
      setTimeout(() => {
        $(".select2-selection").removeClass("custom-focus");
        const container = $(this).data("select2").$container;
        container.find(".select2-selection").addClass("custom-focus");
        $(".select2-search__field").addClass("form-control mt-1");
      }, 0);
    });

    $(".js-example-basic-single").on("select2:close", function () {
      $(".select2-selection").removeClass("custom-focus");
    });

  }, 100); // slight delay ensures layout is fully calculated
});



