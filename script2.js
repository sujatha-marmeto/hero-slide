const sectionData = {
    section: {
        showArrows: true,
        showPageDots: true,
    },
    slideData: [
        {
            title: "New_Trendy",
            Description: "Elevate your wardrobe with our limited-time fashion offer!",
            image: "https://t4.ftcdn.net/jpg/02/62/24/31/240_F_262243135_q7xBjfg02gaeD1NVfIqHBLz3qrOMFYcw.jpg",
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
            image: "https://t3.ftcdn.net/jpg/02/28/55/86/240_F_228558648_IbUYENc9hKfOTlleFgrkspGsEdHIC9KK.jpg",
            buttonLabel: "Click me",
            buttonLink: "#",
            style: {
                textAlignment: "left",
                contentPosition: "slideshow__text--top-right"
            },
        },
        {
            title: "Women's_formal",
            Description: "Step into the World of Style with the Latest Fashion Trends Unveiled!",
            image: "https://t3.ftcdn.net/jpg/03/03/08/28/240_F_303082827_YvHx1wifAKKysao9wdNvHJ6KP7RHU6Us.jpg",
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

    // Generate slides from slideData
    sectionData.slideData.forEach((slide, index) => {
        const slideItem = document.createElement('li');
        slideItem.className = 'splide__slide';

        const img = document.createElement('img');
        img.src = slide.image;
        img.alt = slide.title;

        const content = document.createElement('div');
        content.className = `slideshow__text ${slide.style.contentPosition}`;
        content.style.textAlign = slide.style.textAlignment;
        content.setAttribute('data-slide-index', index);

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
    });

    // Initialize Splide
    const splide = new Splide('#image-slider', {
        heightRatio: 0.5,
        pagination: sectionData.section.showPageDots,
        arrows: sectionData.section.showArrows,
    }).mount();

    // Update position on dropdown change
    positionSelect.addEventListener('change', function () {
        const selectedClass = positionSelect.value;

        console.log('Selected Class:', selectedClass); // Debugging

        // Update each slide's content position based on selected dropdown value
        sectionData.slideData.forEach((slide, index) => {
            const slideContent = document.querySelector(`.slideshow__text[data-slide-index="${index}"]`);
            if (slideContent) {
                console.log('Updating Slide Index:', index); // Debugging
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
                slideContent.classList.add(selectedClass);
            }
        });

        // Optional: Refresh Splide to reflect changes
        splide.refresh();
    });
});


