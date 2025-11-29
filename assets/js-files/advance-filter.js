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
            "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
            "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
            "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
            "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
            "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
            "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
            "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
            "Wisconsin","Wyoming"
        ]
    },
    "status": { type: "select", label: "Status", options: ["Complete","In Progress","Incomplete","Contract","Booked"] },
    "utility": { type: "select", label: "Utility", options: [] }
};

// Open offcanvas → initialize Select2 for all selects inside drawer
$('#quote_drawer').on('shown.bs.offcanvas', function () {
    $(this).find('select').select2({
        dropdownParent: $(this) // ensures Select2 dropdown appears inside drawer
    });
});

// Listen for filter selection (dynamic selects)
$(document).on('change', 'select.select_value_text', function () {
    const selected = $(this).val();
    generateDynamicField(selected);
});

// Generate dynamic field
function generateDynamicField(key) {
    const container = $("#dynamicFieldContainer");
    container.empty(); // clear previous
    if (key === "all-filters") return;

    const config = fieldConfig[key];

    if (!config) {
        // Default text input
        container.append(`
            <div class="mt-4">
                <div class="form-label text-light">${formatLabel(key)}</div>
                <input type="text" class="form-control theme_bg_color" />
            </div>
        `);
        appendFilterDropdown(key);
        return;
    }

    if (config.type === "select") {
        container.append(`
            <div class="mt-4">
                <div class="form-label text-light">${config.label}</div>
                <select class="form-select dynamic-select theme_bg_color">
                    ${config.options.map(opt => `<option value="${opt.toLowerCase()}">${opt}</option>`).join('')}
                </select>
            </div>
        `);
        appendFilterDropdown(key);

        // Initialize select2 for newly added select
        container.find('select.dynamic-select').last().select2({
            dropdownParent: $('#quote_drawer')
        }).select2('open');

        return;
    }

    if (config.type === "date") {
        container.append(`
            <div class="mt-4">
                <div class="form-label text-light">${config.label}</div>
                <input type="date" class="form-control theme_bg_color" />
            </div>
        `);
        appendFilterDropdown(key);
    }
}

// Helper: format label
function formatLabel(text) {
    return text.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// Append "All Filters" dropdown excluding current key
function appendFilterDropdown(excludeKey = null) {
    const options = [
        "all-filters","account-number","activity-date","commodity","contact-name",
        "customer-legal-name-on-contract","due-date","new-business","number-of-accounts",
        "quote-id","relationship-manager","start-date","state","status","utility","volume"
    ];

    const html = `
        <div class="mt-4">
            <select class="form-select select_value_text mt-4" aria-label="Default select example">
                ${options.map(opt => {
                    if (opt === excludeKey) return '';
                    const selected = opt === "all-filters" ? 'selected' : '';
                    return `<option value="${opt}" ${selected}>${formatLabel(opt)}</option>`;
                }).join('')}
            </select>
        </div>
    `;

    $("#dynamicFieldContainer").append(html);

    // Initialize Select2 for this new dropdown
    $("#dynamicFieldContainer").find('select.select_value_text').last().select2({
        dropdownParent: $('#quote_drawer')
    });
}
