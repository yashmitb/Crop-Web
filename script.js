// Mobile Menu Toggle with Animation
const mobileMenuButton = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close mobile menu when clicking a link (on mobile screens)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("open");
    }
  });
});

// Smooth Scrolling for Navigation Links with Offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Parallax Effect
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  document.querySelector(".hero").style.transform = `translateY(${
    scrolled * 0.3
  }px)`;
});

// 3D Card Hover Effect
document
  .querySelectorAll(".feature-card, .tech-card, .future-card")
  .forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = -(x - centerX) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  });

// Enhanced Intersection Observer for Animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll("section, .feature-card, .tech-card, .future-card")
    .forEach((element) => {
      element.classList.add("fade-init"); // Set initial state
      observer.observe(element);
    });
});
// Contact Form Handling with Animation
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = contactForm.querySelector(".submit-button");
  submitButton.disabled = true; // Prevent multiple submissions
  submitButton.textContent = "Sending...";

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  if (!formData.name || !formData.email || !formData.message) {
    showAlert("Please fill in all fields.", "error");
    resetButton(submitButton);
    return;
  }

  try {
    const response = await fetch(
      "https://yashmit.pythonanywhere.com/send_email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json(); // Ensure the response is parsed

    if (response.ok) {
      showAlert(
        result.message || "Thank you! Your message has been sent successfully.",
        "success"
      );
      contactForm.reset();
    } else {
      throw new Error(result.error || "Failed to send message.");
    }
  } catch (error) {
    showAlert(
      error.message || "Oops! Something went wrong. Please try again.",
      "error"
    );
    console.error("Form submission error:", error);
  }

  resetButton(submitButton);
});

// **Reusable Success/Error Message**
function showAlert(message, type) {
  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.classList.add("alert", type);
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.classList.add("show");
  }, 100);

  setTimeout(() => {
    alertBox.classList.remove("show");
    setTimeout(() => alertBox.remove(), 300);
  }, 4000);
}

// **Reset Button State**
function resetButton(button) {
  setTimeout(() => {
    button.disabled = false;
    button.textContent = "Send Message";
  }, 3000);
}
