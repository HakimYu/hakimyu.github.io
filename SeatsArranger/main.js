$ = mdui.$;
var allGroupsNames = new Array;
allGroupsNames[1] = ['顾大局', '唐集政', '熊涛', '万芬', '凌丹', '熊英凡', '周志豪', '熊依诺', '李婧妍'];
allGroupsNames[4] = ["郭美成", "刘嘉宸", "张祖龙", "丁晨悦", "孙宗兴", "张梦婕", "张苏颜", "熊芊妍"]
allGroupsNames[5] = ['陶振扬', '欧阳奕哲', '夏天昊', '徐凯', '胡子颖', '戴佳乐', '汪瑞卿', '喻鸿杰'];


function go() {
  var selectedGroup = $('#select1').val();
  var firstRowNum = $('#select2').val();
  allGroupsNames[Number(selectedGroup)].sort(function() {
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
}