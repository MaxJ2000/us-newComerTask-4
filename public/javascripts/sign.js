let account = localStorage.getItem("account");

if (typeof Storage !== "undefined") {
  if (!account) {
    login();
  } else {
    document.querySelector(".login").style.display = "none";
    document.querySelector(".logout").style.display = "inline";
  }
} else {
  swal.fire({
    title: "Oops!",
    text: "Your browser can not support localstorage.",
    icon: "error"
  });
}

function login() {
  swal
    .mixin({
      input: "text",
      confirmButtonText: "Next &rarr;",
      focusConfirm: false,
      showCancelButton: true,
      progressSteps: ["1", "2"]
    })
    .queue([
      {
        title: "账号",
        text: "输入你的账号"
      },
      {
        title: "密码",
        text: "输入你的密码",
        input: 'password'
      }
    ])
    .then((result) => {
      console.log(result.value[0]);
      if (result.value[0] === undefined || result.value[0] === null) {
        login();
        return false;
      }

      localStorage.setItem("account", result.value[0]);
      account = localStorage.getItem("account");
      location.reload();
    });
}

function logout() {
  swal
    .fire({
      title: "確定要登出?",
      icon: "warning",
      buttons: true
    })
    .then(e => {
      if (e) {
        localStorage.clear();
        location.reload();
      }
    });
}
