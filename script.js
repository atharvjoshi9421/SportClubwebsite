  // 1. Preloader Logic
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });

        // 2. Custom Cursor Logic
        const cursor = document.querySelector('.cursor');
        const clickables = document.querySelectorAll('.clickable');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });

        // 3. Navigation Scroll Effect
        // window.addEventListener('scroll', () => {
        //     const nav = document.getElementById('navbar');
        //     if (window.scrollY > 50) nav.classList.add('scrolled');
        //     else nav.classList.remove('scrolled');
        // });

        // 4. Scroll Reveal & Number Counter
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Trigger Number Counter if active
                    const numbers = entry.target.querySelectorAll('.stat-number');
                    if(numbers.length > 0) {
                        numbers.forEach(num => {
                            const target = +num.getAttribute('data-target');
                            const updateCount = () => {
                                const count = +num.innerText;
                                const inc = target / 100; // speed
                                if(count < target) {
                                    num.innerText = Math.ceil(count + inc);
                                    setTimeout(updateCount, 20);
                                } else {
                                    num.innerText = target + "+";
                                }
                            };
                            updateCount();
                        });
                    }
                }
            });
        }, { threshold: 0.1 });

        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stats-section');
        reveals.forEach(el => revealObserver.observe(el));

        // 5. 3D Tilt Effect for Cards
        const cards = document.querySelectorAll('.sport-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            });
        });
