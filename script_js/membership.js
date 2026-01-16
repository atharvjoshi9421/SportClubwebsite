 // 1. BILLING TOGGLE LOGIC
        const toggle = document.getElementById('billingToggle');
        const monthlyLabel = document.getElementById('monthlyLabel');
        const yearlyLabel = document.getElementById('yearlyLabel');
        const prices = document.querySelectorAll('.tier-price');

        toggle.addEventListener('change', () => {
            if(toggle.checked) {
                // Yearly Mode
                yearlyLabel.classList.add('active');
                monthlyLabel.classList.remove('active');
                prices.forEach(price => {
                    const yearPrice = price.getAttribute('data-yearly');
                    price.innerHTML = `${yearPrice}<span>/yr</span>`;
                });
            } else {
                // Monthly Mode
                monthlyLabel.classList.add('active');
                yearlyLabel.classList.remove('active');
                prices.forEach(price => {
                    const monthPrice = price.getAttribute('data-monthly');
                    price.innerHTML = `${monthPrice}<span>/mo</span>`;
                });
            }
        });

        // 2. 3D CARD TILT (Vanilla JS)
        const cards = document.querySelectorAll('[data-tilt]');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Rotation calc
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            });
        });

        // 3. SCROLL REVEAL
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // 4. PARTICLES
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particlesArray = [];
        class Particle {
            constructor(x, y, dX, dY, size) {
                this.x = x; this.y = y; this.dX = dX; this.dY = dY; this.size = size;
            }
            draw() {
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
                ctx.fillStyle = '#00f260'; ctx.fill();
            }
            update() {
                if(this.x > canvas.width || this.x < 0) this.dX = -this.dX;
                if(this.y > canvas.height || this.y < 0) this.dY = -this.dY;
                this.x += this.dX; this.y += this.dY; this.draw();
            }
        }
        function init() {
            particlesArray = [];
            let count = (canvas.width*canvas.height)/20000;
            for(let i=0; i<count; i++){
                let size = Math.random()*2+1;
                particlesArray.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, (Math.random()*0.4)-0.2, (Math.random()*0.4)-0.2, size));
            }
        }
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            particlesArray.forEach(p => p.update());
        }
        window.addEventListener('resize', ()=>{ canvas.width=innerWidth; canvas.height=innerHeight; init(); });
        init(); animate();

        // 5. CURSOR
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