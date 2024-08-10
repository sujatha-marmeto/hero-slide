const sectionData = {
    section: {
        showArrows: true,
        showPageDots: true,
    },
    slideData: [
        {
            title: "New_Trendy",
            Description: "Elevate your wardrobe with our limited-time fashion offer!",
            image: "https://cdn.shopify.com/s/files/1/2303/2711/files/Fashion_Photography_for_E-Commerce_How_to_Capture_Your_Model_and_Clothing_in_the_Best_Light_2.jpg?v=1684706557",
            buttonLabel: "Click me",
            buttonLink: "#",
            style: {
                textAlignment: "center",
                contentPosition: "slideshow__text--bottom-left"
            },
        },
        {
            title: "fashionable-tops",
            Description: "Discover Signature Look: Fashion Forward and Fabulous!",
            image: "https://st4.depositphotos.com/12985790/20643/i/450/depositphotos_206432966-stock-photo-attractive-fashionable-woman-posing-white.jpg",
            buttonLabel: "Click me",
            buttonLink: "#",
            style: {
                textAlignment: "left",
                contentPosition: "slideshow__text--top-center"
            },
        },
        {
            title: "Women's_formal",
            Description: "Step into the World of Style with the Latest Fashion Trends Unveiled!",
            image: "https://www.the-catwalk.com/wp-content/uploads/2023/10/Change-Your-Dressing-Style-in-24-Hours.jpg",
            buttonLabel: "Click me",
            buttonLink: "#",
            style: {
                textAlignment: "center",
                contentPosition: "slideshow__text--bottom-left"
            },
        }
    ]
};

document.addEventListener('DOMContentLoaded', function () {
    const sliderList = document.getElementById('slider-list');
    const positionSelect = document.getElementById('position-select');
    let currentPositionClass = {}; // Store current position for each slide

    // Generate slides from slideData
    sectionData.slideData.forEach((slide, index) => {
        const slideItem = document.createElement('li');
        slideItem.className = 'splide__slide';
        slideItem.setAttribute('data-slide-index', index); // Add data attribute

        const img = document.createElement('img');
        img.src = slide.image;
        img.alt = slide.title;

        const content = document.createElement('div');
        content.className = `slideshow__text ${slide.style.contentPosition}`;
        content.style.textAlign = slide.style.textAlignment; // Apply initial text alignment

        const title = document.createElement('h2');
        title.textContent = slide.title;
        title.className = 'slideshow__title';

        const description = document.createElement('p');
        description.textContent = slide.Description;
        description.className = 'slideshow__description';

        const button = document.createElement('a');
        button.href = slide.buttonLink;
        button.textContent = slide.buttonLabel;
        button.className = 'slideshow__button';

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(button);

        slideItem.appendChild(img);
        slideItem.appendChild(content);

        sliderList.appendChild(slideItem);

        // Store initial position class for each slide
        currentPositionClass[index] = slide.style.contentPosition;
    });

    // Initialize Splide
    const splide = new Splide('#image-slider', {
        heightRatio: 0.5,
        pagination: sectionData.section.showPageDots,
        arrows: sectionData.section.showArrows,
    }).mount();

    // Function to update the position of the active slide
    function updateActiveSlidePosition(selectedClass) {
        const slides = document.querySelectorAll('.splide__slide');

        slides.forEach(slide => {
            const slideContent = slide.querySelector('.slideshow__text');
            if (slideContent) {
                // Reset the position for all slides to avoid conflict
                slideContent.classList.remove(
                    'slideshow__text--top-left',
                    'slideshow__text--top-center',
                    'slideshow__text--top-right',
                    'slideshow__text--center-left',
                    'slideshow__text--center',
                    'slideshow__text--center-right',
                    'slideshow__text--bottom-left',
                    'slideshow__text--bottom-center',
                    'slideshow__text--bottom-right'
                );
            }
        });

        // Apply the selected position only to the active slide
        const activeSlide = document.querySelector('.splide__slide.is-active');
        if (activeSlide) {
            const slideContent = activeSlide.querySelector('.slideshow__text');
            if (slideContent) {
                slideContent.classList.add(selectedClass);
            }
        }
    }

    // Update position on dropdown change
    positionSelect.addEventListener('change', function () {
        const selectedClass = positionSelect.value;
        updateActiveSlidePosition(selectedClass);
    });

    // Update position when the slide changes
    splide.on('moved', function () {
        const activeIndex = splide.index;
        const selectedClass = positionSelect.value;
        const activeSlide = document.querySelector(`.splide__slide[data-slide-index="${activeIndex}"] .slideshow__text`);
        
        // Update position based on the dropdown for the active slide only
        if (activeSlide) {
            activeSlide.className = `slideshow__text ${currentPositionClass[activeIndex]}`; // Revert to JSON-defined position
            activeSlide.classList.add(selectedClass); // Apply the updated dropdown position
        }
    });

    // Initial setup to set the correct position on load
    const initialPositionClass = currentPositionClass[splide.index];
    updateActiveSlidePosition(initialPositionClass);
});
