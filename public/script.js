document.addEventListener('DOMContentLoaded', () => {

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwGFEz3ZhW3vgzpYzgX3S4JN1XvrxQGPEHp6ncG1CtDDKg3YHXQ9UfHFBfW9uYwIbLW/exec";

    initParticles();

    const form = document.getElementById('registerForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = document.getElementById('loader');
    const messageBox = document.getElementById('message');

    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        messageBox.className = 'message-box hidden';
        messageBox.textContent = '';

        const ingame = document.getElementById('ingame').value.trim();
        const zalo = document.getElementById('zalo').value.trim();
        const gopQuy = document.getElementById('gopQuy').value;
        const daDong = document.getElementById('daDong').checked;

        if (!ingame || !zalo) {
            showMessage("Vui lòng điền Ingame và Zalo", "error");
            return;
        }

        submitBtn.disabled = true;
        btnText.style.opacity = "0";
        loader.style.display = "block";

        try {

            const formData = new FormData();

            formData.append("ingame", ingame);
            formData.append("zalo", zalo);
            formData.append("gopQuy", gopQuy || 0);
            formData.append("daDong", daDong);

            const response = await fetch(SCRIPT_URL, {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {

                showMessage(data.message, "success");

                form.reset();

            } else {

                showMessage("Có lỗi xảy ra", "error");

            }

        } catch (error) {

            console.error(error);

            showMessage("Không thể kết nối server", "error");

        }

        submitBtn.disabled = false;
        btnText.style.opacity = "1";
        loader.style.display = "none";

    });

    function showMessage(text, type) {

        messageBox.textContent = text;
        messageBox.className = `message-box ${type}`;

        if (type === "success") {

            setTimeout(() => {
                messageBox.classList.add("hidden");
            }, 5000);

        }

    }

    function initParticles() {

        const container = document.getElementById('particles-container');

        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            createParticle(container);
        }

    }

    function createParticle(container) {

        const particle = document.createElement('div');

        const size = Math.random() * 4 + 2;
        const posX = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.5 + 0.2;

        particle.style.position = 'absolute';
        particle.style.bottom = '-10px';
        particle.style.left = `${posX}vw`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = '#cba153';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 ${size * 2}px #cba153`;
        particle.style.opacity = opacity;

        particle.animate([
            { transform: `translate3d(0,0,0)`, opacity: 0 },
            { opacity: opacity, offset: 0.1 },
            { opacity: opacity, offset: 0.8 },
            { transform: `translate3d(${Math.random() * 100 - 50}px,-110vh,0)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            iterations: Infinity,
            easing: "linear"
        });

        container.appendChild(particle);

    }

});