/**
 * Created by Xingxing on 2018/1/9.
 */
if (window.JSON && window.JSON.stringify.toString().indexOf("[native code]") !== -1) {
    window.JSONYoudao = window.JSON
} else {
    window.JSONYoudao = {}
}
(function () {
    "use strict";
    function f(n) {
        return n < 10 ? "0" + n : n
    }

    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"},
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + string + '"'
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case"string":
                return quote(value);
            case"number":
                return isFinite(value) ? String(value) : "null";
            case"boolean":
            case"null":
                return String(value);
            case"object":
                if (!value) {
                    return "null"
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null"
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v
        }
    }

    if (typeof JSONYoudao.stringify !== "function") {
        JSONYoudao.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else if (typeof space === "string") {
                indent = space
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {"": value})
        }
    }
    if (typeof JSONYoudao.parse !== "function") {
        JSONYoudao.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({"": j}, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
})();
(function () {
    var YoudaoUtils = {
        createNode: function (name, attributes, context) {
            var ctx = context || document;
            var element = ctx.createElement(name);
            if (attributes) {
                YoudaoUtils.each(attributes, function (key, value) {
                    if (key === "class") {
                        element.className = value
                    } else {
                        element.setAttribute(key, value)
                    }
                })
            }
            return element
        }, isDOM: function (elem) {
            return elem !== null && elem.nodeType === 1
        }, isArray: function (object) {
            return Object.prototype.toString.call(object) === "[object Array]"
        }, isFunction: function (object) {
            return Object.prototype.toString.call(object) === "[object Function]"
        }, browser: function () {
            var browser = {};
            var ua = navigator.userAgent.toLowerCase();
            var s = null;
            if (s = ua.match(/chrome\/([\d.]+)/)) browser.chrome = s[1]; else if (s = ua.match(/firefox\/([\d.]+)/)) browser.firefox = s[1]; else if (s = ua.match(/msie ([\d.]+)/)) browser.msie = s[1];
            return browser
        }(), each: function (object, callback, context) {
            if (object === null) {
                return
            }
            if (object.length === undefined || YoudaoUtils.isFunction(object)) {
                for (var name in object) {
                    if (object.hasOwnProperty(name)) {
                        if (callback.call(context || object[name], name, object[name]) === false) {
                            break
                        }
                    }
                }
            } else {
                for (var i = 0, l = object.length; i < l; i++) {
                    if (callback.call(context || object[i], i, object[i]) === false) {
                        break
                    }
                }
            }
            return object
        }, indexOf: function (object, value) {
            if (object.indexOf) {
                return object.indexOf(value)
            } else {
                var result = -1;
                YoudaoUtils.each(object, function (key) {
                    if (this === value) {
                        result = key;
                        return false
                    }
                });
                return result
            }
        }, log: function () {
            if (window.console !== undefined && window.console.log !== undefined) {
                var a = YoudaoUtils.makeArray(arguments);
                a.unshift("[YoudaoUtils]");
                try {
                    window.console.log.apply(window.console, a)
                } catch (e) {
                    var result = "[YoudaoUtils.log]";
                    for (var i = 0, l = arguments.length; i < l; i++) {
                        result += " " + arguments[i]
                    }
                    window.console.log(result)
                }
            }
        }, makeArray: function (object) {
            return Array.prototype.slice.call(object, 0)
        }, prototypeExtend: function (object, constructor) {
            var F = YoudaoUtils.isFunction(constructor) ? constructor : function () {
            };
            F.prototype = object;
            return new F
        }, location: function () {
            return !!window.location ? window.location : !!document.location ? document.location : null
        }, url: function () {
            var location = YoudaoUtils.location();
            if (!!location && location.href !== undefined)return location.href; else return null
        }, bind: function (object, eventName, callback) {
            if (!callback) {
                return
            }
            if (object.addEventListener) {
                object.addEventListener(eventName, callback, false)
            } else if (object.attachEvent) {
                object.attachEvent("on" + eventName, callback)
            } else {
                object["on" + eventName] = callback
            }
            return this
        }, unbind: function (object, eventName, callback) {
            if (!callback) {
                return
            }
            if (object.removeEventListener) {
                object.removeEventListener(eventName, callback, false)
            } else if (object.detachEvent) {
                object.detachEvent("on" + eventName, callback)
            } else {
                object["on" + eventName] = function () {
                }
            }
            return this
        }, stopPropagation: function (e) {
            var event = e || window.event;
            if (event.stopPropagation) {
                event.stopPropagation()
            } else {
                event.cancelBubble = true
            }
            return event
        }, preventDefault: function (e) {
            var event = e || window.event;
            if (event.preventDefault) {
                event.preventDefault()
            } else {
                event.returnValue = false
            }
            return event
        }, getSelectionText: function () {
            var text = null;
            if (window.getSelection) {
                text = window.getSelection().toString()
            }
            if (!!text) {
                return text
            } else if (document.selection)return document.selection.createRange().text; else return null
        }, trim: function (str) {
            return str.replace(/^\s*/, "").replace(/\s*$/, "")
        }, parameter: function (data) {
            var pairs = [];
            YoudaoUtils.each(data, function (key, value) {
                pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(value))
            });
            return pairs.join("&")
        }, formatTemplate: function (template, data) {
            var tempContainer = document.createElement("div");
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    template = template.replace(new RegExp("{" + key + "}", "g"), data[key])
                }
            }
            tempContainer.innerHTML = template;
            var result = tempContainer.firstChild;
            tempContainer.removeChild(result);
            return result
        }, getDocumentCharset: function () {
            return document.characterSet || document.charset
        }, css: function () {
            var getStyle = function (elem, styleName) {
                var value = "";
                if (styleName == "float") {
                    document.defaultView ? styleName = "float" : styleName = "styleFloat"
                }
                if (elem.style[styleName]) {
                    value = elem.style[styleName]
                } else if (elem.currentStyle) {
                    value = elem.currentStyle[styleName]
                } else if (document.defaultView && document.defaultView.getComputedStyle) {
                    styleName = styleName.replace(/([A-Z])/g, "-$1").toLowerCase();
                    var s = document.defaultView.getComputedStyle(elem, "");
                    value = s && s.getPropertyValue(styleName)
                } else {
                    value = null
                }
                if ((value == "auto" || value.indexOf("%") !== -1) && ("width" === styleName.toLowerCase() || "height" === styleName.toLowerCase()) && elem.style.display != "none" && value.indexOf("%") !== -1) {
                    value = elem["offset" + styleName.charAt(0).toUpperCase() + styleName.substring(1).toLowerCase()] + "px"
                }
                if (styleName == "opacity") {
                    try {
                        value = elem.filters["DXImageTransform.Microsoft.Alpha"].opacity;
                        value = value / 100
                    } catch (e) {
                        try {
                            value = elem.filters("alpha").opacity
                        } catch (err) {
                        }
                    }
                }
                return value
            };
            return function (elem, styles) {
                if (typeof styles === "string") {
                    return getStyle(elem, styles)
                } else {
                    YoudaoUtils.each(styles, function (key, value) {
                        elem.style[key] = value
                    })
                }
            }
        }(), hasClass: function (elem, className) {
            if (YoudaoUtils.isDOM(elem)) {
                if (elem.className === className) {
                    return true
                }
                var classes = elem.className.split(" ");
                for (var i = 0, l = classes.length; i < l; i++) {
                    if (className === classes[i]) {
                        return true
                    }
                }
            }
            return false
        }, loadCSS: function (doc, css) {
            if (doc && doc.createElement) {
                var link = doc.createElement("link");
                var url = YoudaoUtils.generateResourceLink(css);
                link.setAttribute("rel", "stylesheet");
                link.setAttribute("href", url);
                link.setAttribute("type", "text/css");
                var parent = doc.getElementsByTagName("head")[0] || doc.body;
                parent.appendChild(link)
            }
        }, loadCSSToLink: function (doc, id, css) {
            if (doc) {
                var link = doc.getElementById(id);
                if (link) {
                    var url = YoudaoUtils.generateResourceLink(css);
                    link.setAttribute("href", url)
                }
            }
        }, generateResourceLink: function (url) {
            var stamp = null;
            stamp = (new Date).getTime();
            return url.indexOf("?") === -1 ? url + "?" + stamp : url + "&" + stamp
        }, addClass: function (elem, className) {
            if (YoudaoUtils.isDOM(elem)) {
                var classes = elem.className.split(" ");
                for (var i = 0, l = classes.length; i < l; i++) {
                    if (className === classes[i]) {
                        return
                    }
                }
                classes.push(className);
                elem.className = classes.join(" ")
            }
        }, removeClass: function (elem, className) {
            if (YoudaoUtils.isDOM(elem)) {
                var classes = elem.className.split(" "), newClasses = [];
                for (var i = 0, l = classes.length; i < l; i++) {
                    if (className !== classes[i]) {
                        newClasses.push(classes[i])
                    }
                }
                elem.className = newClasses.join(" ")
            }
        }, toggleClass: function (elem, className) {
            if (YoudaoUtils.isDOM(elem)) {
                var classes = elem.className.split(" "), newClasses = [], action = "add";
                for (var i = 0, l = classes.length; i < l; i++) {
                    if (className === classes[i]) {
                        action = "remove"
                    } else {
                        newClasses.push(classes[i])
                    }
                }
                if (action === "add") {
                    classes.push(className)
                } else {
                    classes = newClasses
                }
                elem.className = classes.join(" ")
            }
        }, scroll: function () {
            return {
                left: document.body.scrollLeft || document.documentElement.scrollLeft,
                top: document.body.scrollTop || document.documentElement.scrollTop
            }
        }, windowSize: function () {
            return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight}
        }, storage: function (key, value) {
            var html5LocalStorage = function (key, value) {
                var store = window.localStorage;
                if (value === undefined) {
                    return store.getItem(key)
                }
                if (key !== undefined && value !== undefined) {
                    store.setItem(key, value);
                    return value
                }
            };
            var userdata = function (key, value) {
                var store = document.documentElement;
                store.addBehavior("#default#userData");
                if (value === undefined) {
                    store.load("youdao");
                    return store.getAttribute(key)
                }
                if (key !== undefined && value !== undefined) {
                    store.setAttribute(key, value);
                    store.save("youdao");
                    return value
                }
            };
            if (!!window.localStorage) {
                return html5LocalStorage(key, value)
            }
            if (!!document.documentElement.addBehavior) {
                return userdata(key, value)
            }
        }, cookie: function (name, value) {
            function setCookies(name, value) {
                var DAY = 30;
                var expire = new Date;
                expire.setTime(expire.getTime() + DAY * 24 * 60 * 60 * 1e3);
                document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expire.toGMTString()
            }

            function getCookies(name) {
                var a = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                if (a != null) {
                    return decodeURIComponent(a[2])
                } else {
                    return null
                }
            }

            if (!!value) {
                setCookies(name, value)
            } else {
                return getCookies(name)
            }
        }, parseData: function () {
            var parsers = {
                json: function (data) {
                    try {
                        return data = JSONYoudao.parse(data)
                    } catch (e) {
                        YoudaoUtils.log("[Error]", "Invalid JSON data:", data)
                    }
                }, xml: function (data) {
                    if (window.DOMParser) {
                        return (new DOMParser).parseFromString(data, "text/xml")
                    } else {
                        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                        xmlDoc.async = "false";
                        xmlDoc.loadXML(data);
                        return xmlDoc
                    }
                }
            };
            return function (type, data) {
                if (YoudaoUtils.isFunction(type)) {
                    return type(data)
                }
                if (typeof type !== "string") {
                    YoudaoUtils.log("[Error]", "Function parseData() encounters invalid type");
                    return data
                } else if (!parsers[type]) {
                    YoudaoUtils.log("[Error]", "Function parseData() dosen't support this type:", type);
                    return data
                } else {
                    return parsers[type](data)
                }
            }
        }(), guid: function () {
            var _S4 = function () {
                var float10 = (1 + Math.random()) * 65536;
                var int10 = float10 | 0;
                var str16 = int10.toString(16).substring(1);
                return str16
            };
            return _S4() + _S4() + "-" + _S4() + "-" + _S4() + "-" + _S4() + "-" + _S4() + _S4() + _S4()
        }()
    };
    window.YoudaoUtils = YoudaoUtils
})();
(function () {
    window.YoudaoSelector = {}
})();
(function (YD) {
    function Config() {
        var me = this;
        this.bindTo = null;
        this.backgroundImage = null;
        this.borderColor = "#8CA5C5";
        this.select = "on";
        this.translate = "on";
        this.title = "off";
        this.resize = "on";
        this.relatedUrl = YD.url();
        var widthSet = {origin: 0, full: 0, half: 0, query: 0, button: 64, result: 0};
        var heightSet = {origin: 0, full: 0, half: 0, top: 20, center: 0, query: 27, button: 23, result: 0};
        this.init = function (width, height) {
            var self = this;
            var fullWidth = parseInt(width.substring(0, width.indexOf("px")));
            var fullHeight = parseInt(height.substring(0, height.indexOf("px")));
            initInternal.call(self, fullWidth, fullHeight, true)
        };
        function initInternal(fullWidth, fullHeight, firstTime) {
            if (firstTime === true) {
                if (fullWidth < 240) widthSet.origin = 240; else widthSet.origin = fullWidth
            }
            if (fullWidth < 240) {
                fullWidth = 240
            }
            widthSet.full = fullWidth;
            var halfWidth = fullWidth % 2 === 0 ? fullWidth / 2 : (fullWidth - 1) / 2;
            widthSet.half = halfWidth;
            if (firstTime === true) {
                if (fullHeight < 180) heightSet.origin = 180; else heightSet.origin = fullHeight
            }
            if (this.title === "off") {
                if (fullHeight < 80) {
                    fullHeight = 80
                }
            } else {
                if (fullHeight < 100) {
                    fullHeight = 100
                }
            }
            heightSet.full = fullHeight;
            var halfHeight = fullHeight % 2 === 0 ? fullHeight / 2 : (fullHeight - 1) / 2;
            heightSet.half = halfHeight;
            var resultWidth = fullWidth - 3 * 2 - 1 * 2 - 5 * 2;
            widthSet.result = resultWidth;
            var centerHeight = fullHeight - heightSet.top;
            if (this.title === "off") {
                centerHeight = fullHeight
            }
            centerHeight = centerHeight - 3;
            heightSet.center = centerHeight;
            var resultHeight = centerHeight - 3 - 1 * 2;
            heightSet.result = resultHeight
        }

        this.reConfigByResultHeight = function (resultHeight) {
            var self = this;
            var fullHeight = heightSet.top + (3 * 2 + 1 * 2 + resultHeight);
            if (this.title === "off") {
                fullHeight = 3 * 2 + 1 * 2 + resultHeight
            }
            if (fullHeight > heightSet.origin) {
                fullHeight = heightSet.origin
            }
            if (fullHeight === heightSet.full) {
                return false
            } else {
                initInternal.call(self, widthSet.full, fullHeight, false);
                return true
            }
        };
        this.getWidth = function (name) {
            return widthSet[name]
        };
        this.getHeight = function (name) {
            return heightSet[name]
        }
    }

    window.YoudaoSelector.Config = new Config
})(YoudaoUtils);
(function (YD, config) {
    function UI() {
        var me = this;
        var wrapper = null;
        this.init = function (callback) {
            var self = this;
            wrapper = document.getElementById("YOUDAO_SELECTOR_WRAPPER");
            config.init(wrapper.style.width, wrapper.style.height);
            var bindTo = wrapper.getAttribute("bindTo");
            if (bindTo !== null) config.bindTo = bindTo;
            var borderColor = wrapper.getAttribute("borderColor");
            var backgroundImage = wrapper.getAttribute("backgroundImage");
            if (borderColor !== null) config.borderColor = borderColor;
            if (backgroundImage !== null) config.backgroundImage = backgroundImage;
            var iframe = createIframe();
            setTimeout(function () {
                try {
                    self.iframeDocument = iframe.contentDocument || iframe.contentWindow.document
                } catch (err) {
                    alert("由于该网页存在安全性限制, 无法加载有道翻译");
                    return
                }
                fillIframe(self.iframeDocument);
                self.resultDiv = initIframe(self.iframeDocument);
                applyConfig(self.iframeDocument, true);
                callback.call()
            }, 100)
        };
        function createIframe() {
            wrapper.innerHTML = '<iframe id="YOUDAO_SELECTOR_IFRAME" frameBorder="0" src="about:blank"></iframe>';
            var iframe = document.getElementById("YOUDAO_SELECTOR_IFRAME");
            YD.css(iframe, {
                "background-color": "white",
                border: "0",
                width: config.getWidth("full") + "px",
                height: config.getHeight("full") + "px"
            });
            if (YD.browser.msie) {
                if (document.domain != document.location.hostname) {
                    iframe.src = "<script>document.domain='" + document.domain + "'<\/script>"
                }
            }
            return iframe
        }

        function fillIframe(iframeDocument) {
            var srcStart = null;
            var srcEnd = "</head><body></body></html>";
            if (YD.browser.msie) {
                srcStart = "<!DOCTYPE html><html><head>" + '<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />' + '<link id="linkStyle" rel="stylesheet" type="text/css" href="javascript:void(0)" />'
            } else {
                srcStart = "<!DOCTYPE html><html><head>" + '<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>'
            }
            iframeDocument.open();
            iframeDocument.write(srcStart + srcEnd);
            iframeDocument.close()
        }

        function initIframe(iframeDocument) {
            var scss = "/styles/selector.css";
            var ccss = "/styles/common.css";
            var dcss = "/styles/dicter.css";
            var css = "http://shared.ydstatic.com/api/fanyi-web/assets/styles/global.css";
            if ("production") {
                if (YD.browser.msie) {
                    YD.loadCSSToLink(iframeDocument, "linkStyle", css)
                } else {
                    YD.loadCSS(iframeDocument, css)
                }
            } else {
                if (YD.browser.msie) {
                    YD.loadCSSToLink(iframeDocument, "linkStyle", ccss);
                    YD.loadCSSToLink(iframeDocument, "linkStyle", dcss);
                    YD.loadCSSToLink(iframeDocument, "linkStyle", scss)
                } else {
                    YD.loadCSS(iframeDocument, ccss);
                    YD.loadCSS(iframeDocument, dcss);
                    YD.loadCSS(iframeDocument, scss)
                }
            }
            var bgHtml = "";
            var topHtml = '                    <div id="youdaoDictTop">                        <div id="dictIcon" class="sprite"></div>                        <span id="dictTitle">有道翻译</span>                    </div>';
            if (config.title === "off") {
                topHtml = ""
            }
            iframeDocument.body.innerHTML = bgHtml + '                <div id="youdaoDictMain">' + topHtml + '                    <div id="youdaoDictCenter">                        <div id="result" class="no-x-scroll"></div>                    </div>                </div>';
            return iframeDocument.getElementById("result")
        }

        function applyConfig(iframeDocument, firstTime) {
            if (firstTime === false) {
                YD.css(wrapper, {width: config.getWidth("full") + "px", height: config.getHeight("full") + "px"});
                YD.css(document.getElementById("YOUDAO_SELECTOR_IFRAME"), {
                    width: config.getWidth("full") + "px",
                    height: config.getHeight("full") + "px"
                })
            }
            YD.css(iframeDocument.getElementById("youdaoDictMain"), {height: config.getHeight("full") + "px"});
            var top = iframeDocument.getElementById("youdaoDictTop");
            if (top !== null) {
                YD.css(iframeDocument.getElementById("youdaoDictTop"), {height: config.getHeight("top") + "px"})
            }
            YD.css(iframeDocument.getElementById("youdaoDictCenter"), {});
            YD.css(iframeDocument.getElementById("result"), {
                "border-color": config.borderColor,
                width: config.getWidth("result") + "px",
                height: config.getHeight("result") + "px"
            })
        }

        this.getSelectEventPos = function (e, target) {
            var self = this;
            var event = e || window.event;
            if (self.getSelectionText(target) === null) {
                return null
            }
            var pos = {};
            var x = 0;
            var y = 0;
            var scrollX = YD.scroll().left;
            var scrollY = YD.scroll().top;
            if (event.pageX || event.pageY) {
                x = event.pageX;
                y = event.pageY
            } else if (event.clientX || event.clientY) {
                x = event.clientX + scrollX;
                y = event.clientY + scrollY
            }
            pos.x = x;
            pos.y = y;
            return pos
        };
        this.getSelectionText = function (target) {
            var text = YD.getSelectionText();
            if (text === null || YD.trim(text) === "") {
                if (target.value !== undefined && target.selectionStart !== undefined) {
                    var start = target.selectionStart;
                    var end = target.selectionEnd;
                    if (start === end) {
                        return null
                    } else {
                        text = target.value.substring(start, end)
                    }
                } else {
                    return null
                }
            }
            return text
        };
        this.getSelectorPos = function (pos) {
            var x = pos.x;
            var y = pos.y;
            var scrollX = YD.scroll().left;
            var scrollY = YD.scroll().top;
            var windowWidth = YD.windowSize().width;
            if (x + 10 + config.getWidth("full") + 20 <= windowWidth + scrollX) {
                x += 10
            } else {
                x = windowWidth + scrollX - config.getWidth("full") - 20
            }
            if (y - 20 - config.getHeight("full") - 20 >= scrollY) {
                y = y - 20 - config.getHeight("full")
            } else {
                y += 20
            }
            pos.x = x;
            pos.y = y;
            return pos
        };
        this.tryResize = function (data) {
            if (config.resize !== "on")return;
            var iframeDocument = this.iframeDocument;
            var translation = iframeDocument.getElementById("translation");
            var translationHeight = translation === null ? 0 : 3 + data.translation.length * (18 + 3);
            var noResult = iframeDocument.getElementById("noResult");
            var noResultHeight = noResult === null ? 0 : 3 + (data.error === 10 ? 18 * 3 : 18) + 3;
            var copyright = iframeDocument.getElementById("copyright");
            var copyrightHeight = copyright === null ? 0 : 3 + 18;
            var title = iframeDocument.getElementById("title");
            var titleHeight = title === null ? 0 : 3 + 19 + 3;
            var basic = iframeDocument.getElementById("basic");
            var basicHeight = basic === null ? 0 : data.basic.explains.length * (18 + 3);
            var web = iframeDocument.getElementById("web");
            var webHeight = web === null ? 0 : (1 + Math.floor((data.web[0].value.length + 3) / 4)) * (18 + 3);
            var bottom = iframeDocument.getElementById("bottom");
            var bottomHeight = bottom === null ? 0 : 18 + 3;
            var resultHeight = translationHeight + noResultHeight + copyrightHeight + titleHeight + basicHeight + webHeight + bottomHeight;
            if (config.reConfigByResultHeight(resultHeight)) {
                applyConfig(iframeDocument, false)
            }
        };
        this.resize = function () {
            var YOUDAO_SELECTOR_IFRAME = document.getElementById("YOUDAO_SELECTOR_IFRAME");
            var YOUDAO_SELECTOR_WRAPPER = document.getElementById("YOUDAO_SELECTOR_WRAPPER");
            var innerWidth = YOUDAO_SELECTOR_IFRAME.contentDocument.getElementById("result").offsetWidth + 36;
            var innerHeight = YOUDAO_SELECTOR_IFRAME.contentDocument.getElementById("youdaoDictCenter").offsetHeight;
            YD.css(YOUDAO_SELECTOR_IFRAME, {width: innerWidth + "px", height: innerHeight + 2 + "px"});
            YD.css(YOUDAO_SELECTOR_WRAPPER, {width: innerWidth + "px", height: innerHeight + 2 + "px"})
        };
        this.show = function (pos) {
            YD.css(wrapper, {display: "block", position: "absolute", left: pos.x + "px", top: pos.y + "px"})
        };
        this.hide = function () {
            YD.css(wrapper, {display: "none"})
        }
    }

    window.YoudaoSelector.UI = new UI
})(YoudaoUtils, YoudaoSelector.Config);
(function (YD) {
    var dataRender = {
        renderTranslation: function (iframeDocument, resultDiv, data) {
            var translationResult = iframeDocument.createElement("div");
            translationResult.setAttribute("id", "translation");
            var header = iframeDocument.createElement("h3");
            header.className = "sub-item";
            header.appendChild(iframeDocument.createTextNode("有道翻译"));
            translationResult.appendChild(header);
            var translation = data.translation;
            for (var i = 0, l = translation.length; i < l; i++) {
                var p = iframeDocument.createElement("p");
                p.appendChild(iframeDocument.createTextNode(translation[i]));
                translationResult.appendChild(p)
            }
            resultDiv.appendChild(translationResult)
        }, renderError: function (iframeDocument, resultDiv, data) {
            var noResult = iframeDocument.createElement("div");
            noResult.setAttribute("id", "noResult");
            var error = iframeDocument.createElement("p");
            error.setAttribute("id", "error");
            var errorCode = data.errorCode;
            if (errorCode === 10) {
                error.appendChild(iframeDocument.createTextNode("抱歉，没有找到与您查询的“" + data.query + "”相符的内容："));
                noResult.appendChild(error);
                var ul = iframeDocument.createElement("ul");
                ul.setAttribute("id", "noResultTip");
                var li_0 = iframeDocument.createElement("li");
                li_0.appendChild(iframeDocument.createTextNode("请检查您的输入是否正确"));
                ul.appendChild(li_0);
                var li_1 = iframeDocument.createElement("li");
                li_1.appendChild(iframeDocument.createTextNode("或者使用有道专业翻译“"));
                var a = iframeDocument.createElement("a");
                a.setAttribute("href", "http://f.youdao.com/?path=fanyi&vendor=openapi.selector" + "&text=" + encodeURIComponent(data.query));
                a.setAttribute("target", "_blank");
                a.appendChild(iframeDocument.createTextNode(data.query));
                li_1.appendChild(a);
                li_1.appendChild(iframeDocument.createTextNode("”"));
                ul.appendChild(li_1);
                noResult.appendChild(ul)
            } else {
                var text = null;
                if (errorCode === 20) {
                    if (data.translation !== undefined) text = "输入文字不能超过200个字符！"; else text = "输入文字不能超过40个字符！"
                } else if (errorCode === 30) {
                    text = "服务器忙，请稍后再试！"
                } else if (errorCode === 40) {
                    text = "无法识别您输入文字的语言！"
                } else if (errorCode === 50) {
                    text = "该网站使用的有道翻译服务序列号无效，请联系网站管理人员解决！"
                } else {
                    text = "未知错误！"
                }
                error.appendChild(iframeDocument.createTextNode(text));
                noResult.appendChild(error)
            }
            resultDiv.appendChild(noResult)
        }, renderCopyRight: function (iframeDocument, resultDiv) {
            var header = iframeDocument.createElement("h3");
            header.setAttribute("id", "copyright");
            header.className = "sub-item";
            header.appendChild(iframeDocument.createTextNode("有道翻译"));
            resultDiv.appendChild(header)
        }, renderTitle: function (iframeDocument, resultDiv, data) {
            var title = iframeDocument.createElement("h2");
            title.setAttribute("id", "title");
            title.appendChild(iframeDocument.createTextNode(data.query));
            resultDiv.appendChild(title)
        }, renderBasicResult: function (iframeDocument, resultDiv, data) {
            var title = iframeDocument.getElementById("title");
            var basic = data.basic;
            var phonetic = basic.phonetic;
            if (phonetic !== undefined) {
                var phoneticElement = iframeDocument.createElement("span");
                phoneticElement.setAttribute("id", "phonetic");
                phoneticElement.appendChild(iframeDocument.createTextNode("[" + phonetic + "]"));
                title.appendChild(phoneticElement)
            }
            var basicResult = iframeDocument.createElement("div");
            basicResult.setAttribute("id", "basic");
            for (var i = 0, l = basic.explains.length; i < l; i++) {
                var ex = basic.explains[i];
                var exElement = iframeDocument.createElement("p");
                exElement.appendChild(iframeDocument.createTextNode(ex));
                basicResult.appendChild(exElement)
            }
            resultDiv.appendChild(basicResult)
        }, renderWebResult: function (iframeDocument, resultDiv, data) {
            var webResult = iframeDocument.createElement("div");
            webResult.setAttribute("id", "web");
            var header = iframeDocument.createElement("h3");
            header.className = "sub-item";
            header.appendChild(iframeDocument.createTextNode("网络释义"));
            webResult.appendChild(header);
            var web = data.web[0];
            var detail = iframeDocument.createElement("p");
            for (var i = 0, l = web.value.length; i < l; i++) {
                if (i > 0) {
                    var split = iframeDocument.createElement("span");
                    split.className = "split";
                    detail.appendChild(split)
                }
                var item = iframeDocument.createElement("span");
                item.className = "web-item";
                item.appendChild(iframeDocument.createTextNode(web.value[i]));
                detail.appendChild(item)
            }
            webResult.appendChild(detail);
            resultDiv.appendChild(webResult)
        }, renderMore: function (iframeDocument, data) {
            var title = iframeDocument.getElementById("title");
            var more = iframeDocument.createElement("a");
            more.setAttribute("id", "more");
            more.setAttribute("href", "http://dict.youdao.com/search?keyfrom=selector" + "&q=" + encodeURIComponent(data.query));
            more.setAttribute("target", "_blank");
            more.setAttribute("hideFocus", "true");
            more.appendChild(iframeDocument.createTextNode("详细 >"));
            title.appendChild(more)
        }, renderBottom: function (iframeDocument, resultDiv, data) {
            var bottom = iframeDocument.createElement("p");
            bottom.setAttribute("id", "bottom");
            bottom.className = "has-layout";
            var download = iframeDocument.createElement("a");
            download.setAttribute("id", "download");
            download.className = "bottom-link";
            download.setAttribute("href", "http://cidian.youdao.com/?keyfrom=dictapi.selector");
            download.setAttribute("target", "_blank");
            download.appendChild(iframeDocument.createTextNode("下载有道词典"));
            bottom.appendChild(download);
            var search = iframeDocument.createElement("a");
            search.setAttribute("id", "search");
            search.className = "bottom-link";
            search.setAttribute("href", "http://f.youdao.com/?path=fanyi&vendor=openapi.selector" + "&text=" + encodeURIComponent(data.query));
            search.setAttribute("target", "_blank");
            search.appendChild(iframeDocument.createTextNode("获取人工翻译"));
            bottom.appendChild(search);
            resultDiv.appendChild(bottom)
        }
    };
    window.YoudaoSelector.DataRender = dataRender
})(YoudaoUtils);
(function (YD, config, ui, dataRender) {
    function YoudaoSelector() {
        var me = this;
        var iframeDocument = null;
        var resultDiv = null;
        var lastQuery = null;
        var currentPos = {};

        function init() {
            ui.init(afterUi)
        }

        function afterUi() {
            iframeDocument = ui.iframeDocument;
            resultDiv = ui.resultDiv;
            if (config.bindTo !== null) {
                var targets = config.bindTo.split(":");
                for (var i = 0, l = targets.length; i < l; i++) {
                    YD.bind(document.getElementById(targets[i]), "mouseup", handleSelectEvent)
                }
            } else {
                YD.bind(document.body, "mouseup", handleSelectEvent)
            }
            YD.bind(document.body, "mousedown", ui.hide);
            initSwitcher()
        }

        var titleWhenOn = "点击关闭有道翻译划词功能";
        var titleWhenOff = "点击打开有道翻译划词功能";

        function initSwitcher() {
            var switcher = document.getElementById("YOUDAO_FANYIAPI_SWITCHER");
            if (switcher !== null) {
                switcher.setAttribute("status", "off");
                switcher.setAttribute("title", titleWhenOff);
                YD.css(switcher, {
                    margin: 0,
                    border: 0,
                    padding: 0,
                    backgroundImage: "url(@DICT_RESOURCE_URL_PREFIX@/1.0/switcher.png)",
                    width: "20px",
                    height: "40px",
                    cursor: "pointer"
                });
                config.select = "off";
                YD.bind(switcher, "click", function () {
                    var status = switcher.getAttribute("status");
                    if (status === "on") {
                        YD.css(switcher, {backgroundPosition: "0 0"});
                        switcher.setAttribute("status", "off");
                        switcher.setAttribute("title", titleWhenOff);
                        config.select = "off"
                    } else {
                        YD.css(switcher, {backgroundPosition: "-20px 0"});
                        switcher.setAttribute("status", "on");
                        switcher.setAttribute("title", titleWhenOn);
                        config.select = "on"
                    }
                })
            }
        }

        this.update = function (data) {
            var pos = currentPos;
            if (data.errorCode !== 0) {
                dataRender.renderError(iframeDocument, resultDiv, data)
            } else if (data.basic === undefined && data.web === undefined) {
                dataRender.renderTranslation(iframeDocument, resultDiv, data)
            } else {
                if (config.title === "off") {
                    dataRender.renderCopyRight(iframeDocument, resultDiv)
                }
                dataRender.renderTitle(iframeDocument, resultDiv, data);
                if (data.basic !== undefined) {
                    dataRender.renderBasicResult(iframeDocument, resultDiv, data)
                }
                if (data.web !== undefined) {
                    dataRender.renderWebResult(iframeDocument, resultDiv, data)
                }
                dataRender.renderMore(iframeDocument, data)
            }
            ui.tryResize(data);
            pos = ui.getSelectorPos(pos);
            ui.show(pos);
            ui.resize();
            resultDiv.scrollTop = 0
        };
        this.updateTranslate = function (data) {
            var pos = currentPos;
            if (data.errorCode !== 0) {
                dataRender.renderError(iframeDocument, resultDiv, data)
            } else {
                dataRender.renderTranslation(iframeDocument, resultDiv, data)
            }
            ui.tryResize(data);
            pos = ui.getSelectorPos(pos);
            ui.show(pos);
            ui.resize();
            resultDiv.scrollTop = 0
        };
        init();
        function handleSelectEvent(e) {
            var self = this;
            var pos = ui.getSelectEventPos(e, self);
            if (pos == null) {
                return
            }
            setTimeout(function () {
                selectTrans(pos, self)
            }, 10)
        }

        function selectTrans(pos, target) {
            if (config.select !== "on") {
                return
            }
            var q = ui.getSelectionText(target);
            if (q === null) {
                return
            }
            q = YD.trim(q);
            if (q === "") {
            } else {
                if (q.length > 200) {
                } else if (q.length > 40) {
                    if (config.translate === "on") {
                        currentPos = pos;
                        executeTranslate(q)
                    }
                } else {
                    currentPos = pos;
                    execute(q)
                }
            }
        }

        function translate(e) {
        }

        function execute(q) {
            clear();
            var callback = "YoudaoSelector.Instance.update";
            var e = document.createElement("script");
            e.setAttribute("type", "text/javascript");
            e.setAttribute("src", "http://fanyi.youdao.com/openapi.do?type=data&doctype=jsonp&version=1.1&" + YD.parameter({
                    relatedUrl: config.relatedUrl,
                    keyfrom: "fanyiweb",
                    key: "null",
                    callback: callback,
                    translate: config.translate,
                    q: q,
                    ts: (new Date).getTime()
                }));
            e.setAttribute("charset", "utf-8");
            var parent = document.getElementsByTagName("head")[0] || document.body;
            parent.appendChild(e)
        }

        function executeTranslate(q) {
            clear();
            var callback = "YoudaoSelector.Instance.updateTranslate";
            var e = document.createElement("script");
            e.setAttribute("type", "text/javascript");
            e.setAttribute("src", "http://fanyi.youdao.com/openapi.do?type=data&only=on&doctype=jsonp&version=1.1&" + YD.parameter({
                    relatedUrl: config.relatedUrl,
                    keyfrom: "fanyiweb",
                    key: "null",
                    callback: callback,
                    q: q,
                    ts: (new Date).getTime()
                }));
            e.setAttribute("charset", "utf-8");
            var parent = document.getElementsByTagName("head")[0] || document.body;
            parent.appendChild(e)
        }

        function clear() {
            var children = resultDiv.childNodes;
            for (var i = children.length - 1; i >= 0; i--) {
                resultDiv.removeChild(children[i])
            }
        }
    }

    window.YoudaoSelector.Instance = new YoudaoSelector
})(YoudaoUtils, YoudaoSelector.Config, YoudaoSelector.UI, YoudaoSelector.DataRender);
