//cardConfig
var cards =
[
  {
      "title": "BPM测试",
      "subTitle": "Beats Per Minute Test",
      "url": "BPM"
  },
  {
      "title": "座位自动安排系统",
      "subTitle": "Seats Arrange System",
      "url": "SeatsArranger"
  },
  {
      "title": "抽签系统",
      "subTitle": "Drawing System",
      "url": "Drawer"
  }
];

//==========
var $ = mdui.$;
$(function () {
  for (let i in cards) {
    let title = cards[i].title;
    let subTitle = cards[i].subTitle;
    let url = cards[i].url;
    addCard(title, subTitle, url);
  }
});

function openUrl(url) {
  window.open(url, '_self');
}

function addCard(title, subTitle, url) {
  var cardBlock = "";
  cardBlock += "<div class=\"mdui-m-a-1 mdui-m-y-2\">";
  cardBlock += "    <div onclick=\"openUrl('" + url + "');\" class=\"mdui-card mdui-ripple\">";
  cardBlock += "      <div class=\"mdui-card-primary\">";
  cardBlock += "        <div class=\"mdui-card-primary-title\">" + title + "<\/div>";
  cardBlock += "        <div class=\"mdui-card-primary-subtitle\">" + subTitle + "<\/div>";
  cardBlock += "      <\/div>";
  cardBlock += "      <div hidden class=\"mdui-card-content\"><\/div>";
  cardBlock += "      <div class=\"mdui-card-actions\">";
  cardBlock += "        <button onclick=\"openUrl('" + url + "');\"";
  cardBlock += "          class=\"mdui-btn mdui-float-right mdui-text-color-theme-accent mdui-ripple\">打开<\/button>";
  cardBlock += "      <\/div>";
  cardBlock += "    <\/div>";
  cardBlock += "  <\/div>";
  $("#cards").append(cardBlock);
}