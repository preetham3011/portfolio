// Intersection Observer for Scroll Animation
// Selecting all sections to apply the scroll effect
const sections = document.querySelectorAll('section');

// Callback function for intersection observer
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 'visible' class when the section is in the viewport
            entry.target.classList.add('visible');
        } else {
            // Remove 'visible' class when the section is out of the viewport
            entry.target.classList.remove('visible');
        }
    });
};

// Creating an IntersectionObserver with a threshold of 0.1
const observer = new IntersectionObserver(animateOnScroll, { threshold: 0.1 });

// Observing each section for visibility
sections.forEach(section => {
    section.classList.add('fade-section'); // Initial class for all sections
    observer.observe(section);
});

// Optional: Smooth Scroll for Navigation Links
// Adds smooth scrolling for navbar links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Message confirmation for the contact form (if present)
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Message sent successfully!");
    });
}
