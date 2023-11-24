var reply = document.getElementsByClassName("fa-reply-all");
var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
let modal = document.getElementById("myModal");
let close = document.getElementById("close");

Array.from(reply).forEach(function (element) {
  element.addEventListener("click", function () {
    const [
      name,
      poem,
      date,
      thumbsUpCount,
      thumbsUpIcon,
      replyIcon,
      trashIcon,
    ] = [...this.parentNode.parentNode.childNodes]
      .filter((arr) => arr.nodeName.includes("SPAN"))
      .map((item) => item.innerText.trim());

    modal.style.display = "block";
    if ((modal.style.display = "block")) {
    }
});
});

Array.from(thumbUp).forEach(function (element) {
    element.addEventListener("click", function () {
      if (
        this.parentNode.parentNode.childNodes[11].firstChild.className ===
        "fa-solid fa-reply"
      ) {
        const [
          name,
          poem,
          date,
          thumbsUpCount,
          thumbsUpIcon,
          replyIcon,
          trashIcon,
        ] = [...this.parentNode.parentNode.childNodes]
          .filter((arr) => arr.nodeName.includes("SPAN"))
          .map((item) => item.innerText.trim());
  
        fetch("messages/thumbUp", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            poem,
            date,
            thumbsUpCount,
            thumbsUpIcon,
            replyIcon,
            trashIcon,
          }),
        })
          .then((response) => {
            if (response.ok) return response.json();
          })
          .then((data) => {
            console.log(data);
            window.location.reload(true);
          });
      } else {
        const [
          response,
          name,
          poem,
          date,
          thumbsUpCount,
          thumbsUpIcon,
          trashIcon,
        ] = [...this.parentNode.parentNode.childNodes]
          .filter((arr) => arr.nodeName.includes("SPAN"))
          .map((item) => item.innerText.trim());
  
        fetch("messages/thumbUp", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            response,
            name,
            poem,
            date,
            thumbsUpCount,
            thumbsUpIcon,
            trashIcon,
          }),
        })
          .then((response) => {
            if (response.ok) return response.json();
          })
          .then((data) => {
            console.log(data);
            window.location.reload(true);
          });
      }
    });
  });
  
  Array.from(trash).forEach(function (element) {
    element.addEventListener("click", function () {
      if (
        this.parentNode.parentNode.childNodes[13].parentElement.childNodes[11]
          .childNodes[0].className == "fa-solid fa-reply"
      ) {
        const [
          name,
          poem,
          date,
          thumbsUpCount,
          thumbsUpIcon,
          replyIcon,
          trashIcon,
        ] = [...this.parentNode.parentNode.childNodes]
          .filter((arr) => arr.nodeName.includes("SPAN"))
          .map((item) => item.innerText.trim());
  
        fetch("delete", {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            poem,
            date,
            thumbsUpCount,
            thumbsUpIcon,
            replyIcon,
            trashIcon,
          }),
        }).then(function (response) {
          window.location.reload();
        });
      } else {
        const [
          response,
          name,
          poem,
          date,
          thumbsUpCount,
          thumbsUpIcon,
          trashIcon,
        ] = [...this.parentNode.parentNode.childNodes]
          .filter((arr) => arr.nodeName.includes("SPAN"))
          .map((item) => item.innerText.trim());
  
        fetch("delete", {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            response,
            name,
            poem,
            date,
            thumbsUpCount,
            thumbsUpIcon,
            trashIcon,
          }),
        }).then(function (response) {
          window.location.reload();
        });
      }
    });
  });
  
  close.addEventListener("click", () => {
    modal.style.display = "none";
  });

