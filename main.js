document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const loginBtn = document.getElementById('login-btn');
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const joinRoomButtons = document.querySelectorAll('.join-room');
    const matchesContainer = document.getElementById('matches-container');
    let username = '';

    // Login
    loginBtn.addEventListener('click', () => {
        username = usernameInput.value.trim();
        if (!username) {
            alert('Por favor, ingresa un nombre.');
            return;
        }
        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(`Bienvenido, ${username}. Tu MMR es ${data.mmr}.`);
            });
    });

    // Chat
    sendMessageBtn.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (!message) return;
        fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, message }),
        });
        chatInput.value = '';
    });

    // Salas
    joinRoomButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const room = btn.parentElement.getAttribute('data-room');
            fetch(`/api/join-room/${room}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(`Unido a la sala ${room}.`);
                });
        });
    });
});
