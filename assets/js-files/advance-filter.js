
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
    "activity-date": {
        type: "date",
        label: "Activity Date"
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
        `);

        container.append(getFilterDropdown(key));
        $('.js-example-basic-single-2').select2();
        return;
    }

    // If SELECT FIELD
    if (config.type === "select") {
        container.append(`
            <div class="mt-4">
                <div class="form-label form_label text-light">${config.label}</div>
                <select class="form-select dynamic-select js-example-basic-single theme_bg_color">
                    ${config.options.map(opt =>
                        `<option value="${opt.toLowerCase()}">${opt}</option>`
                    ).join("")}
                </select>
            </div>
        `);

        container.append(getFilterDropdown(key));
        $('.dynamic-select').select2();
        $('.js-example-basic-single-2').select2();

        setTimeout(() => {
            $('.dynamic-select').select2('open');
        }, 50);

        return;
    }

    // If DATE FIELD
    if (config.type === "date") {
        container.append(`
            <div class="mt-4">
                <div class="form-label form_label text-light">${config.label}</div>
                <input type="date" class="form-control theme_bg_color" />
            </div>
        `);

        container.append(getFilterDropdown(key));
        $('.js-example-basic-single-2').select2();
    }
}


// Helper: convert kebab-case → Label
function formatLabel(text) {
    return text.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function getFilterDropdown(excludeKey = null) {
    const options = [
        "all-filters",
        "account-number",
        "activity-date",
        "commodity",
        "contact-name",
        "customer-legal-name-on-contract",
        "due-date",
        "new-business",
        "number-of-accounts",
        "quote-id",
        "relationship-manager",
        "start-date",
        "state",
        "status",
        "utility",
        "volume"
    ];

    return `
        <div class="mt-4">
            <select class="form-select js-example-basic-single-2 select_value_text mt-4" aria-label="Default select example">
                ${options.map(opt => {
                    if (opt === excludeKey) return ''; // exclude this option
                    const label = formatLabel(opt);
                    const selected = opt === "all-filters" ? 'selected' : '';
                    return `<option class="form_text_field" value="${opt}" ${selected}>${label}</option>`;
                }).join('')}
            </select>
        </div>
    `;
}

