// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add navbar shadow on scroll
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  } else {
    nav.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  }
});

// Contact Form Submission Handler with FormSubmit
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalBtnText = submitBtn.textContent;

      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        // Get form data and convert to JSON
        const formData = new FormData(contactForm);
        const object = {};
        formData.forEach((value, key) => {
          object[key] = value;
        });
        const json = JSON.stringify(object);

        // Send to FormSubmit AJAX endpoint
        const response = await fetch(
          "https://formsubmit.co/ajax/fd9a30d50f8f137a8b5071e425567222",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: json,
          }
        );

        const data = await response.json();

        if (response.ok && data.success) {
          // Success
          formMessage.style.display = "block";
          formMessage.style.backgroundColor = "#d4edda";
          formMessage.style.color = "#155724";
          formMessage.style.border = "1px solid #c3e6cb";
          formMessage.textContent =
            "Thank you! Your message has been sent successfully.";

          // Reset form
          contactForm.reset();

          // Hide message after 5 seconds
          setTimeout(() => {
            formMessage.style.display = "none";
          }, 5000);
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        // Error
        formMessage.style.display = "block";
        formMessage.style.backgroundColor = "#f8d7da";
        formMessage.style.color = "#721c24";
        formMessage.style.border = "1px solid #f5c6cb";
        formMessage.textContent =
          "Oops! There was a problem sending your message. Please try again.";
        console.error("Error:", error);
      } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }
});
