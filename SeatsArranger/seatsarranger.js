var $ = mdui.$;
var allGroupsNames = new Array;
var result = null;
var canStart = true;
var inst;
allGroupsNames[1] = ['顾大局', '唐集政', '熊涛', '万芬', '凌丹', '熊英凡', '周志豪', '熊依诺', '李婧妍'];
allGroupsNames[2] = ['刘雪琦', '陈仪', '齐述俊', '闵明哲', '陈明慧', '牟芳黎', '牟洪毅', '危佳熙', '李权津'];
allGroupsNames[3] = ['熊俊泽', '邓春寅', '张念箴', '余俊晖', '邹名源', '邓佳鹏', '朱丹榕', '熊月慈'];
allGroupsNames[4] = ["郭美成", "刘嘉宸", "张祖龙", "丁晨悦", "孙宗兴", "张梦婕", "张苏颜", "熊芊妍"];
allGroupsNames[5] = ['陶振扬', '欧阳奕哲', '夏天昊', '徐凯', '胡子颖', '戴佳乐', '汪瑞卿', '喻鸿杰'];
allGroupsNames[6] = ['周文涛', '万泽宇', '万礼庆', '梁烨', '聂义彪', '李语涵', '陈欣宇', '丁敬谦'];
$(function () {
  
  $('#go').on('click', function () {
    if (canStart) {
      var selectedGroup = $('#select1').val();
      var firstRowNum = $('#select2').val();
      allGroupsNames[Number(selectedGroup)].sort(function () {
        return (0.5 - Math.random());
      });
      var i = 1;
      while (i < 13) {
        $('#seat' + i).text('');
        i++;
      }
      i = 1;
      while (i < allGroupsNames[Number(selectedGroup)].length + 1) {
        $('#seat' + (i + 3 - Number(firstRowNum))).text(allGroupsNames[selectedGroup][i - 1]);
        i++;
      }
      canStart = false;
    } else {
      inst = new mdui.Dialog('#checkDialog');
      inst.open();
      var resultInput = document.getElementById("resultInput");
      resultInput.focus();
    }
  });

  $(window).on('keydown', (event) => {
    if (event.which == 13) {
      checkAnswer();
    }
  });

  $('#checkDialog').on('opened.mdui.dialog', () => {
    changeQuestion();
  });

  $('#resultInput').on('propertychange input', () => {
    $('#resultField').removeClass('mdui-textfield-invalid');
    $('#resultInputErrorText').text('x∈R');
  });


  $("#confirmBotton").on('click', function () {
    checkAnswer();
  });
});

window.isCloseHint = true;
window.addEventListener("beforeunload", function (e) {
  if (window.isCloseHint) {
    var confirmationMessage = "确认离开？";
    (e || window.event).returnValue = confirmationMessage; // 兼容 Gecko + IE
    return confirmationMessage; // 兼容 Gecko + Webkit, Safari, Chrome
  }
});

function checkAnswer() {
  if ($('#resultInput').val() == result) {
    canStart = true;
    inst.close();
    $('#question').text('');
  } else {
    $('#resultField').addClass('mdui-textfield-invalid');
    $('#resultInputErrorText').text('回答错误');
    $('#resultInput').val('');
    changeQuestion();
  }
}

function changeQuestion() {
  $('#question').text('');
  var num1 = Math.floor(Math.random() * 100);
  var num2 = Math.floor(Math.random() * 100);
  result = num1 + num2;
  $('#question').text('回答问题：' + num1 + ' + ' + num2);
}