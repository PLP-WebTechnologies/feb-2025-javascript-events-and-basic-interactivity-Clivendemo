// Event Handling Section
document.addEventListener('DOMContentLoaded', () => {
    // Button Click
    const clickButton = document.getElementById('clickButton');
    let clickCount = 0;
    clickButton.addEventListener('click', () => {
        clickCount++;
        clickButton.textContent = `You pressed ${clickCount} times!`;
        clickButton.style.backgroundColor = `hsl(${clickCount * 20}, 70%, 50%)`;
    });

    // Hover Effects
    const hoverBox = document.getElementById('hoverBox');
    hoverBox.addEventListener('mouseenter', () => {
        hoverBox.style.transform = 'rotate(360deg) scale(1.2hh)';
    });
    hoverBox.addEventListener('mouseleave', () => {
        hoverBox.style.transform = 'rotate(0) scale(1)';
    });

    // Keypress Detection
    const keypressDisplay = document.getElementById('keypressDisplay');
    document.addEventListener('keydown', (e) => {
        keypressDisplay.textContent = `Key pressed: ${e.key}`;
        keypressDisplay.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    });

    // Secret Box (Double Click and Long Press)
    const secretBox = document.getElementById('secretBox');
    let pressTimer;
    let isLongPress = false;

    secretBox.addEventListener('mousedown', () => {
        isLongPress = false;
        pressTimer = setTimeout(() => {
            isLongPress = true;
            secretBox.textContent = 'That was a Long press ';
            secretBox.style.backgroundColor = '#e67e22';
        }, 1000);
    });

    secretBox.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
    });

    secretBox.addEventListener('dblclick', () => {
        if (!isLongPress) {
            secretBox.textContent = 'You Double clicked! ';
            secretBox.style.backgroundColor = '#1abc9c';
        }
    });

    // Interactive Elements Section
    // Color Change Button
    const colorChangeButton = document.getElementById('colorChangeButton');
    const colors = ['RED', 'PURPLE', 'GREEN', 'BLUE', 'YELLOW'];
    let colorIndex = 0;

    colorChangeButton.addEventListener('click', () => {
        colorIndex = (colorIndex + 1) % colors.length;
        colorChangeButton.style.backgroundColor = colors[colorIndex];
        colorChangeButton.textContent = `Color: ${colors[colorIndex]}`;
    });

    // Image Gallery
    const galleryContainer = document.querySelector('.gallery-container');
    const images = galleryContainer.querySelectorAll('img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentImageIndex = 0;

    function updateGallery() {
        const offset = -currentImageIndex * 400;
        galleryContainer.style.transform = `translateX(${offset}px)`;
    }

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGallery();
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGallery();
    });

    // Auto-advance gallery every 5 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGallery();
    }, 5000);

    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Form Validation
    const form = document.getElementById('validationForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordStrength = document.querySelector('.password-strength');

    // Real-time validation
    username.addEventListener('input', () => {
        const errorElement = username.nextElementSibling;
        if (username.value.length < 3) {
            errorElement.textContent = 'Username must be at least 3 characters long';
            username.classList.add('error');
        } else {
            errorElement.textContent = '';
            username.classList.remove('error');
        }
    });

    email.addEventListener('input', () => {
        const errorElement = email.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            errorElement.textContent = 'Please enter a valid email address';
            email.classList.add('error');
        } else {
            errorElement.textContent = '';
            email.classList.remove('error');
        }
    });

    password.addEventListener('input', () => {
        const errorElement = password.nextElementSibling;
        const strength = calculatePasswordStrength(password.value);
        
        // Update password strength indicator
        passwordStrength.style.width = `${strength.score}%`;
        passwordStrength.style.backgroundColor = strength.color;
        
        if (password.value.length < 8) {
            errorElement.textContent = 'Password must be at least 8 characters long';
            password.classList.add('error');
        } else {
            errorElement.textContent = '';
            password.classList.remove('error');
        }
    });

    function calculatePasswordStrength(password) {
        let score = 0;
        
        // Length check
        if (password.length >= 8) score += 25;
        if (password.length >= 12) score += 25;
        
        // Character type checks
        if (/[A-Z]/.test(password)) score += 25;
        if (/[0-9]/.test(password)) score += 25;
        if (/[^A-Za-z0-9]/.test(password)) score += 25;
        
        // Determine color based on score
        let color;
        if (score < 50) color = '#e74c3c';
        else if (score < 75) color = '#f1c40f';
        else color = '#2ecc71';
        
        return { score, color };
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Final validation before submission
        let isValid = true;
        
        if (username.value.length < 3) {
            username.nextElementSibling.textContent = 'Username must be at least 3 characters long';
            isValid = false;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.nextElementSibling.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        if (password.value.length < 8) {
            password.nextElementSibling.textContent = 'Password must be at least 8 characters long';
            isValid = false;
        }
        
        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
            passwordStrength.style.width = '0';
        }
    });
}); 