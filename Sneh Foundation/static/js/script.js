const faders = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
// ---- Show/Hide Password ----
function togglePassword(fieldId, toggleBtnId) {
  const input = document.getElementById(fieldId);
  const toggleBtn = document.getElementById(toggleBtnId);
  if (input.type === "password") {
    input.type = "text";
    toggleBtn.innerText = "🙈";
  } else {
    input.type = "password";
    toggleBtn.innerText = "👁️";
  }
}

// ---- Real-time Email Validation ----
function validateEmail(id) {
  const email = document.getElementById(id).value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    alert("⚠️ Please enter a valid email.");
  }
}

// ---- Real-time Phone Validation ----
function validatePhone(id) {
  const phone = document.getElementById(id).value;
  if (!/^[0-9]{10}$/.test(phone)) {
    alert("⚠️ Enter a 10-digit phone number.");
  }
}

// ---- AJAX Donation Form Submission ----
function submitDonationForm() {
  const form = document.getElementById("donateForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    fetch("/donate", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => {
        alert("✅ Donation submitted successfully!");
        form.reset();
      })
      .catch((err) => {
        alert("❌ Error submitting donation.");
        console.error(err);
      });
  });
}

// ---- Scroll Animation (on load) ----
window.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section, .help-container, .form-container, .content");
  sections.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 1s ease";
  });
  setTimeout(() => {
    sections.forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    });
  }, 200);
});
window.onload = function () {
  const redirectPage = sessionStorage.getItem("redirectAfterLogin");
  if (redirectPage) {
    sessionStorage.removeItem("redirectAfterLogin");
    window.location.href = redirectPage;
  }
}

