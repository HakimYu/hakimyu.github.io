//Original: Derek Chilcote - Batto(dac - b@usa.net)
//Web Site: http: //www.mixed.net 
//Rewritten by: Rich Reel all8.com
//Translated by: freejishu
//Rewritten by: HakimYu

//Begin
var $ = mdui.$;
var count = 0;
var msecsFirst = 0;
var msecsPrevious = 0;

$(function() {
  $(window).on("keydown",() => TapForBPM());
});

function ResetCount() {
  count = 0;
  $("#T_AVG").text("");
  $("#T_TAP").text("");
  $("#T_RESET").trigger("blur");
}

function TapForBPM() {
  console.log(count);
  $("#wait").trigger("blur");
  let timeSeconds = new Date;
  let msecs = timeSeconds.getTime();
  if ((msecs - msecsPrevious) > 1000 * $("#wait").val()) {
    count = 0;
  }

  if (count == 0) {
    $("#T_AVG").text("第一次敲击");
    $("#T_TAP").text("第一次敲击");
    msecsFirst = msecs;
    count = 1;
  } else {
    let bpmAvg = 60000 * count / (msecs - msecsFirst);
    $("#T_AVG").text(Math.round(bpmAvg * 100) / 100);
    $("#T_WHOLE").text(Math.round(bpmAvg));
    count++;
    $("#T_TAP").text(count);
  }
  msecsPrevious = msecs;
  return true;
}


//End
