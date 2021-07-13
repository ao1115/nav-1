const $siteList = $(".siteList");
const $lastLi = $(".siteList").find("li.last");
const x = localStorage.getItem("x"); //读取当前网站下的x
const xObject = JSON.parse(x);
const hashMap = xObject || [
  //如果x可以读取就读取x,否则初始化为一个含有两项的数组
  { logo: "A", url: "http://www.acfun.cn" },
  { logo: "B", url: "http://www.bilibili.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //用正则表达式删除后面/开头的所有内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node,index) => {
    const $li = $(`<li>
        <div class="site">
            <div class="logo">
                ${node.logo}
            </div>
            <div class="close">
                <svg class="icon">
                     <use xlink:href="#icon-close"></use>
                </svg>
            </div>
            <div class="link">${simplifyUrl(node.url)}</div>
        </div>
    </li>`).insertBefore($lastLi);
    $li.on('click', () => {
        window.open(node.url)
    })
    
    $li.on('click', '.close',(e)=> {
        e.stopPropagation() //阻止冒泡
        hashMap.splice(index, 1)
        render()
    })    
  });
};


render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要访问的网址是？");
  if (url.indexOf("http") !== 0) {
    //如果http不存在就给加上
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  //自动保存
  const string = JSON.stringify(hashMap); //只能存字符串，所以先转为字符串
  localStorage.setItem("x", string); //在本地的x里面存入哈希表
};

$(document).on('keypress', (e) => {
    const { key } = e //  const key = e.key
    for (let i = 0; i < hashMap.length; i++){
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
