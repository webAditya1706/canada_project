
// toggle div
function toggleDiv () {
    
    const div = document.getElementById('toggleDiv');
    console.log("clicked==",div);
    
    if(div.style.display === "none"){
        div.style.display = "block"
    }else{
        div.style.display = "none"
    }
}


// to get date picker
// Initialize the datepicker
$(document).ready(function () {
    $('#datePickerInput').datepicker({
        format: 'mm/dd/yyyy', // Customize the date format
        autoclose: true,      // Close the picker after selecting a date
    });
});

// Open the datepicker when clicking the icon
function openDatePicker() {
    console.log("=======clicked");
    
    $('#datePickerInput').datepicker('show');
}
