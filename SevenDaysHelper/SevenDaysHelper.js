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
  getExams();
});

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
        getUserInfo((data) => {
          if (data.status == 200) {
            localStorage.setItem("userInfo", Base64.encode(JSON.stringify(data)));
            mdui.snackbar({
              message: "登录成功",
              timeout: 500,
            });
            getExams();
          }
        });
      }
    }
  });
}
function getExams() {
  var user_cache = getUserCache().data;
  $.ajax({
    method: "get",
    url: getUrl("score", "/exam/getClaimExams"),
    data: {
      studentName: user_cache.studentName,
      schoolGuid: user_cache.schoolGuid,
      startIndex: 0,
      grade: user_cache.grade === "" ? user_cache.currentGrade : user_cache.grade
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
      }
      for (examData of data.data.list) {
        examName = examData.examName;
        examTime = examData.time.replace(/(\d{4})-(\d{2})-(\d{2})/, "考试时间：$1年$2月$3日");
        examScore = examData.score;
        getSubjects(examData);
      }
    }
  });
}

function getSubjects(examData) {
    $.ajax({
      method: "post",
      url: getUrl("score", "/Question/Subjects"),
      headers: {
        Token: localStorage.Token,
        Version: localStorage.szoneVersion,
      },
      data: {
        examGuid: examData.examGuid,
        studentCode: examData.studentCode,
        schoolGuid: user_cache.schoolGuid,
        grade: user_cache.grade === "" ? user_cache.currentGrade : user_cache.grade,
        ruCode: examData.ruCode
      },
      dataType: "json",
      success: (data) => {
        if (data.status != 200) {
          mdui.snackbar({
            message: data.message,
          });
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