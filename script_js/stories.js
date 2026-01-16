 // 1. BEFORE/AFTER SLIDER LOGIC
        const slider = document.getElementById('slider');
        const overlay = document.getElementById('sliderOverlay');
        const handle = document.getElementById('sliderHandle');
        let isDown = false;

        function moveSlider(e) {
            const rect = slider.getBoundingClientRect();
            // Get X position of mouse/touch relative to container
            let x = (e.clientX || e.touches[0].clientX) - rect.left;
            
            // Constrain within bounds
            if(x < 0) x = 0;
            if(x > rect.width) x = rect.width;

            // Apply width to overlay and position to handle
            overlay.style.width = x + 'px';
            handle.style.left = x + 'px';
        }

        // Mouse Events
        slider.addEventListener('mousedown', () => isDown = true);
        window.addEventListener('mouseup', () => isDown = false);
        window.addEventListener('mousemove', (e) => {
            if(isDown) moveSlider(e);
        });

        // Touch Events (Mobile)
        slider.addEventListener('touchstart', () => isDown = true);
        window.addEventListener('touchend', () => isDown = false);
        window.addEventListener('touchmove', (e) => {
            if(isDown) moveSlider(e);
        });


        // 2. SCROLL REVEAL
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


        // 3. CURSOR
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