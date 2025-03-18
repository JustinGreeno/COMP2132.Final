document.addEventListener("DOMContentLoaded", () => {
  // ====================== Form 1: "My Practice Form" ======================
  const form1 = document.getElementById("registrationForm");
  if (form1) {
    form1.addEventListener("submit", (event) => {
      let hasError = false;
      // We'll assume 'password1' is the ID for Form 1's password field
      const nameField = document.getElementById("name");
      const passwordField = document.getElementById("password1");

      // Clear or remove styling if needed:
      clearInvalid("name");
      clearInvalid("password1");

      // Validate name
      if (nameField.value.trim().length < 2) {
        markInvalid("name");
        alert("Name must be at least 2 characters.");
        hasError = true;
      }
      // Validate password >= 6 chars
      if (passwordField.value.trim().length < 6) {
        markInvalid("password1");
        alert("Password must be at least 6 characters.");
        hasError = true;
      }

      if (hasError) {
        event.preventDefault();
      }
    });
  }

  // ====================== Form 2: "Student Registration Form" ======================
  // If the second form exists on this page, do:
  const form2 = document.getElementById("studentRegForm2");
  if (form2) {
    // 1) Show/hide password logic
    const pwd2 = document.getElementById("password2");
    const toggleBtn2 = document.getElementById("togglePwdBtn2");
    if (toggleBtn2 && pwd2) {
      toggleBtn2.addEventListener("click", () => {
        if (pwd2.type === "password") {
          pwd2.type = "text";
          toggleBtn2.textContent = "Hide";
        } else {
          pwd2.type = "password";
          toggleBtn2.textContent = "Show";
        }
      });
    }

    // 2) Date logic -> set to today & forbid past
    const dateInput2 = document.getElementById("classDate2");
    if (dateInput2) {
      const today = new Date();
      let year  = today.getFullYear();
      let month = today.getMonth() + 1;
      let day   = today.getDate();

      if (month < 10) month = "0" + month;
      if (day < 10)   day   = "0" + day;

      const dateString = `${year}-${month}-${day}`;
      dateInput2.value = dateString;
      dateInput2.min   = dateString;
    }

    // 3) Validation for form2
    form2.addEventListener("submit", (event) => {
      let isValid = true;

      // Clear old highlights
      clearInvalid("firstName2");
      clearInvalid("lastName2");
      clearInvalid("studentId2");
      clearInvalid("password2");
      clearInvalid("courses2");

      const fn2 = document.getElementById("firstName2");
      const ln2 = document.getElementById("lastName2");
      const sid2 = document.getElementById("studentId2");
      const pass2 = document.getElementById("password2");
      const course2 = document.getElementById("courses2");

      // BCIT ID pattern
      const bcitRegex = /^a0[0-9]{7}$/i;

      if (!fn2.value.trim()) {
        markInvalid("firstName2");
        alert("Please enter First Name (Form 2).");
        isValid = false;
      }
      if (!ln2.value.trim()) {
        markInvalid("lastName2");
        alert("Please enter Last Name (Form 2).");
        isValid = false;
      }
      if (!bcitRegex.test(sid2.value.trim())) {
        markInvalid("studentId2");
        alert("Student ID must match A0 + 7 digits, e.g. A01234567 (Form 2).");
        isValid = false;
      }
      if (pass2.value.trim().length < 6) {
        markInvalid("password2");
        alert("Password must be at least 6 chars (Form 2).");
        isValid = false;
      }
      if (!course2.value) {
        markInvalid("courses2");
        alert("Please choose a course (Form 2).");
        isValid = false;
      }

      if (!isValid) {
        event.preventDefault();
      }
    });
  }

  // ====================== Form 3: "studentForm" with advanced error messages ======================
  const form3 = document.getElementById("studentForm");
  if (form3) {
    const studentNumberRegEx = /^a0[0-9]{7}$/i;
    form3.addEventListener("submit", (event) => {
      let valid = true;
      // Clear old errors
      clearError("firstName3");
      clearError("studentId3");
      clearError("password3");
      clearError("courses3");

      const fn3 = document.getElementById("firstName3");
      const sid3 = document.getElementById("studentId3");
      const pw3  = document.getElementById("password3");
      const cr3  = document.getElementById("courses3");

      if (!fn3.value.trim()) {
        showError("firstName3", "First Name cannot be empty");
        valid = false;
      }
      if (!studentNumberRegEx.test(sid3.value.trim())) {
        showError("studentId3", "Must match A0 + 7 digits, e.g. A01234567");
        valid = false;
      }
      if (!pw3.value.trim() || pw3.value.trim().length < 6) {
        showError("password3", "Password must be at least 6 chars");
        valid = false;
      }
      if (!cr3.value) {
        showError("courses3", "Please choose a course");
        valid = false;
      }

      if (!valid) {
        event.preventDefault();
      }
    });
  }

  // =========== Helper Functions =============

  // For forms 1 & 2 (to highlight invalid fields):
  function markInvalid(fieldId) {
    const input = document.getElementById(fieldId);
    if (input) {
      input.classList.add("invalid");
    }
  }
  function clearInvalid(fieldId) {
    const input = document.getElementById(fieldId);
    if (input) {
      input.classList.remove("invalid");
    }
  }

  // For form 3 advanced error messages:
  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + "Error");
    if (input) {
      input.classList.add("invalid");
    }
    if (errorSpan) {
      errorSpan.textContent = message;
    }
  }
  function clearError(fieldId) {
    const input = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + "Error");
    if (input) {
      input.classList.remove("invalid");
    }
    if (errorSpan) {
      errorSpan.textContent = "";
    }
  }

  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumbnail");

  thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener("click", () => {
          mainImage.src = thumbnail.src;
      });
  });



  document.addEventListener("DOMContentLoaded", () => {
    const mainImage = document.getElementById("main-product-image");
    const thumbnails = document.querySelectorAll(".thumbnail-image");

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", () => {
            mainImage.src = thumbnail.src;
        });
    });
});


});



//                                           SHIRTS AMAZON 
$(document).ready(function(){
  // ------------------- Thumbnail Click: Update Main Image -------------------
  $(".thumbnail-img").on("click", function(){
      $("#main-product-image").attr("src", $(this).attr("src"));
  });
  
  // ------------------- Quantity Change: Update Total Cost -------------------
  // Assume price is $19.99; update an element with id="total-cost"
  $("#quantity").on("input", function(){
      const qty = parseInt($(this).val());
      const price = 19.99;
      const total = qty * price;
      $("#total-cost").text("Total: $" + total.toFixed(2));
  });
  
  // ------------------- Color Change: Update Text and Images -------------------
  $("#color").on("change", function(){
      const selectedColor = $(this).val();
      $("#color-description").text("Color: " + selectedColor);
      // Update main product image and thumbnails without changing the view type:
      const currentView = $("#main-product-image").attr("data-view") || "front";
      $("#main-product-image").attr("src", "../images/clothes/t-shirt-" + selectedColor + "-" + currentView + ".png");
      $(".thumbnail-img").each(function(){
          const thumbView = $(this).attr("data-view");
          $(this).attr("src", "../images/clothes/t-shirt-" + selectedColor + "-" + thumbView + ".png");
      });
  });
  
  // ------------------- Size Change: Update Text and Enable Button -------------------
  $("#size").on("change", function(){
      const selectedSize = $(this).val();
      $("#size-description").text("Size: " + selectedSize);
      // Enable the submit button if a size is chosen
      $("#add-to-cart-button").prop("disabled", false).text("Add to Cart");
  });
  
  // ------------------- Initially Disable Submit Button -------------------
  $("#add-to-cart-button").prop("disabled", true).text("Choose a size first");
});

