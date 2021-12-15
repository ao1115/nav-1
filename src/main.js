const $siteList = $(".siteList");
const $lastLi = $(".siteList").find("li.last");
const x = localStorage.getItem("x"); //读取当前网站下的x
const xObject = JSON.parse(x);
const hashMap = xObject || []
console.log(hashMap)


const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "") //用正则表达式删除后面/开头的所有内容
    .replace(".com","")
    .replace(".cn","")
};

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要访问的网址是？");
  if(url.length ===0){
    window.alert('网址不能为空')
    return
  }
  if (url.indexOf("http") !== 0) {
    //如果http不存在就给加上
    url = "https://" + url;
  }
  const $li = $(`<li>
        <a href = ${url} target = "true">
        <div class="site">
            <div class="logo">
            <svg class="icon">
                <use xlink:href="#icon-lianjie"></use>
            </svg>
            </div>
            <div class="close">
                <svg class="icon">
                     <use xlink:href="#icon-close"></use>
                </svg>
            </div>
            <div class="link" class= "addLink">${simplifyUrl(url)}</div>
        </div>
        </a>
    </li>`).insertBefore($lastLi);
    hashMap.push({
      url:url
    })
    window.location.reload()
    console.log('window.location.reload()')
    const string = JSON.stringify(hashMap); //只能存字符串，所以先转为字符串
    localStorage.setItem("x", string); //在本地的x里面存入哈希表
});

hashMap.forEach((node,index)=>{
  const $li = $(`<li>
        <a href = ${node.url} target = "true">
        <div class="site">
            <div class="logo">
            <svg class="icon">
                <use xlink:href="#icon-lianjie"></use>
            </svg>
            </div>
            <div class="close">
                <svg class="icon">
                     <use xlink:href="#icon-close"></use>
                </svg>
            </div>
            <div class="link" class= "addLink">${simplifyUrl(node.url)}</div>
        </div>
        </a>
    </li>`).insertBefore($lastLi);
    
    $('li').on('click', '.close',(e)=> {
      e.preventDefault() //阻止冒泡
        e.delegateTarget.remove()
        hashMap.splice(index,1)
      })
    })


window.onbeforeunload= () => {
  //自动保存
  console.log(1)
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
