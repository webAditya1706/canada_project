function addRippleEffect(e) {
    const ripple = document.createElement("span");
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("white_ripple");

    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => {
        ripple.remove();
    });
}

const buttons = document.querySelectorAll('.btn_ripple_white');
buttons.forEach(button => {
    button.addEventListener("click", addRippleEffect);
});


// btn_theme_ripple

function addRippleEffect_2(e) {
    const ripple = document.createElement("span");
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("theme_ripple");

    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => {
        ripple.remove();
    });
}

const buttons_2 = document.querySelectorAll('.btn_theme_ripple');
buttons_2.forEach(button => {
    button.addEventListener("click", addRippleEffect_2);
});