document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const envelopeSection = document.getElementById('envelope-section');
    const gallerySection = document.getElementById('gallery-section');
    const openGalleryBtn = document.getElementById('open-gallery-btn');
    const backBtn = document.getElementById('back-btn');

    // Handle envelope click to open/close
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');

        // Hide the instruction text when opened
        const instruction = document.querySelector('.click-instruction');
        if (envelope.classList.contains('open')) {
            instruction.style.opacity = '0';
            instruction.style.transition = 'opacity 0.3s ease';
        } else {
            instruction.style.opacity = '1';
        }
    });

    // Handle transition to gallery
    openGalleryBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing the envelope when clicking the button

        // Fade out envelope section
        envelopeSection.style.opacity = '0';

        setTimeout(() => {
            envelopeSection.classList.remove('active-section');
            envelopeSection.style.display = 'none';

            gallerySection.style.display = 'flex';
            // Force reflow
            void gallerySection.offsetWidth;

            gallerySection.classList.add('active-section');
            gallerySection.style.opacity = '1';
        }, 800); // Wait for fade out
    });

    // Handle transition back to envelope
    backBtn.addEventListener('click', () => {
        // Fade out gallery section
        gallerySection.style.opacity = '0';

        setTimeout(() => {
            gallerySection.classList.remove('active-section');
            gallerySection.style.display = 'none';

            envelopeSection.style.display = 'flex';
            // Force reflow
            void envelopeSection.offsetWidth;

            envelopeSection.classList.add('active-section');
            envelopeSection.style.opacity = '1';

            // Re-close envelope for the surprise factor when going back
            envelope.classList.remove('open');
            document.querySelector('.click-instruction').style.opacity = '1';
        }, 800);
    });

    // Add staggered entrance animations to polaroids when section becomes active
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('active-section') && mutation.target.id === 'gallery-section') {
                const polaroids = document.querySelectorAll('.polaroid');
                polaroids.forEach((el, index) => {
                    el.style.opacity = '0';
                    el.style.transform = `translateY(30px) rotate(${index % 2 === 0 ? 4 : -4}deg)`;

                    setTimeout(() => {
                        el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        el.style.opacity = '1';
                        // Keep the original rotation pattern
                        const rotation = index % 3 === 0 ? -3 : (index % 2 === 0 ? 4 : -5);
                        el.style.transform = `rotate(${rotation}deg)`;
                    }, 200 * index + 100);
                });
            }
        });
    });

    observer.observe(gallerySection, { attributes: true, attributeFilter: ['class'] });
});
