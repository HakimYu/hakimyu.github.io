var allGroupsNames = new Array;
var canClean = true;
var timeout;
var inst = new mdui.Dialog('#checkdialog');
allGroupsNames[1] = ['顾大局', '唐集政', '熊涛', '万芬', '凌丹', '熊英凡', '周志豪', '熊依诺', '李婧妍'];
allGroupsNames[2] = ['刘雪琦', '陈仪', '齐述俊', '闵明哲', '陈明慧', '牟芳黎', '牟洪毅', '危佳熙', '李权津'];
allGroupsNames[3] = ['熊俊泽', '邓春寅', '张念箴', '余俊晖', '邹名源', '邓佳鹏', '朱丹榕', '熊月慈'];
allGroupsNames[4] = ["郭美成", "刘嘉宸", "张祖龙", "丁晨悦", "孙宗兴", "张梦婕", "张苏颜", "熊芊妍"];
allGroupsNames[5] = ['陶振扬', '欧阳奕哲', '夏天昊', '徐凯', '胡子颖', '戴佳乐', '汪瑞卿', '喻鸿杰'];
allGroupsNames[6] = ['周文涛', '万泽宇', '万礼庆', '梁烨', '聂义彪', '李语涵', '陈欣宇', '丁敬谦'];
$(function () {
  $("#confirmBotton").mousedown(function () {
    timeout = setTimeout(function () {
      canClean = true;
      inst.close();
    }, 2000);
  });

  $("#confirmBotton").mouseup(function () {
    clearTimeout(timeout);
  });

  $("#confirmBotton").mouseout(function () {
    clearTimeout(timeout);
  });
});

function go() {
  if (canClean) {
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
    var i = 1;
    while (i < allGroupsNames[Number(selectedGroup)].length + 1) {
      $('#seat' + (i + 3 - Number(firstRowNum))).text(allGroupsNames[selectedGroup][i - 1]);
      i++;
    }
  } else {
    inst.open();
  }
}