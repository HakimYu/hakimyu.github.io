var $ = mdui.$;
$(function() {
  login
});

function getUserInfo(callback) {
  $.ajax({
    method: "get",
    url: getUrl("my", "/userInfo/GetUserInfo"),
    headers: {
      Token: localStorage.getItem('token')
    },
    dataType: "json",
    success: (data, status) => callback(data, status)
  });
}

function login(userCode, password) {
  $.ajax({
    method: "post",
    url: getUrl("my", "/login"),
    data: {
      userCode: userCode,
      password: Base64.encode(password)
    },
    dataType: "json",
    success: (data) => {
      if (data.status == 200) {
        localStorage.setItem('token', data.data.token);
        getUserInfo((data) => {
          if (data.status == 200) {
            localStorage.setItem("userInfo", Base64.encode(JSON.stringify(data)));
            mdui.snackbar({
              message: "登录成功",
              timeout: 500,
              //onClose: () => {}
            });

          }
        });
      }
    }
  });
}

function getUrl(host, path) {
  switch (host) {
    case "my":
      return "https://szone-my.7net.cc" + path;
      /*case "old":
          return "https://szone-api.7net.cc" + path;*/
    case "score":
      return "https://szone-score.7net.cc" + path;
    default:
      break;
  }
}