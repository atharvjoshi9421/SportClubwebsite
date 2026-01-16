 // 1. Custom Cursor
        const cursor = document.querySelector('.cursor');
        const clickables = document.querySelectorAll('.clickable');

        if(window.innerWidth > 900) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
            clickables.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
            });
        }

        // 2. Mobile Menu
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-times');
            hamburger.querySelector('i').classList.toggle('fa-bars');
        });

        // 3. FAQ Accordion Logic
        const accordions = document.querySelectorAll('.accordion-item');
        accordions.forEach(item => {
            item.addEventListener('click', () => {
                // Close others
                accordions.forEach(other => {
                    if (other !== item) other.classList.remove('active');
                });
                // Toggle clicked
                item.classList.toggle('active');
            });
        });