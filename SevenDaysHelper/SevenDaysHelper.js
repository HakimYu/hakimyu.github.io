var $ = mdui.$;
var loginDialog = new mdui.Dialog('#loginDialog');
localStorage.setItem("szoneVersion", "3.1.0");
$(function () {
  if (localStorage.getItem('token') == null) {
    loginDialog.open();
    $('#loginDialog').on('confirm.mdui.dialog', () => {
      login($('#userCode').val(), $('#password').val());
    });
  }

});

$('#get').on('click', () => {
  var data = getSubjects($('#studentCode').val());
  console.log(data);
})

function getUserInfo(callback) {
  $.ajax({
    method: "get",
    url: getUrl("my", "/userInfo/GetUserInfo"),
    headers: {
      Token: localStorage.getItem('token'),
      Version: localStorage.getItem('szoneVersion')
    },
    dataType: "json",
    success: (data, status) => callback(data, status)
  });
}
function getUserCache() {
  if (localStorage.getItem("userInfo") !== null) {
    return JSON.parse(Base64.decode(localStorage.getItem("userInfo")));
  } else {
    return false;
  }
}
function login(userCode, password) {
  $.ajax({
    method: "post",
    url: getUrl("my", "/login"),
    headers: {
      Version: localStorage.getItem('szoneVersion')
    },
    data: {
      userCode: userCode,
      password: Base64.encode(password)
    },
    dataType: "json",
    success: (data) => {
      if (data.status == 200) {
        localStorage.setItem('token', data.data.token);
        console.log(localStorage.getItem('token'));
        getUserInfo((data) => {
          if (data.status == 200) {
            localStorage.setItem("userInfo", Base64.encode(JSON.stringify(data)));
            mdui.snackbar({
              message: "登录成功",
              timeout: 500,
            });
          }
        });
      }
    }
  });
}
function getSubjects(studentCode) {
  var user_cache = getUserCache();
  $.ajax({
    method: "get",
    url: getUrl("score", "/exam/getUnClaimExams"),
    data: {
      studentName: user_cache.studentName,
      schoolGuid: user_cache.schoolGuid
    },
    headers: {
      Version: localStorage.getItem("szoneVersion"),
      Token: localStorage.getItem("token")
    },
    dataType: "json",
    success: (data) => {
      if (data.status != 200) {
        mdui.snackbar({
          message: data.message,
          buttonText: "确定",
        });
        return false;
      }
      console.log(data.data.list[0]);
      console.log(data);
    }
  });
  $.ajax({
    method: "post",
    url: getUrl("score", "/Question/Subjects"),
    headers: {
      Token: localStorage.getItem('token'),
      Version: localStorage.getItem('szoneVersion')
    },
    data: {
      examGuid: '20211217-0030-3577-2f9e-5b8d5f133103',
      studentCode: studentCode,
      schoolGuid: 'd5a1557c-ba46-4c4f-949f-c6fb0a153626',
      grade: 'g1',
      ruCode: '3601002'
    },
    dataType: "json",
    success: (data) => {
      if (data.status != 200) {
        mdui.snackbar({
          message: data.message,
        });
        localStorage.removeItem('token');
        return;
      }
      return data;
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