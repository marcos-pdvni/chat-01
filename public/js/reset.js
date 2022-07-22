async function searchForActiveUser() {
  const user = document.querySelector("#username");
  const feedback = document.querySelector("[data-reset]");
  const form = document.querySelector("[data-reset_form]");

  try {
    const data = await axios.get(`/users/${user.value}`);

    feedback.classList.remove("invalid");
    form.classList.add("active");
    form.innerHTML = ` <label for="answer" class="form-label">${data.data.secret}</label>
    <input type="text" name="answer" id="answer" class="form-control" />
    <label for="newPass" class="form-label">New Password:</label>
    <input
      type="password"
      name="newPassword"
      id="newPass"
      class="form-control"
    />
    <button
      type="submit"
      class="form-control"
      id="reset-submit"
    >Save</button>`;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const answerInput = document.querySelector("#answer");
      const submitButton = document.querySelector("#reset-submit");

      submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      try {
        const response = await axios.post("/reset", {
          resUser: user.value,
          answer: e.target[0].value,
          newPassword: e.target[1].value,
        });

        answerInput.classList.remove("invalid");
        submitButton.classList.remove("invalid");
        submitButton.classList.add("valid");
        submitButton.innerHTML = response.data.message;

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } catch (error) {
        console.log(error);
        answerInput.classList.add("invalid");
        submitButton.classList.add("invalid");
        submitButton.innerHTML = error.response.data.message;
      }
    });
  } catch (error) {
    feedback.innerHTML = error.response.data.message;
    feedback.classList.add("invalid");
  }
}
