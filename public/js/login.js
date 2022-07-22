const loginForm = document.querySelector("#login-form");
const submitButton = document.querySelector("#submit-btn");

window.onload = () => {
  alert(
    "Hi!, there's a small error 'Internal Server Error' when you login the application. I'm still working on it, for now, just reload the page and it'll work. Thanks for visiting! \n" +
      "Oi! Há um pequeno erro 'Internal Server Error' quando você loga na aplicação. Ainda estou trabalhando para consertar, por agora, apenas recarregue a página e irá funcionar. Obrigado por visitar!"
  );
};

async function loginUser(e) {
  e.preventDefault();

  submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

  try {
    const response = await axios.post("/auth", {
      username: e.target[0].value,
      password: e.target[1].value,
    });

    submitButton.classList.remove("invalid");
    submitButton.classList.add("valid");
    submitButton.innerHTML = response.data.message;

    setTimeout(() => {
      window.location.href = "/application";
    }, 2000);
  } catch (error) {
    console.log(error);
    submitButton.classList.add("invalid");
    submitButton.innerHTML = error.response.data.message;

    setTimeout(() => {
      submitButton.classList.remove("invalid");
      submitButton.innerHTML = "Login";
    }, 2000);
  }
}

loginForm.addEventListener("submit", loginUser);
