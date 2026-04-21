document.addEventListener('DOMContentLoaded', () => {
            const nav = document.getElementById('mainNav');
            const sub = document.querySelector('.sub-nav');
            const collapseEl = nav.querySelector('.collapse');

            let animationFrameId = null;

            function updateOffset() {
                sub.style.top = nav.offsetHeight + 'px';
            }

            // Continuous animation loop
            function animateOffset() {
                updateOffset();
                animationFrameId = requestAnimationFrame(animateOffset);
            }

            // Start tracking
            function startTracking() {
                if (!animationFrameId) {
                animateOffset();
                }
            }

            // Stop tracking
            function stopTracking() {
                if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
                updateOffset(); // final correction
                }
            }

            // Initial position
            updateOffset();

            // Update on window resize
            window.addEventListener('resize', updateOffset);

            if (collapseEl) {
                // Start immediately when animation begins
                collapseEl.addEventListener('show.bs.collapse', startTracking);
                collapseEl.addEventListener('hide.bs.collapse', startTracking);

                // Stop when animation finishes
                collapseEl.addEventListener('shown.bs.collapse', stopTracking);
                collapseEl.addEventListener('hidden.bs.collapse', stopTracking);
            }
            });