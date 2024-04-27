/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 483:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.IMQAAgent = void 0;
var IMQAConfig_1 = __webpack_require__(138);
var OnWeb_1 = __webpack_require__(247);
var IMQAAgent = /** @class */function () {
  function IMQAAgent(window) {
    if (window !== undefined) {
      this.config = new IMQAConfig_1.IMQAConfig(window);
    }
  }
  IMQAAgent.prototype.window = function () {
    return this.config.root_window;
  };
  Object.defineProperty(IMQAAgent.prototype, "config", {
    get: function get() {
      return this._config;
    },
    set: function set(value) {
      this._config = value;
    },
    enumerable: false,
    configurable: true
  });
  IMQAAgent.GetInstance = function (window) {
    if (!this.instance) {
      this.instance = new IMQAAgent(window);
    }
    return this.instance;
  };
  IMQAAgent.prototype.setBrowser = function () {
    var user_agent = this.window().navigator.userAgent;
    var _a = this.getBrowserInfo(user_agent),
      name = _a.name,
      version = _a.version;
    this.config.browser = name, this.config.browserVersion = version;
  };
  IMQAAgent.prototype.isConnect = function () {
    if (this.config.isDebug) {
      return true;
    }
    // SDK IOS 웹뷰 확인
    if (this.window().webkit !== undefined && this.window().webkit.messageHandlers !== undefined) this.config.bridge_connected = true;
    // SDK AOS 웹뷰 확인
    else if (this.window().ImqaBridge) this.config.bridge_connected = true;
    // SDK 브릿지 연결 여부 확인
    this.config.bridge_connected ? console.log("IMQA Bridge", "connected") : console.log("IMQA Bridge", "cannot connect");
    return this.config.bridge_connected;
  };
  IMQAAgent.prototype.getBrowserInfo = function (userAgent) {
    // The order matters here, and this may report false positives for unlisted browsers.
    if (userAgent.includes("Firefox")) {
      // "Mozilla/5.0 (X11; Linux i686; rv:104.0) Gecko/20100101 Firefox/104.0"
      return {
        name: "Mozilla Firefox",
        version: parseInt(userAgent.split('Firefox/')[1].split(" ")[0]) || 0
      };
    } else if (userAgent.includes("SamsungBrowser")) {
      // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36"
      return {
        name: "Samsung Internet",
        version: parseInt(userAgent.split('SamsungBrowser/')[1].split(" ")[0]) || 0
      };
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
      // "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 OPR/90.0.4480.54"
      return {
        name: "Opera",
        version: parseInt(userAgent.split('OPR/')[1].split(" ")[0]) || 0
      };
    } else if (userAgent.includes("Trident")) {
      // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)"
      return {
        name: "Microsoft Internet Explorer",
        version: parseInt(userAgent.split('Trident/')[1].split(";")[0]) || 0
      };
    } else if (userAgent.includes("Edge")) {
      // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
      return {
        name: "Microsoft Edge (Legacy)",
        version: parseInt(userAgent.split('Edge/')[1].split(" ")[0]) || 0
      };
    } else if (userAgent.includes("Edg")) {
      // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Edg/104.0.1293.70"
      return {
        name: "Microsoft Edge (Chromium)",
        version: parseInt(userAgent.split('Edg/')[1].split(" ")[0]) || 0
      };
    } else if (userAgent.includes("Chrome")) {
      // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
      return {
        name: "Google Chrome",
        version: parseInt(userAgent.split('Chrome/')[1].split(" ")[0]) || 0
      };
    } else if (userAgent.includes("Safari")) {
      // "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
      // "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1"
      return {
        name: "Apple Safari",
        version: parseInt(userAgent.split('Version/')[1].split(" ")[0]) || 0
      };
    } else {
      return {
        name: "unknown",
        version: "unknown"
      };
    }
  };
  IMQAAgent.prototype.send = function (data) {
    var _a, _b, _c;
    console.log("[IMQAAgent] - Send()", data);
    if (this.config.agentType === "web") {
      OnWeb_1.OnWeb.GetInstance().update(data);
      return;
    }
    // @ts-ignore
    if (typeof IMQAJSModel !== "undefined") {
      // IOS에서 브릿지를 열수 없을 경우 IMQAJSModel을 통해 보냄
      // @ts-ignore
      IMQAJSModel.imqaSend(JSON.stringify(data));
    } else {
      this.window().ImqaBridge ? this.window().ImqaBridge.send(JSON.stringify(data)) : (_c = (_b = (_a = this.window().webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.ImqaBridge) === null || _c === void 0 ? void 0 : _c.postMessage(JSON.stringify(data));
    }
  };
  IMQAAgent.prototype.sendError = function (data) {
    var _a, _b, _c;
    console.log("[IMQAAgent] - SendError()", data);
    this.window().ImqaBridge ? this.window().ImqaBridge.sendError(JSON.stringify(data)) : (_c = (_b = (_a = this.window().webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.ImqaBridgeCrash) === null || _c === void 0 ? void 0 : _c.postMessage(JSON.stringify(data));
  };
  return IMQAAgent;
}();
exports.IMQAAgent = IMQAAgent;

/***/ }),

/***/ 929:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Header = void 0;
var Util_1 = __webpack_require__(721);
var IMQAAgent_1 = __webpack_require__(483);
var Header = /** @class */function () {
  function Header() {
    this.imqa_web_agent_version = 0;
    this.protocol = "";
    this.host = "";
    this.pathname = "";
    this.screen_name = "";
    this.screen_alias = undefined;
    this.startTime = 0;
    this.browserVersion = "";
    this.webviewTxId = "";
  }
  Header.prototype.set = function (config) {
    var startTime = Math.floor(new Date().getTime());
    var _a = (0, Util_1.parseURL)(config.root_window.location.href),
      protocol = _a.protocol,
      host = _a.host,
      pathname = _a.pathname;
    var locationList = IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.pathname.split("/");
    var lastPath = locationList[locationList.length - 1];
    var locationOrigin = IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.origin;
    this.imqa_web_agent_version = config.imqa_web_agent_version;
    this.protocol = protocol;
    this.host = host;
    this.pathname = config.customPathName ? config.customPathName : pathname;
    this.screen_name = lastPath ? lastPath : locationOrigin;
    this.screen_alias = config.customAliasName ? config.customAliasName : config.screen_alias;
    this.startTime = startTime;
    this.browserVersion = config.root_window.navigator.appVersion;
    this.webviewTxId = config.root_window.webviewTxId;
  };
  return Header;
}();
exports.Header = Header;

/***/ }),

/***/ 138:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.IMQAConfig = void 0;
var AgentType;
(function (AgentType) {
  AgentType["WEB"] = "web";
  AgentType["WEBVIEW"] = "webview";
})(AgentType || (AgentType = {}));
var IMQAConfig = /** @class */function () {
  function IMQAConfig(window) {
    this.imqa_init = false;
    this.imqa_web_agent_version = 1; // Agent 버전( 숫자형으로 정수로만 변경 )
    this.bridge_connected = true; //기본값 false SDK에서 인지해서 수정해줌
    this.agentType = AgentType.WEB; // agent 타입 web, webview
    this.imqa_head_enable = true;
    this.imqa_xhr_enable = true;
    this.imqa_load_enable = true;
    this.imqa_log = true;
    this.isDebug = true;
    this.SPACollectInitTime = 3000;
    this.SPACollectTime = this.SPACollectInitTime;
    this.customAliasName = null;
    this.customPathName = null;
    this.browser = null;
    this.browserVersion = null;
    // web dump config data
    this.webIntervalTime = 3000;
    this.package_name = "com.imqa.web";
    this.process_name = "com.imqa.web";
    this.collectorUrl = "http://localhost:8080/test";
    this.projectKey = "$2b$05$6wnOcIDAEkUnn9sSz0FGe.tEwJBHH/g1ozn/HtI9nMNCOUTUXaOVS^#1U8389ATPE/szowZGlK27A==";
    this.root_window = window;
  }
  return IMQAConfig;
}();
exports.IMQAConfig = IMQAConfig;

/***/ }),

/***/ 553:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TransactionManager = void 0;
var uuid_1 = __webpack_require__(679);
var TransactionManager = /** @class */function () {
  function TransactionManager() {}
  /**
   * TxID
   * 사용자가 앱을 끌때까지 하나의 ID로 추적하기 위해 생성
   * @constructor
   */
  TransactionManager.GetTxID = function () {
    return this.TxID;
  };
  TransactionManager.GenerateTxID = function () {
    this.TxID = (0, uuid_1.v4)();
    return this.GetTxID();
  };
  /**
   * onWeb 데이터 ID 생성
   * onWeb 데이터 생성시 header와 다르게 onWeb자체의 추적을 위해서 ID 생성
   * @constructor
   */
  TransactionManager.GetProcessID = function () {
    return this.ProcessID;
  };
  TransactionManager.GenerateProcessID = function () {
    this.ProcessID = (0, uuid_1.v4)();
    return this.GetProcessID();
  };
  /**
   * Web browser USER ID
   * 사용자가 브라우저에서 접근하면 브라우저에 해당 아이디값이 저장되어 동일 브라우저인지 아닌지 파악가능
   * @constructor
   */
  TransactionManager.GetUserID = function () {
    return this.ProcessID;
  };
  TransactionManager.GenerateUserID = function () {
    this.UserID = (0, uuid_1.v4)();
    return this.GetUserID();
  };
  /**
   * onRender Script ID
   * Data에서 추적한 measure에 ID를 부여
   * @constructor
   */
  TransactionManager.GetScriptID = function () {
    return this.ScriptID;
  };
  TransactionManager.GenerateScriptID = function () {
    this.ScriptID = (0, uuid_1.v4)();
    return this.GetScriptID();
  };
  return TransactionManager;
}();
exports.TransactionManager = TransactionManager;

/***/ }),

/***/ 63:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Crash = void 0;
var IMQAAgent_1 = __webpack_require__(483);
var Crash = /** @class */function () {
  /**
   * WebCrash 생성
   * @param message 사용자가 만든 new Error의 메세지 네임
   * @param file error가 생성된 파일
   * @param line error line
   * @param column error column
   * @param errorObj error object로 name과 stack(에러스택) 포함
   * @param screenName error가 발생된 url
   * @param webviewTxId error가 발생된 화면 ID
   */
  function Crash(message, file, line, column, errorObj, screenName, webviewTxId) {
    this.errorname = message;
    this.file = file;
    this.linenum = line;
    this.column = column;
    this.crash_callstack = errorObj.stack;
    this.lastactivity = screenName;
    this.errorclassname = errorObj.name;
    this.webviewTxId = webviewTxId;
    this.send();
  }
  Crash.prototype.send = function () {
    IMQAAgent_1.IMQAAgent.GetInstance().sendError(this);
  };
  return Crash;
}();
exports.Crash = Crash;

/***/ }),

/***/ 446:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CrashWindowManager = void 0;
var Crash_1 = __webpack_require__(63);
var IMQAAgent_1 = __webpack_require__(483);
var TransactionManager_1 = __webpack_require__(553);
var CrashWindowManager = /** @class */function () {
  function CrashWindowManager() {}
  CrashWindowManager.run = function () {
    window.onerror = function myErrorHandler(message, file, line, column, errorObj) {
      var screenName = IMQAAgent_1.IMQAAgent.GetInstance(window).config.root_window.location.href || "";
      var webviewTxId = TransactionManager_1.TransactionManager.GetTxID();
      new Crash_1.Crash(message, file, line, column, errorObj, screenName, webviewTxId);
      return false; // so you still log errors into console
    };
  };

  return CrashWindowManager;
}();
exports.CrashWindowManager = CrashWindowManager;

/***/ }),

/***/ 875:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnLoad = void 0;
var Header_1 = __webpack_require__(929);
var OnLoadBody_1 = __webpack_require__(4);
var TransactionManager_1 = __webpack_require__(553);
var OnLoadManager_1 = __webpack_require__(67);
var IMQAAgent_1 = __webpack_require__(483);
var OnLoad = /** @class */function () {
  function OnLoad() {
    this.header = new Header_1.Header();
    this.body = new OnLoadBody_1.OnLoadBody();
    this.startTime = 0;
    this.endTime = 0;
  }
  OnLoad.prototype.init = function (config) {
    this.startTime = new Date().valueOf();
    this.header.set(config);
    this.header.webviewTxId = TransactionManager_1.TransactionManager.GetTxID();
    this.onLoadManager = new OnLoadManager_1.OnLoadManager(this);
    this.onLoadManager.init();
  };
  OnLoad.prototype.create = function () {};
  OnLoad.prototype.finish = function () {
    this.endTime = this.onLoadManager.getEndTime();
    var data = {
      header: this.header,
      body: this.body,
      startTime: this.startTime,
      endTime: this.endTime
    };
    IMQAAgent_1.IMQAAgent.GetInstance().send(data);
  };
  OnLoad.prototype.update = function (entry) {
    // onLoadManager가 body에 맞게 데이터 변경
    this.onLoadManager.pushEntry(entry);
    this.body = this.onLoadManager.getBody();
  };
  return OnLoad;
}();
exports.OnLoad = OnLoad;

/***/ }),

/***/ 4:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnLoadBody = void 0;
var OnLoadBody = /** @class */function () {
  function OnLoadBody() {
    this.type = "onload";
    this.location_data = {
      pathname: "",
      host: "",
      protocol: "",
      startTime: 0,
      endTime: 0,
      takeTime: 0,
      domainLookupTime: 0,
      domTime: 0,
      responseTime: 0
    };
    this.duration = 0;
    this.timing = {
      total: 0,
      wait: 0,
      server: 0,
      network: 0,
      dom: 0,
      loading: 0,
      content: 0
    };
    this.entries = [];
    this.events = [];
  }
  return OnLoadBody;
}();
exports.OnLoadBody = OnLoadBody;

/***/ }),

/***/ 67:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnLoadManager = void 0;
// BODY - LOCATION_DATA 데이터 넣는 함수
var Util_1 = __webpack_require__(721);
var OnLoadManager = /** @class */function () {
  function OnLoadManager(onLoad) {
    this.onLoad = onLoad;
    this.onLoadBody = this.onLoad.body;
  }
  OnLoadManager.prototype.init = function () {
    this.onLoadBody.location_data = this.getOnloadLocationDataWithLowVersion(window.performance.timing);
    this.onLoadBody.duration = this.getOnloadDurationWithLowVersion(window.performance.timing);
    this.onLoadBody.timing = this.getOnloadTimingWithLowVersion(window.performance.timing);
    this.onDOMContentLoaded();
    this.onLoaded();
  };
  ;
  OnLoadManager.prototype.onDOMContentLoaded = function () {
    var _this = this;
    window.addEventListener("DOMContentLoaded", function (event) {
      _this.onLoadBody.events.push({
        name: "dom-content-loaded",
        time: event.timeStamp || 0
      });
    });
  };
  OnLoadManager.prototype.onLoaded = function () {
    var _this = this;
    window.addEventListener("load", function (event) {
      _this.endTime = new Date().valueOf();
      setTimeout(function () {
        _this.onLoad.finish();
      }, 1000);
    });
  };
  OnLoadManager.prototype.getEndTime = function () {
    return this.endTime;
  };
  OnLoadManager.prototype.getBody = function () {
    return this.onLoadBody;
  };
  OnLoadManager.prototype.pushEntry = function (entry, timeStamp) {
    if (timeStamp === void 0) {
      timeStamp = 0;
    }
    switch (entry.constructor.name) {
      case "PerformanceNavigationTiming":
        this.onLoadBody.location_data = this.getOnloadLocationData(entry);
        this.onLoadBody.duration = this.getOnloadDuration(entry);
        this.onLoadBody.timing = this.getOnloadTiming(entry);
        break;
      case "PerformanceResourceTiming":
        this.onLoadBody.entries.push(this.getNetworkEntries(entry, timeStamp));
        break;
      case "PerformancePaintTiming":
      case "PerformanceEventTiming":
        // BODY - EVENT 데이터 push
        this.onLoadBody.events.push(this.getEventData(entry));
        break;
      default:
        break;
    }
  };
  OnLoadManager.prototype.getOnloadLocationData = function (navigation) {
    var startTime = new Date().valueOf();
    var _a = (0, Util_1.parseURL)(navigation.name),
      protocol = _a.protocol,
      host = _a.host,
      pathname = _a.pathname;
    return {
      pathname: pathname,
      host: host,
      protocol: protocol,
      startTime: startTime,
      endTime: Math.abs(startTime + Math.floor(navigation.loadEventEnd)),
      takeTime: Math.abs(navigation.loadEventEnd - navigation.redirectStart),
      domainLookupTime: Math.abs(navigation.domainLookupEnd - navigation.domainLookupStart),
      domTime: Math.abs(navigation.domComplete - navigation.domContentLoadedEventStart),
      responseTime: Math.abs(navigation.responseEnd - navigation.responseStart)
    };
  };
  // BODY - DURATION 데이터 넣는 함수
  OnLoadManager.prototype.getOnloadDuration = function (navigation) {
    return Math.abs(navigation.loadEventEnd - navigation.redirectStart);
  };
  // BODY - TIMING 데이터 넣는 함수
  OnLoadManager.prototype.getOnloadTiming = function (navigation) {
    return {
      // on load 전체
      total: Math.abs(navigation.loadEventEnd - navigation.redirectStart),
      // 대기
      wait: Math.abs(navigation.domainLookupStart - navigation.redirectStart),
      // 서버
      server: Math.abs(navigation.responseEnd - navigation.connectEnd),
      // 네트워크
      network: Math.abs(navigation.connectEnd - navigation.domainLookupStart),
      // 돔
      dom: Math.abs(navigation.domContentLoadedEventEnd - navigation.responseEnd),
      // 로딩
      loading: Math.abs(navigation.domComplete - navigation.domContentLoadedEventEnd),
      // 콘텐츠 다운로드
      content: Math.abs(navigation.loadEventEnd - navigation.loadEventStart)
    };
  };
  // BODY - ENTRIES 데이터 넣는 함수
  OnLoadManager.prototype.getNetworkEntries = function (entry, timeStamp) {
    // let url = new URL(entry.name);
    var _a = (0, Util_1.parseURL)(entry.name),
      protocol = _a.protocol,
      host = _a.host,
      pathname = _a.pathname,
      search = _a.search;
    return {
      protocol: protocol,
      host: host,
      pathname: pathname,
      parmas: search,
      resource_type: entry.initiatorType,
      start_time: Math.abs(entry.startTime - timeStamp),
      // xxxStart, xxxEnd 는 하나가 0이 나오면 다른 하나도 0인 경향이 있음. (response쪽 제외)
      // 반대로 하나가 정상 값이면, 다른 하나도 정상 값임.
      timing: {
        wating: Math.abs(entry.redirectStart - entry.startTime),
        redirect: Math.abs(entry.redirectEnd - entry.redirectStart),
        // timeline상 fetchStart 후에
        // 차례대로 domainLookup, connect, request, response 과정이 있다.
        // 하지만 responseEnd를 제외한 나머지 지표들은 값이 0이거나 똑같을 수 있다.
        // 위 지표들이 0일 때, 단순히 빼버리면 음수값이 나오므로
        // fetch 구간의 end 기준을 늘려주었다.
        fetch: Math.abs(this.getFetchEndTime(entry) - entry.fetchStart),
        domainlookup: Math.abs(entry.domainLookupEnd - entry.domainLookupStart),
        connect: Math.abs(entry.connectEnd - entry.connectStart),
        request_sent: Math.abs(entry.responseStart - entry.requestStart),
        // responseStart === 0일 경우,
        // 위에서 언급했듯이, fetch 길이가 respnoseEnd까지 늘어나기 때문에
        // 구간이 중복되지 않도록 0으로 설정함.
        response: Math.abs(entry.responseEnd - this.getResponseStartTime(entry))
      }
    };
  };
  OnLoadManager.prototype.getFetchEndTime = function (xhr_entry) {
    var fetchStart = xhr_entry.fetchStart,
      domainLookupStart = xhr_entry.domainLookupStart,
      connectStart = xhr_entry.connectStart,
      requestStart = xhr_entry.requestStart,
      responseStart = xhr_entry.responseStart;
    if (domainLookupStart) return domainLookupStart;else if (connectStart) return connectStart;else if (requestStart) return requestStart;else if (responseStart) return responseStart;
    // 모두 0일 때 fetchStart 값을 줘서 fetch 지표를 0으로 만든다.
    return fetchStart;
  };
  OnLoadManager.prototype.getResponseStartTime = function (xhr_entry) {
    var fetchStart = xhr_entry.fetchStart,
      domainLookupStart = xhr_entry.domainLookupStart,
      connectStart = xhr_entry.connectStart,
      requestStart = xhr_entry.requestStart,
      responseStart = xhr_entry.responseStart;
    if (responseStart) return responseStart;else if (requestStart) return requestStart;else if (connectStart) return connectStart;else if (domainLookupStart) return domainLookupStart;
    return fetchStart;
  };
  OnLoadManager.prototype.getEventData = function (entry) {
    return {
      name: entry.name,
      time: entry.startTime
    };
  };
  // Low-version onload 로직
  OnLoadManager.prototype.getOnloadLocationDataWithLowVersion = function (navigation) {
    var startTime = new Date().valueOf();
    var _a = (0, Util_1.parseURL)(location.href),
      protocol = _a.protocol,
      host = _a.host,
      pathname = _a.pathname;
    return {
      pathname: pathname,
      host: host,
      protocol: protocol,
      startTime: startTime,
      endTime: Math.abs(startTime + Math.floor(navigation.loadEventEnd)),
      takeTime: Math.abs((navigation.loadEventEnd || startTime) - (navigation.redirectStart || startTime)),
      domainLookupTime: Math.abs((navigation.domainLookupEnd || startTime) - (navigation.domainLookupStart || startTime)),
      domTime: Math.abs((navigation.domComplete || startTime) - (navigation.domContentLoadedEventStart || startTime)),
      responseTime: Math.abs((navigation.responseEnd || startTime) - (navigation.responseStart || startTime))
    };
  };
  // Low-version - DURATION 데이터 넣는 함수
  OnLoadManager.prototype.getOnloadDurationWithLowVersion = function (navigation) {
    var now = new Date().valueOf();
    return Math.abs((navigation.loadEventEnd || now) - (navigation.redirectStart || now));
  };
  // Low-version - TIMING 데이터 넣는 함수
  OnLoadManager.prototype.getOnloadTimingWithLowVersion = function (navigation) {
    var now = new Date().valueOf();
    return {
      // on load 전체
      total: Math.abs((navigation.loadEventEnd || now) - (navigation.redirectStart || now)),
      // 대기
      wait: Math.abs((navigation.domainLookupStart || now) - (navigation.redirectStart || now)),
      // 서버
      server: Math.abs((navigation.responseEnd || now) - (navigation.connectEnd || now)),
      // 네트워크
      network: Math.abs((navigation.connectEnd || now) - (navigation.domainLookupStart || now)),
      // 돔
      dom: Math.abs((navigation.domContentLoadedEventEnd || now) - (navigation.responseEnd || now)),
      // 로딩
      loading: Math.abs((navigation.domComplete || now) - (navigation.domContentLoadedEventEnd || now)),
      // 콘텐츠 다운로드
      content: Math.abs((navigation.loadEventEnd || now) - (navigation.loadEventStart || now))
    };
  };
  return OnLoadManager;
}();
exports.OnLoadManager = OnLoadManager;

/***/ }),

/***/ 142:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DomOnLoad = void 0;
var OnLoad_1 = __webpack_require__(875);
var DomOnLoad = /** @class */function (_super) {
  __extends(DomOnLoad, _super);
  function DomOnLoad() {
    return _super.call(this) || this;
  }
  return DomOnLoad;
}(OnLoad_1.OnLoad);
exports.DomOnLoad = DomOnLoad;

/***/ }),

/***/ 28:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SPAOnLoad = void 0;
var OnLoad_1 = __webpack_require__(875);
var TransactionManager_1 = __webpack_require__(553);
var SPAOnLoadManager_1 = __webpack_require__(840);
var OnLoadManager_1 = __webpack_require__(67);
var IMQAAgent_1 = __webpack_require__(483);
var SPAOnLoad = /** @class */function (_super) {
  __extends(SPAOnLoad, _super);
  function SPAOnLoad() {
    return _super.call(this) || this;
  }
  SPAOnLoad.prototype.init = function (config) {
    var _this = this;
    this.startTime = new Date().valueOf();
    this.header.set(config);
    this.header.webviewTxId = TransactionManager_1.TransactionManager.GetTxID();
    this.onLoadManager = new OnLoadManager_1.OnLoadManager(this);
    this.timeStamp = 0;
    setTimeout(function () {
      _this.finish();
    }, config.SPACollectTime);
  };
  SPAOnLoad.prototype.setStartTime = function (domStartTime) {
    this.timeStamp = domStartTime;
  };
  SPAOnLoad.prototype.update = function (entry) {
    this.onLoadManager.pushEntry(entry, this.timeStamp);
    this.body = this.onLoadManager.getBody();
  };
  SPAOnLoad.prototype.finish = function () {
    this.endTime = new Date().valueOf();
    var data = {
      header: this.header,
      body: this.body,
      startTime: this.startTime,
      endTime: this.endTime
    };
    IMQAAgent_1.IMQAAgent.GetInstance().send(data);
    // 데이터 보낸 이후 초기화
    IMQAAgent_1.IMQAAgent.GetInstance().config.customAliasName = null;
    IMQAAgent_1.IMQAAgent.GetInstance().config.customPathName = null;
    IMQAAgent_1.IMQAAgent.GetInstance().config.SPACollectTime = IMQAAgent_1.IMQAAgent.GetInstance().config.SPACollectInitTime;
    SPAOnLoadManager_1.SPAOnLoadManager.GetInstance().reset();
  };
  return SPAOnLoad;
}(OnLoad_1.OnLoad);
exports.SPAOnLoad = SPAOnLoad;

/***/ }),

/***/ 840:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SPAOnLoadManager = void 0;
var SPAOnLoadManager = /** @class */function () {
  function SPAOnLoadManager() {
    this.dataList = [];
  }
  /**
   * SPAOnLoadManager 인스턴스 불러오기
   * @constructor
   */
  SPAOnLoadManager.GetInstance = function () {
    // PerformanceObserverManager의 instance가 없으면 생성
    if (!SPAOnLoadManager.instance) {
      SPAOnLoadManager.instance = new SPAOnLoadManager();
    }
    // PerformanceObserverManager의 performanceObserver 없으면 생성
    if (!this.performanceObserver) {
      SPAOnLoadManager.instance.init();
    }
    return SPAOnLoadManager.instance;
  };
  SPAOnLoadManager.prototype.init = function () {
    var _this = this;
    SPAOnLoadManager.performanceObserver = new PerformanceObserver(function (list) {
      for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
        var entry = _a[_i];
        _this.notify(entry);
      }
    });
    // performanceObserver entryType 등록
    SPAOnLoadManager.performanceObserver.observe({
      entryTypes: ["paint", "resource", "navigation", "mark", "measure"]
    });
  };
  /**
   * DataList에 subscriber 등록
   * @param subscriber
   */
  SPAOnLoadManager.prototype.add = function (SPAOnLoad) {
    this.dataList.push(SPAOnLoad);
  };
  /**
   * DataList에 있는 subscriber에 entry 데이터 전파
   * @param entry
   */
  SPAOnLoadManager.prototype.notify = function (entry) {
    this.dataList.forEach(function (subscriber) {
      return subscriber.update(entry);
    });
  };
  SPAOnLoadManager.prototype.reset = function () {
    this.dataList = [];
  };
  return SPAOnLoadManager;
}();
exports.SPAOnLoadManager = SPAOnLoadManager;

/***/ }),

/***/ 395:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SPAOnLoadWindowManager = void 0;
var SPAOnLoad_1 = __webpack_require__(28);
var SPAOnLoadManager_1 = __webpack_require__(840);
var SPAOnLoadWindowManager = /** @class */function () {
  function SPAOnLoadWindowManager() {}
  SPAOnLoadWindowManager.prototype.init = function (config) {
    this.config = config;
    this.pushState();
    this.locationpush(this.config);
    this.agentSendHook(this.config);
  };
  SPAOnLoadWindowManager.prototype.pushState = function () {
    window.history.pushState = function (f) {
      return function pushState() {
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event("locationChange"));
        return ret;
      };
    }(window.history.pushState);
  };
  SPAOnLoadWindowManager.prototype.locationpush = function (config) {
    window.addEventListener("locationChange", function (e) {
      var SPA = new SPAOnLoad_1.SPAOnLoad();
      SPA.init(config);
      SPA.setStartTime(e.timeStamp);
      SPAOnLoadManager_1.SPAOnLoadManager.GetInstance().add(SPA);
    });
  };
  SPAOnLoadWindowManager.prototype.createHook = function (config) {
    window['IMQAAgent'] = {
      collect: function collect(options) {
        if (options === void 0) {
          options = null;
        }
        if (!options) {
          window.dispatchEvent(new Event("imqaDataSend"));
          return;
        }
        // collect_time: 수집 주기 시간
        // path_name: url host제외 path_name
        // alias_name: 수집별명
        var collect_time = options.collect_time,
          path_name = options.path_name,
          alias_name = options.alias_name;
        if (_typeof(collect_time) !== undefined && typeof collect_time === "number") {
          config.SPACollectTime = collect_time;
        }
        if (alias_name) {
          config.customAliasName = alias_name;
        }
        if (path_name) {
          var regexpLastPath = /\/([a-zA-Z0-9._]+)(?:\?.*)?$/;
          var isPath = regexpLastPath.test(path_name);
          isPath ? config.customPathName = path_name : config.customPathName = "/" + path_name;
        }
        window.dispatchEvent(new Event("imqaDataSend"));
      }
    };
  };
  SPAOnLoadWindowManager.prototype.agentSendHook = function (config) {
    window.addEventListener("imqaDataSend", function (e) {
      var SPA = new SPAOnLoad_1.SPAOnLoad();
      SPA.init(config);
      SPA.setStartTime(e.timeStamp);
      SPAOnLoadManager_1.SPAOnLoadManager.GetInstance().add(SPA);
    });
  };
  return SPAOnLoadWindowManager;
}();
exports.SPAOnLoadWindowManager = SPAOnLoadWindowManager;

/***/ }),

/***/ 131:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnRender = void 0;
var Header_1 = __webpack_require__(929);
var TransactionManager_1 = __webpack_require__(553);
var IMQAAgent_1 = __webpack_require__(483);
var OnRenderManager_1 = __webpack_require__(808);
var OnRenderBody_1 = __webpack_require__(541);
var OnRender = /** @class */function () {
  function OnRender() {
    this.header = new Header_1.Header();
    this.body = new OnRenderBody_1.OnRenderBody();
    this.startTime = 0;
    this.endTime = 0;
  }
  OnRender.prototype.init = function (config) {
    this.startTime = new Date().valueOf();
    this.header.set(config);
    this.header.webviewTxId = TransactionManager_1.TransactionManager.GetTxID();
    this.onRenderManager = new OnRenderManager_1.OnRenderManager(this);
    this.onRenderManager.init();
  };
  OnRender.prototype.create = function () {};
  OnRender.prototype.finish = function () {
    this.endTime = this.onRenderManager.getEndTime();
    this.body = this.onRenderManager.getBody();
    var data = {
      header: this.header,
      body: this.body,
      startTime: this.startTime,
      endTime: this.endTime
    };
    IMQAAgent_1.IMQAAgent.GetInstance().send(data);
  };
  OnRender.prototype.update = function (entry) {
    this.onRenderManager.pushEntry(entry);
  };
  return OnRender;
}();
exports.OnRender = OnRender;

/***/ }),

/***/ 541:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnRenderBody = void 0;
var OnRenderBody = /** @class */function () {
  function OnRenderBody() {
    this.type = "onRender";
    this.timings = [];
    this.scripts = [];
  }
  return OnRenderBody;
}();
exports.OnRenderBody = OnRenderBody;

/***/ }),

/***/ 808:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnRenderManager = void 0;
var TransactionManager_1 = __webpack_require__(553);
var OnRenderManager = /** @class */function () {
  function OnRenderManager(onRender) {
    this.onRender = onRender;
    this.onRenderBody = this.onRender.body;
    this.measures = [];
  }
  OnRenderManager.prototype.init = function () {
    this.onDOMContentLoaded();
    this.onLoaded();
  };
  ;
  OnRenderManager.prototype.onDOMContentLoaded = function () {
    var _this = this;
    window.addEventListener("DOMContentLoaded", function (event) {
      _this.onRenderBody.timings.push({
        name: "DCL",
        fullName: "dom-content-loaded",
        timing: event.timeStamp || 0
      });
    });
  };
  OnRenderManager.prototype.onLoaded = function () {
    var _this = this;
    window.addEventListener("load", function (event) {
      _this.onRenderBody.timings.push({
        name: "LOAD",
        fullName: "dom-loaded",
        timing: event.timeStamp || 0
      });
      _this.endTime = new Date().valueOf();
      setTimeout(function () {
        _this.onRender.finish();
      }, 1000);
    });
  };
  OnRenderManager.prototype.getEndTime = function () {
    return this.endTime;
  };
  OnRenderManager.prototype.getBody = function () {
    return this.onRender.body;
  };
  OnRenderManager.prototype.pushEntry = function (entry, timeStamp) {
    if (timeStamp === void 0) {
      timeStamp = 0;
    }
    switch (entry.entryType) {
      case "measure":
        this.onRenderBody.scripts = this.getMeasureData(entry);
        break;
      case "paint":
        this.onRenderBody.timings.push(this.getPaintData(entry));
        break;
      case "largest-contentful-paint":
        this.onRenderBody.timings.push(this.getLCPData(entry));
        break;
      default:
        break;
    }
  };
  OnRenderManager.prototype.getPaintData = function (entry) {
    var shortName;
    switch (entry.name) {
      case "first-paint":
        shortName = "FP";
        break;
      case "first-contentful-paint":
        shortName = "FCP";
        break;
      default:
        shortName = "Other";
        break;
    }
    return {
      name: shortName,
      fullName: entry.name,
      timing: entry.startTime
    };
  };
  OnRenderManager.prototype.getLCPData = function (entry) {
    return {
      name: "LCP",
      fullName: "largest-contentful-paint",
      timing: entry.startTime
    };
  };
  /**
   * measure 데이터 가져오기
   * @param entry
   */
  OnRenderManager.prototype.getMeasureData = function (entry) {
    var _a, _b, _c;
    this.measures.push({
      name: entry.name,
      start: entry.startTime,
      type: 'function',
      parentId: ((_a = entry.detail) === null || _a === void 0 ? void 0 : _a.parentName) ? this.getParentId((_b = entry.detail) === null || _b === void 0 ? void 0 : _b.parentName) : '',
      scriptId: TransactionManager_1.TransactionManager.GenerateScriptID(),
      parentName: ((_c = entry.detail) === null || _c === void 0 ? void 0 : _c.parentName) || '',
      duration: entry.duration
    });
    return this.measures;
  };
  OnRenderManager.prototype.getParentId = function (params_name) {
    var result = this.measures.filter(function (item) {
      return item.name === params_name;
    });
    return result[result.length - 1]['scriptId'];
  };
  /**
   * 특정 조건에 따른 트리 노드추가
   * @param parent
   * @param node
   */
  OnRenderManager.prototype.insertNode = function (parent, node) {
    if (parent.children.length > 0) {
      var lastChild = parent.children[parent.children.length - 1];
      if (node.start >= lastChild.start + lastChild.duration && node.duration !== 0) {
        parent.children.push(node);
        return;
      }
      this.insertNode(lastChild, node);
    } else {
      parent.children.push(node);
    }
  };
  /**
   * 트리 생성 로직
   * @param data
   */
  OnRenderManager.prototype.buildTree = function (data) {
    var root = {
      children: [],
      start: 0,
      duration: 0,
      type: "function",
      scriptId: TransactionManager_1.TransactionManager.GenerateScriptID()
    };
    for (var i = 0; i < data.length; i++) {
      var node = {
        name: data[i].name,
        start: data[i].startTime,
        duration: data[i].duration,
        children: [],
        type: "function",
        scriptId: TransactionManager_1.TransactionManager.GenerateScriptID()
      };
      this.insertNode(root, node);
    }
    return root.children;
  };
  return OnRenderManager;
}();
exports.OnRenderManager = OnRenderManager;

/***/ }),

/***/ 171:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PerformanceObserverManager = void 0;
var PerformanceObserverManager = /** @class */function () {
  function PerformanceObserverManager() {
    this.dataList = [];
  }
  /**
   * PerformanceObserverManger 인스턴스 불러오기
   * @constructor
   */
  PerformanceObserverManager.GetInstance = function () {
    // PerformanceObserverManager의 instance가 없으면 생성
    if (!PerformanceObserverManager.instance) {
      PerformanceObserverManager.instance = new PerformanceObserverManager();
    }
    // PerformanceObserverManager의 performanceObserver 없으면 생성
    if (!this.performanceObserver) {
      PerformanceObserverManager.instance.init();
    }
    return PerformanceObserverManager.instance;
  };
  PerformanceObserverManager.prototype.init = function () {
    var _this = this;
    PerformanceObserverManager.performanceObserver = new PerformanceObserver(function (list) {
      for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
        var entry = _a[_i];
        _this.notify(entry);
      }
    });
    // PerformanceObserverManager observe options
    PerformanceObserverManager.performanceObserver.observe({
      entryTypes: ["mark", "measure", "navigation", "paint", "resource", "first-input", "largest-contentful-paint"]
    });
  };
  /**
   * DataList에 subscriber 등록
   * @param subscriber
   */
  PerformanceObserverManager.prototype.subscribe = function (subscriber) {
    this.dataList.push(subscriber);
  };
  /**
   * DataList에 있는 subscriber 제거
   * @param subscriber
   */
  PerformanceObserverManager.prototype.unsubscribe = function (subscriber) {
    this.dataList = this.dataList.filter(function (registedSubscriber) {
      return registedSubscriber !== subscriber;
    });
  };
  /**
   * DataList에 있는 subscriber에 entry 데이터 전파
   * @param entry
   */
  PerformanceObserverManager.prototype.notify = function (entry) {
    this.dataList.forEach(function (subscriber) {
      return subscriber.update(entry);
    });
  };
  return PerformanceObserverManager;
}();
exports.PerformanceObserverManager = PerformanceObserverManager;

/***/ }),

/***/ 721:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.makeValidURL = exports.parseURL = void 0;
var IMQAConfig_1 = __webpack_require__(138);
function parseURL(url) {
  var _a = new URL(url),
    host = _a.host,
    protocol = _a.protocol,
    pathname = _a.pathname,
    search = _a.search,
    searchParams = _a.searchParams;
  protocol = protocol.slice(0, protocol.length - 1);
  return {
    host: host,
    protocol: protocol,
    pathname: pathname,
    search: search,
    searchParams: searchParams
  };
}
exports.parseURL = parseURL;
function makeValidURL(urlString) {
  try {
    var url = new URL(urlString);
    return url.href;
  } catch (err) {
    // intercept 한 url이 pathname만 있을 때 (invalid)
    // URL 클래스에서 에러 발생
    var config = new IMQAConfig_1.IMQAConfig(window);
    var validURL = config.root_window.location.protocol + "//";
    validURL += config.root_window.location.host;
    validURL += urlString;
    return validURL;
  }
}
exports.makeValidURL = makeValidURL;

/***/ }),

/***/ 247:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnWeb = void 0;
var TransactionManager_1 = __webpack_require__(553);
var OnWebBody_1 = __webpack_require__(900);
var OnWebManager_1 = __webpack_require__(931);
var IMQAAgent_1 = __webpack_require__(483);
var WebBridge_1 = __webpack_require__(498);
var OnWeb = /** @class */function () {
  function OnWeb() {
    this.type = "gzip";
    this.ip = "127.0.0.1";
    this.body = new OnWebBody_1.OnWebBody();
  }
  /**
   * OnWeb 인스턴스 불러오기
   * @constructor
   */
  OnWeb.GetInstance = function () {
    if (!OnWeb.instance) {
      OnWeb.instance = new OnWeb();
    }
    return OnWeb.instance;
  };
  OnWeb.prototype.init = function (config) {
    this.onWebManager = new OnWebManager_1.OnWebManager();
    this.body.device_info = this.onWebManager.makeDeviceInfoData(config);
    this.body.dump_init_time = new Date().valueOf();
    this.body.launch_time = new Date().valueOf();
    this.body.process_id = TransactionManager_1.TransactionManager.GetProcessID();
    this.body.package_name = IMQAAgent_1.IMQAAgent.GetInstance().config.package_name;
    this.body.process_name = IMQAAgent_1.IMQAAgent.GetInstance().config.process_name;
    this.body.platform = 'aos';
    this.body.service = 'mpm';
    var user_id = localStorage.getItem("IMQA-Browser-User-ID");
    if (!user_id) localStorage.setItem("IMQA-Browser-User-ID", TransactionManager_1.TransactionManager.GetUserID());
    this.body.user_id = localStorage.getItem("IMQA-Browser-User-ID");
    this.body.project_key = IMQAAgent_1.IMQAAgent.GetInstance().config.projectKey;
    this.project_key = IMQAAgent_1.IMQAAgent.GetInstance().config.projectKey;
  };
  OnWeb.prototype.create = function () {
    var resData = this.onWebManager.makeRenderData();
    this.body.data.push(resData);
    // onWebManager 설정
    this.onWebManager.init();
  };
  OnWeb.prototype.finish = function () {
    var _this = this;
    var data = {
      type: this.type,
      ip: this.ip,
      body: this.body,
      project_key: this.project_key
    };
    new WebBridge_1.WebBridge().send(data).then(function () {
      // 데이터보내고 dump 초기화
      _this.body.data = [];
      _this.onWebManager.clearSendInterval();
    })["catch"](function () {
      // error가 날 경우 인터벌 클리어
      console.log("err");
    });
  };
  OnWeb.prototype.update = function (data) {
    var webData = this.onWebManager.makeWebData(data);
    this.body.data.push(webData);
  };
  return OnWeb;
}();
exports.OnWeb = OnWeb;

/***/ }),

/***/ 900:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnWebBody = void 0;
var OnWebBody = /** @class */function () {
  function OnWebBody() {
    this.launch_time = 0;
    this.dump_init_time = 0;
    this.mpm_version = "2.20.0";
    this.crash_version = "0.0.0";
    this.core_version = "0.0.0";
    this.dump_interval = 1000;
    this.package_name = "";
    this.process_name = "";
    this.project_key = "";
    this.platform = "";
    this.service = "";
    this.custom_user_id = {
      id: "",
      name: "",
      email: ""
    };
    this.device_info = {
      os: "",
      app: "",
      device: "",
      brand: "",
      carrier: "-",
      uuid: "",
      ip: "-",
      location: {
        code: "",
        country_name: ""
      },
      city: {
        code: "",
        city_name: ""
      }
    };
    this.process_id = "";
    this.user_id = "";
    this.data = [];
  }
  return OnWebBody;
}();
exports.OnWebBody = OnWebBody;

/***/ }),

/***/ 931:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OnWebManager = void 0;
var TransactionManager_1 = __webpack_require__(553);
var IMQAAgent_1 = __webpack_require__(483);
var OnWeb_1 = __webpack_require__(247);
var OnWebManager = /** @class */function () {
  function OnWebManager() {
    this.intervalSetTime = null;
  }
  OnWebManager.prototype.init = function () {
    // 인터벌 주기로 보내기
    this.SendInterval();
    // 윈도우가 닫힐때 보내기
    this.onBeforeunload();
  };
  /**
   * 브라우저가 사라질때 보내기
   * @param data
   */
  OnWebManager.prototype.onBeforeunload = function () {
    var _this = this;
    window.addEventListener("beforeunload", function (event) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          // 표준에 따라 기본 동작 방지
          event.preventDefault();
          this.clearSendInterval();
          if (OnWeb_1.OnWeb.GetInstance().body.data.length <= 0) return [2 /*return*/];
          OnWeb_1.OnWeb.GetInstance().finish();
          return [2 /*return*/];
        });
      });
    });
  };
  /**
   * 브라우저 주기적으로 데이터 보내기
   * @param data
   * @param onWeb
   */
  OnWebManager.prototype.SendInterval = function () {
    var intervalTime = IMQAAgent_1.IMQAAgent.GetInstance().config.webIntervalTime;
    // 데이터가 많아져서 API에 응답이 늦어질경우 동적으로 intervalTime 늘리기위해 setTimeout 사용
    this.intervalSetTime = setTimeout(function interval() {
      if (OnWeb_1.OnWeb.GetInstance().body.data.length > 0) {
        OnWeb_1.OnWeb.GetInstance().finish();
      }
      this.intervalSetTime = setTimeout(interval, intervalTime);
    }, intervalTime);
  };
  /**
   * 브라우저 주기적으로 보내는 interval clear
   */
  OnWebManager.prototype.clearSendInterval = function () {
    clearTimeout(this.intervalSetTime);
  };
  OnWebManager.prototype.makeDeviceInfoData = function (config) {
    return {
      os: config.root_window.navigator.platform,
      app: "1.0",
      device: this.getBrowserName(config.root_window.navigator.userAgent),
      brand: config.root_window.navigator.vendor,
      carrier: "-",
      uuid: localStorage.getItem("IMQA-Browser-User-ID"),
      ip: "-",
      location: {
        code: "",
        country_name: ""
      },
      city: {
        code: "",
        city_name: ""
      }
    };
  };
  OnWebManager.prototype.makeRenderData = function () {
    var locationList = IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.pathname.split("/");
    var lastPath = locationList[locationList.length - 1];
    var locationOrigin = IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.origin;
    return {
      type: "render",
      activity_name: lastPath ? lastPath : locationOrigin,
      screen_name: lastPath ? lastPath : locationOrigin,
      lifecycle_name: "onResume",
      start_time: new Date().valueOf(),
      end_time: new Date().valueOf(),
      behaviorTxId: TransactionManager_1.TransactionManager.GetTxID(),
      txId: TransactionManager_1.TransactionManager.GetProcessID()
    };
  };
  OnWebManager.prototype.makeWebData = function (data) {
    var locationList = IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.pathname.split("/");
    var lastPath = locationList[locationList.length - 1];
    var locationOrigin = IMQAAgent_1.IMQAAgent.GetInstance().config.root_window.location.origin;
    return {
      type: "webview",
      body: JSON.stringify(data),
      screen_name: lastPath ? lastPath : locationOrigin,
      behaviorTxId: TransactionManager_1.TransactionManager.GetTxID(),
      txId: TransactionManager_1.TransactionManager.GetProcessID(),
      metaData: ""
    };
  };
  OnWebManager.prototype.getBrowserName = function (userAgent) {
    // The order matters here, and this may report false positives for unlisted browsers.
    if (userAgent.includes("Firefox")) {
      // "Mozilla/5.0 (X11; Linux i686; rv:104.0) Gecko/20100101 Firefox/104.0"
      return "Mozilla Firefox";
    } else if (userAgent.includes("SamsungBrowser")) {
      // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36"
      return "Samsung Internet";
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
      // "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 OPR/90.0.4480.54"
      return "Opera";
    } else if (userAgent.includes("Trident")) {
      // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)"
      return "Microsoft Internet Explorer";
    } else if (userAgent.includes("Edge")) {
      // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
      return "Microsoft Edge (Legacy)";
    } else if (userAgent.includes("Edg")) {
      // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Edg/104.0.1293.70"
      return "Microsoft Edge (Chromium)";
    } else if (userAgent.includes("Chrome")) {
      // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
      return "Google Chrome";
    } else if (userAgent.includes("Safari")) {
      // "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1"
      return "Apple Safari";
    } else {
      return "unknown";
    }
  };
  return OnWebManager;
}();
exports.OnWebManager = OnWebManager;

/***/ }),

/***/ 498:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.WebBridge = void 0;
var IMQAAgent_1 = __webpack_require__(483);
var WebBridge = /** @class */function () {
  function WebBridge() {
    this.COLLECTOR_URL = IMQAAgent_1.IMQAAgent.GetInstance().config.collectorUrl;
  }
  WebBridge.prototype.send = function (data) {
    var _this = this;
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.open("POST", _this.COLLECTOR_URL);
      xhr.responseType = "json";
      xhr.setRequestHeader("Access-Control-Allow-Headers", "*");
      xhr.setRequestHeader('Content-Encoding', 'gzip');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('project_key', IMQAAgent_1.IMQAAgent.GetInstance().config.projectKey);
      xhr.setRequestHeader('app_version', '1.0');
      xhr.setRequestHeader('web_agent', IMQAAgent_1.IMQAAgent.GetInstance().config.agentType);
      xhr.send(JSON.stringify(data.body));
    });
  };
  return WebBridge;
}();
exports.WebBridge = WebBridge;

/***/ }),

/***/ 95:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XHR = void 0;
var Header_1 = __webpack_require__(929);
var XHRBody_1 = __webpack_require__(504);
var TransactionManager_1 = __webpack_require__(553);
var IMQAConfig_1 = __webpack_require__(138);
var XHR = /** @class */function () {
  function XHR() {
    this.header = new Header_1.Header();
    this.body = new XHRBody_1.XHRBody();
    this.startTime = 0;
    this.endTime = 0;
    var config = new IMQAConfig_1.IMQAConfig(window);
    this.init(config);
  }
  XHR.prototype.init = function (config) {
    this.startTime = new Date().valueOf();
    this.header.set(config);
    this.header.webviewTxId = TransactionManager_1.TransactionManager.GetTxID();
  };
  XHR.prototype.create = function () {};
  XHR.prototype.finish = function () {};
  XHR.prototype.update = function () {};
  return XHR;
}();
exports.XHR = XHR;

/***/ }),

/***/ 504:
/***/ (function(__unused_webpack_module, exports) {



var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XHRBody = void 0;
var XHRBody = /** @class */function () {
  function XHRBody() {
    this.url = "";
    this.status = 0;
    this.method = "";
    this.type = "xhr";
    this.protocol = "";
    this.host = "";
    this.pathname = "";
    this.resource_type = "";
    this.duration = 0;
    this.startTime = 0;
    this.timing = {
      server: 0,
      wait: 0,
      network: 0
    };
  }
  XHRBody.prototype.setPerformanceData = function (data) {
    this.protocol = data.protocol;
    this.host = data.host;
    this.pathname = data.pathname;
    this.resource_type = data.resource_type;
    this.startTime = data.startTime;
    this.duration = data.duration;
    this.timing = __assign({}, data.timing);
  };
  XHRBody.prototype.setXHRData = function (httpObject) {
    this.status = httpObject.status;
    this.method = httpObject.method;
    this.url = httpObject.url;
  };
  return XHRBody;
}();
exports.XHRBody = XHRBody;

/***/ }),

/***/ 953:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XHRInterceptor = void 0;
var XHRManager_1 = __webpack_require__(587);
var Util_1 = __webpack_require__(721);
var IMQAAgent_1 = __webpack_require__(483);
var XHRInterceptor = /** @class */function () {
  function XHRInterceptor() {
    this.COLLECTOR_URL = IMQAAgent_1.IMQAAgent.GetInstance().config.collectorUrl;
    // @ts-ignore
    XMLHttpRequest.prototype.open = this.openReplacement;
    XMLHttpRequest.prototype.send = this.sendReplacement;
  }
  XHRInterceptor.prototype.openReplacement = function (method, url, async, username, password) {
    // @ts-ignore
    this._url = (0, Util_1.makeValidURL)(url);
    // @ts-ignore
    this._method = method;
    // @ts-ignore
    return XHRInterceptor.originalOpen.apply(this, arguments);
  };
  XHRInterceptor.prototype.sendReplacement = function (data) {
    // @ts-ignore
    this.onreadystatechange = function () {
      // @ts-ignore
      if (this.readyState === XMLHttpRequest.DONE) {
        var xhrManager = XHRManager_1.XHRManager.GetInstance();
        // @ts-ignore
        if (this._url !== IMQAAgent_1.IMQAAgent.GetInstance().config.collectorUrl) {
          xhrManager.pushHttp(this._url, this.status, this._method);
        }
      }
    };
    // @ts-ignore
    return XHRInterceptor.originalSend.apply(this, arguments);
  };
  XHRInterceptor.originalOpen = XMLHttpRequest.prototype.open;
  XHRInterceptor.originalSend = XMLHttpRequest.prototype.send;
  return XHRInterceptor;
}();
exports.XHRInterceptor = XHRInterceptor;

/***/ }),

/***/ 587:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XHRManager = void 0;
var XHR_1 = __webpack_require__(95);
var Util_1 = __webpack_require__(721);
var IMQAAgent_1 = __webpack_require__(483);
// interceptorXHR로 가로챈 XHR 요청들을
// PushXHR에 임시로 저장한다.
// Performance Entry의 정보를 저장한 요청과 합쳐서 SDK에 전송한다.
var XHRManager = /** @class */function () {
  function XHRManager() {
    XHRManager.HttpArray = [];
  }
  XHRManager.GetInstance = function () {
    if (!this.instance) {
      this.instance = new XHRManager();
    }
    return this.instance;
  };
  // 가로챈 XHR 요청을 배열(HTTPArray)에 push한다.
  XHRManager.prototype.pushHttp = function (url, status, method) {
    XHRManager.HttpArray.push({
      url: url,
      status: status,
      method: method
    });
  };
  // PerformanceObserver가 감지한 성능 정보와
  // HTTP 정보를 합치고 SDK에 보낸다.
  // 보낸 HTTP 정보는 삭제한다.
  XHRManager.prototype.update = function (performanceEntry) {
    var _this = this;
    if (performanceEntry.initiatorType !== "xmlhttprequest") return;
    XHRManager.HttpArray = this.get().filter(function (httpData) {
      if (httpData.url === performanceEntry.name) {
        var xhr = new XHR_1.XHR();
        var _a = (0, Util_1.parseURL)(performanceEntry.name),
          protocol = _a.protocol,
          host = _a.host,
          pathname = _a.pathname;
        xhr.body.setPerformanceData({
          startTime: Math.floor(performanceEntry.startTime),
          duration: Math.floor(performanceEntry.duration),
          protocol: protocol,
          host: host,
          pathname: pathname,
          resource_type: performanceEntry.initiatorType,
          timing: getXHRTiming(performanceEntry)
        });
        xhr.body.setXHRData(httpData);
        _this.finish(xhr);
        return false;
      } else return true;
    });
  };
  XHRManager.prototype.finish = function (xhr) {
    xhr.endTime = new Date().valueOf();
    IMQAAgent_1.IMQAAgent.GetInstance().send(xhr);
  };
  XHRManager.prototype.get = function () {
    return XHRManager.HttpArray;
  };
  return XHRManager;
}();
exports.XHRManager = XHRManager;
function getXHRTiming(xhrPerfEntry) {
  var serverStart = xhrPerfEntry.requestStart ? xhrPerfEntry.requestStart : xhrPerfEntry.fetchStart;
  return {
    network: xhrPerfEntry.connectEnd - xhrPerfEntry.domainLookupStart,
    wait: xhrPerfEntry.requestStart - xhrPerfEntry.redirectStart,
    server: xhrPerfEntry.responseEnd - serverStart
  };
}

/***/ }),

/***/ 679:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function get() {
    return _nil["default"];
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function get() {
    return _parse["default"];
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function get() {
    return _stringify["default"];
  }
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function get() {
    return _v["default"];
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function get() {
    return _v2["default"];
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function get() {
    return _v3["default"];
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function get() {
    return _v4["default"];
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function get() {
    return _validate["default"];
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function get() {
    return _version["default"];
  }
}));
var _v = _interopRequireDefault(__webpack_require__(999));
var _v2 = _interopRequireDefault(__webpack_require__(231));
var _v3 = _interopRequireDefault(__webpack_require__(647));
var _v4 = _interopRequireDefault(__webpack_require__(25));
var _nil = _interopRequireDefault(__webpack_require__(996));
var _version = _interopRequireDefault(__webpack_require__(928));
var _validate = _interopRequireDefault(__webpack_require__(163));
var _stringify = _interopRequireDefault(__webpack_require__(982));
var _parse = _interopRequireDefault(__webpack_require__(729));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

/***/ }),

/***/ 792:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);
    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */

function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';
  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }
  return output;
}
/**
 * Calculate output length with padding and bit length
 */

function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */

function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */

function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));
  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }
  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */

function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */

function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */

function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ 788:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var _default = {
  randomUUID: randomUUID
};
exports["default"] = _default;

/***/ }),

/***/ 996:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ 729:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _validate = _interopRequireDefault(__webpack_require__(163));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function parse(uuid) {
  if (!(0, _validate["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }
  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}
var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ 300:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ 402:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }
  return getRandomValues(rnds8);
}

/***/ }),

/***/ 702:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];
    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);
  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);
    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }
    M[_i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;
  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);
    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }
    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }
    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];
    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}
var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ 982:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.unsafeStringify = unsafeStringify;
var _validate = _interopRequireDefault(__webpack_require__(163));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }
  return uuid;
}
var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ 999:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _rng = _interopRequireDefault(__webpack_require__(402));
var _stringify = __webpack_require__(982);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
var _nodeId;
var _clockseq; // Previous uuid creation time

var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng["default"])();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.

  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval

  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested

  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || (0, _stringify.unsafeStringify)(b);
}
var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ 231:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _v = _interopRequireDefault(__webpack_require__(125));
var _md = _interopRequireDefault(__webpack_require__(792));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var v3 = (0, _v["default"])('v3', 0x30, _md["default"]);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ 125:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.URL = exports.DNS = void 0;
exports["default"] = v35;
var _stringify = __webpack_require__(982);
var _parse = _interopRequireDefault(__webpack_require__(729));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];
  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;
function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }
    if (typeof namespace === 'string') {
      namespace = (0, _parse["default"])(namespace);
    }
    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`

    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return (0, _stringify.unsafeStringify)(bytes);
  } // Function#name is not settable on some platforms (#270)

  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support

  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ 647:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _native = _interopRequireDefault(__webpack_require__(788));
var _rng = _interopRequireDefault(__webpack_require__(402));
var _stringify = __webpack_require__(982);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function v4(options, buf, offset) {
  if (_native["default"].randomUUID && !buf && !options) {
    return _native["default"].randomUUID();
  }
  options = options || {};
  var rnds = options.random || (options.rng || _rng["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return (0, _stringify.unsafeStringify)(rnds);
}
var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ 25:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _v = _interopRequireDefault(__webpack_require__(125));
var _sha = _interopRequireDefault(__webpack_require__(702));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var v5 = (0, _v["default"])('v5', 0x50, _sha["default"]);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ 163:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _regex = _interopRequireDefault(__webpack_require__(300));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function validate(uuid) {
  return typeof uuid === 'string' && _regex["default"].test(uuid);
}
var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ 928:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _validate = _interopRequireDefault(__webpack_require__(163));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function version(uuid) {
  if (!(0, _validate["default"])(uuid)) {
    throw TypeError('Invalid UUID');
  }
  return parseInt(uuid.slice(14, 15), 16);
}
var _default = version;
exports["default"] = _default;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
__webpack_unused_export__ = void 0;
var IMQAAgent_1 = __webpack_require__(483);
var CrashWindowManager_1 = __webpack_require__(446);
var PerformanceObserverManager_1 = __webpack_require__(171);
var DomOnLoad_1 = __webpack_require__(142);
var SPAOnLoadWindowManager_1 = __webpack_require__(395);
var XHRInterceptor_1 = __webpack_require__(953);
var XHRManager_1 = __webpack_require__(587);
var OnWeb_1 = __webpack_require__(247);
var OnRender_1 = __webpack_require__(131);
var TransactionManager_1 = __webpack_require__(553);
function main(window) {
  console.log("%cIMQA WEB AGENT", "color:#736efe; font-size:30px; font-weight:bold; font-style:italic;");
  // BridgeConnector 연결확인
  var agent = IMQAAgent_1.IMQAAgent.GetInstance(window);
  // Web Data 프로세스ID, UserID 생성
  TransactionManager_1.TransactionManager.GenerateProcessID();
  TransactionManager_1.TransactionManager.GenerateUserID();
  if (agent.isConnect()) {
    agent.setBrowser();
    TransactionManager_1.TransactionManager.GenerateTxID();
    var config = agent.config;
    new XHRInterceptor_1.XHRInterceptor();
    var xhrManager = new XHRManager_1.XHRManager();
    var POM = PerformanceObserverManager_1.PerformanceObserverManager.GetInstance();
    var DOMOnLoad = new DomOnLoad_1.DomOnLoad();
    DOMOnLoad.init(config);
    var SPAManager = new SPAOnLoadWindowManager_1.SPAOnLoadWindowManager();
    SPAManager.init(config);
    SPAManager.createHook(config);
    var DOMOnRender = new OnRender_1.OnRender();
    DOMOnRender.init(config);
    POM.subscribe(DOMOnLoad);
    POM.subscribe(xhrManager);
    POM.subscribe(DOMOnRender);
    if (config.agentType === "web") {
      OnWeb_1.OnWeb.GetInstance().init(config);
      OnWeb_1.OnWeb.GetInstance().create();
    }
    CrashWindowManager_1.CrashWindowManager.run();
  }
  return;
}
__webpack_unused_export__ = main;
main(window);
})();

/******/ })()
;