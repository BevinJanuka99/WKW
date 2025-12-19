/*
 * script.js
 * Wijeweera Knit Wear (WKW) Site Behavior - (CLEANED: Dark Mode removed; Focus on Navigation, Scroll, and Slider)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Toggle aria-expanded state for accessibility
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- 2. Dynamic Active Link Highlighting (For Multi-Page Nav) ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Logic for Dropdown Parent Highlighting
    const dropdownSubPages = ['about.html', 'our-story.html', 'gallery.html', 'careers.html', 'csr.html']; // Added careers.html
    const aboutUsParent = document.querySelector('.relative.group');

    if (aboutUsParent && dropdownSubPages.includes(currentPath)) {
        aboutUsParent.classList.add('dropdown-parent-active');
    }

    const navLinks = document.querySelectorAll('#desktop-nav a, #mobile-menu a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        if (linkPath === currentPath) {
        
            if (currentPath === 'order.html') {
                // Case 1: If the active page IS 'order.html', apply a special button highlight class
                link.classList.remove('hover:bg-indigo-700');
                // The styling for the active button needs to be defined in your CSS/Tailwind config
                // These classes typically create the active ring/shadow effect
                link.classList.add('bg-indigo-700', 'ring-2', 'ring-white', 'ring-offset-2', 'ring-offset-white', 'btn-press');
                
            } else {
                // Case 2: Standard active text link (Home, About Us, Products, etc.)
                link.classList.remove('text-gray-700', 'hover:text-indigo-600', 'hover:bg-indigo-50');
                link.classList.add('active-link');
            
                // Handle active link within dropdown
                const parentDropdown = link.closest('.dropdown-content');
                if (parentDropdown) {
                     parentDropdown.classList.add('dropdown-content-active');
                }
            }
        }
    });

    // --- 3. HEADER SCROLL EFFECT LOGIC ---
    const header = document.querySelector('header');
    const scrollThreshold = 50; 

    function handleScrollHeader() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
    
    // Set initial state and listen for scroll events
    handleScrollHeader(); // Call immediately on DOMContentLoaded
    window.addEventListener('scroll', handleScrollHeader);


    // --- 4. HOMEPAGE SLIDER LOGIC ---
    const sliderTrack = document.querySelector('.slider-track');
    
    if (sliderTrack) {
        const slides = document.querySelectorAll('.slider-slide');
        const prevButton = document.getElementById('slider-prev');
        const nextButton = document.getElementById('slider-next');
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        const intervalTime = 5000; // 5 seconds

        function goToSlide(index) {
            if (index < 0) {
                currentIndex = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            
            const offset = -currentIndex * 100;
            sliderTrack.style.transform = `translateX(${offset}%)`;
        }

        if (prevButton) prevButton.addEventListener('click', () => { 
            goToSlide(currentIndex - 1); 
            resetInterval(); 
        });
        if (nextButton) nextButton.addEventListener('click', () => { 
            goToSlide(currentIndex + 1); 
            resetInterval(); 
        });

        // Auto-scroll logic
        let slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, intervalTime);

        // Reset the auto-scroll interval after manual interaction
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, intervalTime);
        }
    }

    // --- 5. GALLERY PAGE MODAL LOGIC (Global functions must be defined here) ---
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');

    if (modal) {
        // Define global functions for modal
        window.openModal = function(imageSrc, captionText) {
            modalImage.src = imageSrc;
            modalCaption.textContent = captionText;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; 
        }

        window.closeModal = function() {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto'; 
        }

        // Close modal when the escape key is pressed
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                window.closeModal();
            }
        });
    }

});