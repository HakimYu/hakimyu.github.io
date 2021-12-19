var $ = mdui.$;
var loginDialog = new mdui.Dialog('#loginDialog');
localStorage.setItem("szoneVersion", "3.1.0");
$(function() {
  if (localStorage.getItem('token') == null) {
    loginDialog.open();
    $('#loginDialog').on('confirm.mdui.dialog', () => {
      login($('#userCode').val(), $('#password').val());
    });
  } else {
    getSubjects();
  }

  $('#get').on('click', () => {
    $('#table').removeClass('mdui-hidden')
  });
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
            getSubjects();
          } else {
            mdui.snackbar({
              message: data.message,
              timeout: 500,
            });
          }
        });
      }
      else {
        mdui.snackbar({
          message: data.message,
          timeout: 500,
        });
      }
    }
  });
}

function getSubjects() {
  var user_cache = getUserCache().data;
  var lastExam;
  $.ajax({
    method: "get",
    url: getUrl("score", "/exam/getClaimExams"),
    data: {
      studentName: user_cache.studentName,
      schoolGuid: user_cache.schoolGuid,
      startIndex: 0,
      grade: user_cache.grade === "" ? user_cache.currentGrade : user_cache.grade,
      rows: 6
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
        localStorage.removeItem('token')
        return false;

      }
      lastExam = data.data.list[0];
      $.ajax({
        method: "post",
        url: getUrl("score", "/Question/Subjects"),
        headers: {
          Token: localStorage.getItem('token'),
          Version: localStorage.getItem('szoneVersion')
        },
        data: {
          examGuid: lastExam.examGuid,
          studentCode: lastExam.studentCode,
          schoolGuid: lastExam.schoolGuid,
          grade: 'g1',
          ruCode: lastExam.ruCode
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
          let i = 0;
          for (subject of data.data.subjects) {
            var fullScore = subject.fullScore;
            var myScore = subject.myScore;
            var subjectName = subject.km;
            var classRanking = subject.cs;
            var schoolRanking = subject.ss;
            var subjectTable = "";
            subjectTable += "<tr>";
            subjectTable += "    <td>" + subjectName + "</td>";
            subjectTable += "    <td>" + myScore + '/' + fullScore + "</td>";
            subjectTable += "    <td>" + classRanking + "</td>";
            subjectTable += "    <td>" + schoolRanking + "</td>";
            subjectTable += "</tr>";
            $('#tableBody').append(subjectTable);
            mdui.mutation();
            i++;
          }
        }
      });
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