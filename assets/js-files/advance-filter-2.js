// ======================= JS =======================

// Toggle Advance Filter
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
    "commodity": { type: "select", label: "Commodity", options: ["Electric", "Gas"] },
    "due-date": { type: "date", label: "Due Date" },
    "activity-date": { type: "date", label: "Activity Date" },
    "new-business": { type: "select", label: "New Business", options: ["Yes", "No"] },
    "start-date": { type: "date", label: "Start Date" },
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
    "status": { type: "select", label: "Status", options: ["Complete", "In Progress", "Incomplete", "Contract", "Booked"] },
    "utility": { type: "select", label: "Utility", options: [] }
};

// Helper: format label
function formatLabel(text) {
    return text.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// ================= Initialize Select2 =================
$('#quote_drawer').on('shown.bs.offcanvas', function () {
    $(this).find('select').each(function () {
        if (!$(this).hasClass("select2-hidden-accessible")) {
            $(this).select2({
                dropdownParent: $('#quote_drawer')
            });
        }
    });
});

// Listen for filter selection (dynamic selects)
$(document).on('change', 'select.select_value_text', async function () {
    const selected = $(this).val();
    await generateDynamicField(selected);
});

let selectedOptions = []

// Generate dynamic field
const generateDynamicField = async (key) => {
    addFilterButton();

    const container = $("#dynamicFieldContainer");
    container.empty(); // clear previous
    if (key === "all-filters") return;
    selectedOptions.push(key)
    const config = fieldConfig[key];
    console.log("===>", selectedOptions);

    if (!config) {
        // Default text input
        container.append(`
            <div class="mt-4">
                <div class="form-label text-light">${formatLabel(key)}</div>
                <input type="text" class="form-control theme_bg_color" />
            </div>
        `);
        // await appendFilterDropdown(key);
    }

    if (config.type === "select") {
        const $selectWrapper = $(`
            <div class="mt-4">
                <div class="form-label text-light">${config.label}</div>
                <select class="form-select dynamic-select theme_bg_color">
                    ${config.options.map(opt => `<option value="${opt.toLowerCase()}">${opt}</option>`).join('')}
                </select>
            </div>
        `).appendTo(container);

        // Initialize select2
        $selectWrapper.find('select').select2({
            dropdownParent: $('#quote_drawer')
        });

        // await appendFilterDropdown(key);
    }

    if (config.type === "date") {
        container.append(`
            <div class="mt-4">
                <div class="form-label text-light">${config.label}</div>
                <input type="date" class="form-control theme_bg_color" />
            </div>
        `);
        // await appendFilterDropdown(key);
    }


}

function addFilterButton(container) {
    const appendBtn = $("#add_filter")
       if (appendBtn.length && appendBtn.children().length > 0) {
        return;
    }

    appendBtn.append(`
        <div class="add_filter_btn" onclick="appendFilterDropdown()">
            <img src=".././assets/appbar createnew.png" class="w_15_h_15">
            <span>Add filter</span>
        </div>
    `);
}



// Append "All Filters" dropdown dynamically
function appendFilterDropdown(excludeKey = null) {
    console.log("====>hrllo");

    const options = [
        "all-filters", "account-number", "activity-date", "commodity", "contact-name",
        "customer-legal-name-on-contract", "due-date", "new-business", "number-of-accounts",
        "quote-id", "relationship-manager", "start-date", "state", "status", "utility", "volume"
    ];

    const filteredOptions = options.filter(opt =>
        opt !== excludeKey && !selectedOptions.includes(opt)
    );


    const html = `
        <div class="mt-4 d-flex flex-row gap-2 align-items-center">
            <select class="form-select js-example-basic-single-2 mt-4">
                ${filteredOptions.map(opt => {
        // if (opt === excludeKey) return '';
        const selected = opt === "all-filters" ? 'selected' : '';
        return `<option value="${opt}" ${selected}>${formatLabel(opt)}</option>`;
    }).join('')}
            </select>

                <img src=".././assets/icons/Form_delete.png" class="Form_delete" alt="Form_delete">
            
        </div>
    `;

    const $newSelectWrapper = $(html).appendTo("#dynamicFieldContainer");
    const $newSelect = $newSelectWrapper.find('select');

    // Initialize Select2
    $newSelect.select2({
        dropdownParent: $('#quote_drawer')
    });
}
