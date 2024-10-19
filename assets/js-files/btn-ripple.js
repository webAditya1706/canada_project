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
    ripple.classList.add("ripple");

    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => {
        ripple.remove();
    });
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener("click", addRippleEffect);
});
