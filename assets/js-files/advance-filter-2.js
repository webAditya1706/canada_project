// ======================= JS =======================

let selectedOptions = []

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

$(document).on('change', '.js-example-basic-single-2', function () {
    generateDynamicField(this.value, this);
});

// Listen for filter selection (dynamic selects)
$(document).on('change', '.select_value_text', function () {
    const key = $(this).val();
    generateDynamicField(key, this);
    addFilterButton();
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



// Generate dynamic field
const generateDynamicField = async (key, el) => {
    // return if is a third dropdown
    // const count = $('#new_selct_dropdown .new_filter').length;
    // if (count >= 2) {
    //     return
    // }

    const $filterWrapper = $(el).closest('.new_filter');

    const container = $filterWrapper; // append inside same filter block

    // ✅ remove ONLY this filter's field
    $filterWrapper.find('.filter_field').remove();

    if (key === 'all-filters') return;

    const config = fieldConfig[key];

    if (!config) {
        container.append(`
            <div class="filter_field">
                <div class="form-label text-light">${formatLabel(key)}</div>
                <input type="text" class="form-control theme_bg_color" />
            </div>
        `);
        return;
    }

    if (config.type === 'select') {
        const $wrapper = $(`
            <div class="filter_field">
                <div class="form-label text-light">${config.label}</div>
                <select class="form-select theme_bg_color">
                    ${config.options.map(opt =>
            `<option value="${opt.toLowerCase()}">${opt}</option>`
        ).join('')}
                </select>
            </div>
        `);

        container.append($wrapper);

        $wrapper.find('select').select2({
            dropdownParent: $('#quote_drawer')
        });
    }

    if (config.type === 'date') {
        container.append(`
            <div class="filter_field">
                <div class="form-label text-light">${config.label}</div>
                <input type="date" class="form-control theme_bg_color" />
            </div>
        `);
    }
};




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

    const options = [
        "all-filters", "account-number", "activity-date", "commodity", "contact-name",
        "customer-legal-name-on-contract", "due-date", "new-business", "number-of-accounts",
        "quote-id", "relationship-manager", "start-date", "state", "status", "utility", "volume"
    ];

    const filteredOptions = options.filter(opt =>
        opt !== excludeKey && !selectedOptions.includes(opt)
    );


    const html = `
    
        <div class="slect_dropdown_container mt-4">
            <div class="new_filter">
                <div class="d-flex flex-row gap-2 align-items-center">
                    <select class="form-select js-example-basic-single-2 mt-4">
                        ${filteredOptions.map(opt => {
        // if (opt === excludeKey) return '';
        const selected = opt === "all-filters" ? 'selected' : '';
        return `<option value="${opt}" ${selected}>${formatLabel(opt)}</option>`;
    }).join('')}
                    </select>
                        <img src=".././assets/icons/Form_delete.png" class="Form_delete" onclick="deleteFilter(this)" alt="Form_delete">            
                </div>
            </div>
        </div>
    `;

    const $newSelectWrapper = $(html).appendTo("#new_selct_dropdown");
    const $newSelect = $newSelectWrapper.find('select');

    // Initialize Select2
    $newSelect.select2({
        dropdownParent: $('#quote_drawer')
    });


    const count = $('#new_selct_dropdown .new_filter').length;

    if (count >= 2) {
        $('.add_filter_btn').hide();
    } else {
        $('.add_filter_btn').show();
    }

    toggleAddFilterBtn()
}

function deleteFilter(el) {
    $(el).closest('.new_filter').remove();


    const count = $('#new_selct_dropdown .new_filter').length;

    if (count >= 2) {
        $('.add_filter_btn').hide();
    } else {
        $('.add_filter_btn').show();
    }
}


const toggleAddFilterBtn = () => {


    const count = $('#new_selct_dropdown .new_filter').length;

    if (count >= 2) {
        $('.add_filter_btn').hide();
    } else {
        $('.add_filter_btn').show();
    }
}
