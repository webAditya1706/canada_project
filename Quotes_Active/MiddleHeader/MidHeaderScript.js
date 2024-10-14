const medSelect = new mdc.select.MDCSelect(document.querySelector('.mdc-select'));

// Set the text of the selected option when an option is selected
medSelect.listen('MDCSelect:change', () => {
    console.log(`Selected option: ${medSelect.value}`);
});

// Initialize the first switch component
const mid_switchElement1 = document.querySelector('#mid_selected-switch-1');
let mid_isChecked1 = false;

mid_switchElement1.addEventListener('click', function () {
    mid_isChecked1 = !mid_isChecked1;
    mid_switchElement1.setAttribute('aria-checked', mid_isChecked1);
    if (mid_isChecked1) {
        mid_switchElement1.classList.add('mdc-switch--selected');
    } else {
        mid_switchElement1.classList.remove('mdc-switch--selected');
    }
});

// Initialize the second switch component
const _midswitchElement2 = document.querySelector('#mid_selected-switch-2');
let mid_isChecked2 = false;

_midswitchElement2.addEventListener('click', function () {
    mid_isChecked2 = !mid_isChecked2;
    _midswitchElement2.setAttribute('aria-checked', mid_isChecked2);
    if (mid_isChecked2) {
        _midswitchElement2.classList.add('mdc-switch--selected');
    } else {
        _midswitchElement2.classList.remove('mdc-switch--selected');
    }
});

// midheader js switchElement_3

const switchElement3 = document.querySelector('#selected-switch-3');
let isChecked3 = false;

switchElement3.addEventListener('click', function () {
    isChecked3 = !isChecked3;
    switchElement3.setAttribute('aria-checked', isChecked3);
    if (isChecked3) {
        switchElement3.classList.add('mdc-switch--selected');
    } else {
        switchElement3.classList.remove('mdc-switch--selected');
    }
});

// midheader js switchElement_4

const switchElement4 = document.querySelector('#selected-switch-4');
let isChecked4 = false;

switchElement4.addEventListener('click', function () {
    isChecked4 = !isChecked4;
    switchElement4.setAttribute('aria-checked', isChecked4);
    if (isChecked4) {
        switchElement4.classList.add('mdc-switch--selected');
    } else {
        switchElement4.classList.remove('mdc-switch--selected');
    }
});

// middle Headers script
