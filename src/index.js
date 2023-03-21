function sendData() {
  var articleJSON = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    text: document.getElementById("text").value,
  };
  fetch("http://127.0.0.1:3000", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(articleJSON),
  });
}
window.onload = () => {
  const clickButton = document.querySelector("#click");

  clickButton.onclick = () => {
    sendData();
  };
};
