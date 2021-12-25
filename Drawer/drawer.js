var $ = mdui.$;
var allNames = new Array;
allNames = ['顾大局', '唐集政', '熊涛', '万芬', '凌丹', '熊英凡', '周志豪', '熊依诺', '李婧妍', '刘雪琦', '陈仪', '齐述俊', '闵明哲', '陈明慧', '牟芳黎', '牟洪毅', '危佳熙', '李权津', '熊俊泽', '邓春寅', '张念箴', '余俊晖', '邹名源', '邓佳鹏', '朱丹榕', '熊月慈', '郭美成', '刘嘉宸', '张祖龙', '丁晨悦', '孙宗兴', '张梦婕', '张苏颜', '熊芊妍', '陶振扬', '欧阳奕哲', '夏天昊', '徐凯', '胡子颖', '戴佳乐', '汪瑞卿', '喻鸿杰', '周文涛', '万泽宇', '万礼庆', '梁烨', '聂义彪', '李语涵', '陈欣宇', '丁敬谦'];
$(function () {
  $(window).on('keydown', function (event) {
    if (event.which == 13) {
      go();
    }
  });

  if ($('#drawNames').prop('checked')) {
    $('#drawNumsController').addClass('mdui-hidden');
    $('#drawNamesController').removeClass('mdui-hidden');
  } else if ($('#drawNums').prop('checked')) {
    $('#drawNamesController').addClass('mdui-hidden');
    $('#drawNumsController').removeClass('mdui-hidden');
  }
  $('#radio').on('change', () => {
    if ($('#drawNames').prop('checked')) {
      $('#drawNumsController').addClass('mdui-hidden');
      $('#drawNamesController').removeClass('mdui-hidden');
    } else if ($('#drawNums').prop('checked')) {
      $('#drawNamesController').addClass('mdui-hidden');
      $('#drawNumsController').removeClass('mdui-hidden');
    }
  });
});

function go() {
  $('#result').text('');
  if ($('#drawNames').prop('checked')) {
    let Digit = $('#drawNamesQuantity').val();
    allNames.sort(function () {
      return (0.5 - Math.random());
    });
    let i = 0;
    if (Digit != null && Digit <= 50) {
      while (i < Digit) {
        var text = $('#result').text();
        var content = text + '\n' + allNames[i];
        $('#result').text(content);
        i++;
      }
    }
  } else if ($('#drawNums').prop('checked')) {
    let Digit = $('#drawNumsQuantity').val();
    let noRepeat = $('#noRepeat').prop('checked');
    let min = $('#drawNumsMin').val();
    let max = $('#drawNumsMax').val();
    let result;
    let allNums = [];
    if (max - min + 1 > Digit && max > min) {
      while (allNums.length <= Digit){
        let aNum = getRandomNumber(min,max);
        if (allNums.includes(aNum)) {
          continue
        } else {
          allNums.push(aNum);
        }
      }
      for (let i of allNums) {
result += i;
      }
      $('#result').text(result);
    } else if (max - min + 1 == Digit) {
      let allNums = [];
      for (let i = min; i <= max; i++) {
        allNums.push(i);
        allNums.sort(() => {
          return (0.5 - Math.random());
        });
      }
      for (let i of allNums) {
        $('#result').text($('#result').text() + ' ' + i);
      }
    }
  }
}


function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + Number(min));
}
