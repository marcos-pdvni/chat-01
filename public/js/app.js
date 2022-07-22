const eyeIcon = document.querySelector(".eye");
const passwordInput = document.querySelector("#password");
const form = document.querySelector("#form");
const feedback = document.querySelector("[data-slide]");

function toggleEyeClass() {
  eyeIcon.classList.toggle("active");

  if (eyeIcon.classList.contains("active")) {
    eyeIcon.innerHTML = '<i class="fa-solid fa-eye"></i>';
    passwordInput.setAttribute("type", "text");
  } else {
    eyeIcon.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    passwordInput.setAttribute("type", "password");
  }
}

async function createAccount(e) {
  e.preventDefault();

  try {
    e.target[4].innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    const data = await axios.post("/register", {
      username: e.target[0].value,
      password: e.target[1].value,
      secret: e.target[2].value,
      secretAnswer: e.target[3].value,
    });

    feedback.innerHTML = data.data.message;
    feedback.classList.add("valid");
    e.target[4].innerHTML = "Save";

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    feedback.innerHTML = error.response.data.message;
    feedback.classList.remove("valid");
    feedback.classList.add("invalid");
    e.target[4].innerHTML = "Save";
  }
}

async function loginUser(e) {
  e.preventDefault();

  console.log(e.target);
}

eyeIcon.addEventListener("click", toggleEyeClass);
form.addEventListener("submit", createAccount);
