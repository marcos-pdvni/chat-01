const socket = io();

const messageForm = document.querySelector("#user-form");
const userName = document.querySelector(".user-name").textContent;
const messageBox = document.querySelector("#messages");
const addImage = document.querySelector(".attachment");
const imageInput = document.querySelector("#image");
const hamburguer = document.querySelector(".hamburguer");

socket.on("onlineUsers", (data) => {
  usersOnline(data);
});

socket.on("dis-connect", (data) => {
  usersOnline(data);
});

hamburguer.addEventListener("click", () => {
  window.location.href = "/logout";
});

addImage.addEventListener("click", () => {
  imageInput.classList.toggle("active");
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(e.target[0].value);
  if (!e.target[1].value) return;

  socket.emit("message", {
    creator: userName,
    message: e.target[1].value,
    imageUrl: e.target[0].value ? e.target[0].value : null,
  });

  renderMessage(userName, e.target[1].value, e.target[0].value);

  e.target[1].value = "";
  e.target[0].value = "";
});

socket.on("prevMessages", (data) => {
  data.map((dt) => {
    renderMessage(dt.nameCreator, dt.message, dt.imageUrl);
  });
});

function usersOnline(data) {
  const el = document.querySelector(".users-online");

  el.textContent = data;
}

function renderMessage(creator, message, imageUrl) {
  const bubble = document.createElement("div");
  const allowedUrl = /(https?:\/\/.*\.(?:png|jpg))/i;

  const allowedImage = allowedUrl.exec(imageUrl);

  creator === userName
    ? bubble.classList.add("user-active_bubble")
    : bubble.classList.add("other-active_bubble");

  bubble.innerHTML = `
        <div class="${
          creator === userName
            ? "user-active_bubble-title"
            : "other-active_bubble-title"
        }">
            ${creator}
        </div>
        <div class="${allowedImage ? "bubble-image active" : "bubble-image"}">
          <img src="${imageUrl}" alt="message-image" />
        </div>
        <div class="${
          creator === userName
            ? "user-active_bubble-text"
            : "other-user_bubble-text"
        }">
            ${message}
        </div>
    
    `;
  messageBox.insertBefore(bubble, messageBox.children[0]);
}

socket.on("newMessage", (data) => {
  console.log(data);
  renderMessage(data.creator, data.message, data.imageUrl);
});
