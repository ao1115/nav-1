// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $(".siteList").find("li.last");
var x = localStorage.getItem("x"); //读取当前网站下的x

var xObject = JSON.parse(x);
var hashMap = xObject || [];
console.log(hashMap);

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, "") //用正则表达式删除后面/开头的所有内容
  .replace(".com", "").replace(".cn", "");
};

$(".addButton").on("click", function () {
  var url = window.prompt("请问你要访问的网址是？");

  if (url.length === 0) {
    window.alert('网址不能为空');
    return;
  }

  if (url.indexOf("http") !== 0) {
    //如果http不存在就给加上
    url = "https://" + url;
  }

  var $li = $("<li>\n        <a href = ".concat(url, " target = \"true\">\n        <div class=\"site\">\n            <div class=\"logo\">\n            <svg class=\"icon\">\n                <use xlink:href=\"#icon-lianjie\"></use>\n            </svg>\n            </div>\n            <div class=\"close\">\n                <svg class=\"icon\">\n                     <use xlink:href=\"#icon-close\"></use>\n                </svg>\n            </div>\n            <div class=\"link\" class= \"addLink\">").concat(simplifyUrl(url), "</div>\n        </div>\n        </a>\n    </li>")).insertBefore($lastLi);
  hashMap.push({
    url: url
  });
  window.location.reload();
  console.log('window.location.reload()');
  var string = JSON.stringify(hashMap); //只能存字符串，所以先转为字符串

  localStorage.setItem("x", string); //在本地的x里面存入哈希表
});
hashMap.forEach(function (node, index) {
  var $li = $("<li>\n        <a href = ".concat(node.url, " target = \"true\">\n        <div class=\"site\">\n            <div class=\"logo\">\n            <svg class=\"icon\">\n                <use xlink:href=\"#icon-lianjie\"></use>\n            </svg>\n            </div>\n            <div class=\"close\">\n                <svg class=\"icon\">\n                     <use xlink:href=\"#icon-close\"></use>\n                </svg>\n            </div>\n            <div class=\"link\" class= \"addLink\">").concat(simplifyUrl(node.url), "</div>\n        </div>\n        </a>\n    </li>")).insertBefore($lastLi);
  $('li').on('click', '.close', function (e) {
    e.preventDefault(); //阻止冒泡

    e.delegateTarget.remove();
    hashMap.splice(index, 1);
  });
});

window.onbeforeunload = function () {
  //自动保存
  console.log(1);
  var string = JSON.stringify(hashMap); //只能存字符串，所以先转为字符串

  localStorage.setItem("x", string); //在本地的x里面存入哈希表
};

$(document).on('keypress', function (e) {
  var key = e.key; //  const key = e.key

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.496dc854.js.map