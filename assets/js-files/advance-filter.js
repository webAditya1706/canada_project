
// 
$('#filter_type').on('change', function () {
    if ($(this).is(':checked')) {
        $('.advance_filter').removeClass('d-none'); // show
        $('.filter_body').addClass('d-none');       // hide
    } else {
        $('.advance_filter').addClass('d-none');    // hide
        $('.filter_body').removeClass('d-none');    // show
    }
});



// Dynamic fields configuration
const fieldConfig = {
    "commodity": {
        type: "select",
        label: "Commodity",
        options: ["Electric", "Gas"]
    },
    "due-date": {
        type: "date",
        label: "Due Date"
    },
    "new-business": {
        type: "select",
        label: "New Business",
        options: ["Yes", "No"]
    },
    "start-date": {
        type: "date",
        label: "Start Date"
    },
    "state": {
        type: "select",
        label: "State",
        options: [
            "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
            "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
            "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
            "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
            "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
            "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
            "Wisconsin", "Wyoming"
        ]
    },
    "status": {
        type: "select",
        label: "Status",
        options: ["Complete", "In Progress", "Incomplete", "Contract", "Booked"]
    },
    "utility": {
        type: "select",
        label: "Utility",
        options: []
    }
};

// Listen for filter selection
$('select.select_value_text').on('change', function () {
    let selected = $(this).val();
    generateDynamicField(selected);
});

// Main function to create fields
function generateDynamicField(key) {
    const container = $("#dynamicFieldContainer");
    container.html(""); // clear previous
console.log("===>key", key);

    if (key === "all-filters") return;

    let config = fieldConfig[key];

    // If NO CONFIG → TEXT FIELD
    if (!config) {
        container.append(`
            <div class="mt-4">
                <div class="form-label form_label text-light">${formatLabel(key)}</div>
                <input type="text" class="form-control theme_bg_color" placeholder="" />
            </div>

        <div class="mt-4">
            <select class="form-select js-example-basic-single-2 select_value_text mt-4"
                    aria-label="Default select example">
                    <option class="form_text_field" value="all-filters" selected>All Filters</option>
                    <option class="form_text_field" value="account-number">Account Number</option>
                    <option class="form_text_field" value="activity-date">Activity Date</option>
                    <option class="form_text_field" value="commodity">Commodity</option>
                    <option class="form_text_field" value="contact-name">Contact Name</option>
                    <option class="form_text_field" value="customer-legal-name-on-contract">Customer/Legal Name on
                        Contract</option>
                    <option class="form_text_field" value="due-date">Due Date</option>
                    <option class="form_text_field" value="new-business">New Business</option>
                    <option class="form_text_field" value="number-of-accounts">No. of Accounts</option>
                    <option class="form_text_field" value="quote-id">Quote ID</option>
                    <option class="form_text_field" value="relationship-manager">Relationship Manager</option>
                    <option class="form_text_field" value="start-date">Start Date</option>
                    <option class="form_text_field" value="state">State</option>
                    <option class="form_text_field" value="status">Status</option>
                    <option class="form_text_field" value="utility">Utility</option>
                    <option class="form_text_field" value="volume">Volume</option>
                </select>
            </div>

        `);
        return;
    }

    // If SELECT FIELD
    if (config.type === "select") {
        let html = `
            <div class="mt-4">
                <div class="form-label form_label text-light">${config.label}</div>
                <select class="form-select dynamic-select js-example-basic-single theme_bg_color">
                    ${config.options.map(opt =>
            `<option value="${opt.toLowerCase()}">${opt}</option>`
        ).join("")}
                </select>
            </div>

        <div class="mt-4">
            <select class="form-select js-example-basic-single-2 select_value_text mt-4"
                    aria-label="Default select example">
                    <option class="form_text_field" value="all-filters" selected>All Filters</option>
                    <option class="form_text_field" value="account-number">Account Number</option>
                    <option class="form_text_field" value="activity-date">Activity Date</option>
                    <option class="form_text_field" value="commodity">Commodity</option>
                    <option class="form_text_field" value="contact-name">Contact Name</option>
                    <option class="form_text_field" value="customer-legal-name-on-contract">Customer/Legal Name on
                        Contract</option>
                    <option class="form_text_field" value="due-date">Due Date</option>
                    <option class="form_text_field" value="new-business">New Business</option>
                    <option class="form_text_field" value="number-of-accounts">No. of Accounts</option>
                    <option class="form_text_field" value="quote-id">Quote ID</option>
                    <option class="form_text_field" value="relationship-manager">Relationship Manager</option>
                    <option class="form_text_field" value="start-date">Start Date</option>
                    <option class="form_text_field" value="state">State</option>
                    <option class="form_text_field" value="status">Status</option>
                    <option class="form_text_field" value="utility">Utility</option>
                    <option class="form_text_field" value="volume">Volume</option>
                </select>
            </div>
        `;

        container.append(html);

        // Apply select2
        $('.dynamic-select').select2();

        // Auto-open select2
        setTimeout(() => {
            $('.dynamic-select').select2('open');
        }, 50);
    }

    // If DATE FIELD
    if (config.type === "date") {
        container.append(`
            <div class="mt-4">
                <div class="form-label form_label text-light">${config.label}</div>
                <input type="date" class="form-control theme_bg_color" />
            </div>

        <div class="mt-4">
            <select class="form-select js-example-basic-single-2 select_value_text mt-4"
                    aria-label="Default select example">
                    <option class="form_text_field" value="all-filters" selected>All Filters</option>
                    <option class="form_text_field" value="account-number">Account Number</option>
                    <option class="form_text_field" value="activity-date">Activity Date</option>
                    <option class="form_text_field" value="commodity">Commodity</option>
                    <option class="form_text_field" value="contact-name">Contact Name</option>
                    <option class="form_text_field" value="customer-legal-name-on-contract">Customer/Legal Name on
                        Contract</option>
                    <option class="form_text_field" value="due-date">Due Date</option>
                    <option class="form_text_field" value="new-business">New Business</option>
                    <option class="form_text_field" value="number-of-accounts">No. of Accounts</option>
                    <option class="form_text_field" value="quote-id">Quote ID</option>
                    <option class="form_text_field" value="relationship-manager">Relationship Manager</option>
                    <option class="form_text_field" value="start-date">Start Date</option>
                    <option class="form_text_field" value="state">State</option>
                    <option class="form_text_field" value="status">Status</option>
                    <option class="form_text_field" value="utility">Utility</option>
                    <option class="form_text_field" value="volume">Volume</option>
              </select>
        </div>

        `);
    }

    $('.js-example-basic-single-2').select2();

}

// Helper: convert kebab-case → Label
function formatLabel(text) {
    return text.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}
