'use strict';
(function (global) {
    /**
     * @param {!Object} definition
     * @param {string} settings
     * @return {?}
     */
    function Parser(definition, settings) {
        if (this.seed instanceof Parser) {
            this.seed.init(definition, settings);
        } else {
            if (this instanceof Parser) {
                this.init(definition, settings);
            } else {
                this.seed = new Parser(definition, settings);
            }
        }
        return this.seed;
    }
    /**
     * @param {?} url
     * @return {undefined}
     */
    function NGWebSocket(url) {
        this.appnm = url;
        this.sendQueue = {};
    }
    /**
     * @param {string} text
     * @param {string} container
     * @return {undefined}
     */
    function init(text, container) {
        /** @type {!Array} */
        this.batchs = [];
        /** @type {string} */
        this.project = "Yoda-FE";
        /** @type {number} */
        this.catVersion = 1;
        /** @type {string} */
        this.origin = window.location.origin;
        this.unionId = text || "";
        /** @type {string} */
        this.env = "pro" === container ? "pro" : "dev";
        this.host = {
            pro: "//catfront.dianping.com",
            dev: "//catfront.51ping.com"
        }[this.env];
        var domsync = this;
        setTimeout(function () {
            domsync.sendBatch();
        }, 500);
    }
    /**
     * @param {string} name
     * @param {string} data
     * @param {!Function} callback
     * @return {undefined}
     */
    function request(name, data, callback) {
        if ("object" === typeof data) {
            /** @type {!Array} */
            var headers = [];
            var i;
            for (i in data) {
                headers.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
            }
            /** @type {string} */
            data = headers.join("&");
        }
        headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        try {
            /** @type {number} */
            var C = Date.now();
            var xhr = new global.XMLHttpRequest;
            if ("withCredentials" in xhr) {
                xhr.open("post", name, true);
                if (headers) {
                    var header;
                    for (header in headers) {
                        if (headers.hasOwnProperty(header)) {
                            xhr.setRequestHeader(header, headers[header]);
                        }
                    }
                }
                /**
                 * @return {undefined}
                 */
                xhr.onload = function () {
                    if (4 === xhr.readyState && (200 <= xhr.status && 300 > xhr.status || 304 === xhr.status)) {
                        callback(xhr.responseText);
                        /** @type {null} */
                        xhr = null;
                    }
                };
            } else {
                if ("undefined" !== typeof global.XDomainRequest) {
                    xhr = new global.XDomainRequest;
                    /** @type {string} */
                    var time = 0 < name.indexOf("?") ? "&" + data : "?" + data;
                    xhr.open("get", name + time);
                    /**
                     * @return {undefined}
                     */
                    xhr.onload = function () {
                        callback(xhr.responseText);
                        /** @type {null} */
                        xhr = null;
                    };
                } else {
                    throw Error("\u79cd\u5b50\u4ee3\u7801\u521b\u5efaXMLHttpRequest\u5bf9\u8c61\u5931\u8d25");
                }
            }
            /**
             * @param {!Object} b
             * @return {undefined}
             */
            xhr.onerror = function (b) {
                xhr.abort();
                throw Error("XMLHttpRequest\u8bf7\u6c42\u670d\u52a1\u5668\u53d1\u751f\u5f02\u5e38" + b.message);
            };
            xhr.send(data);
        } catch (that) {
            throw window.Yoda.CAT.postBatch(name, 0, 0, Date.now() - C, "500|0", "ajax"), window.Yoda.CAT.sendBatch(), window.Yoda.CAT.sendLog(name, "ajaxError", "[\u8bf7\u6c42\u5f02\u5e38]", that.message), Error("\u8bf7\u6c42\u670d\u52a1\u5668\u53d1\u751f\u5f02\u5e38: " + that.message);
        }
    }
    /**
     * @param {!Object} context
     * @param {!Object} params
     * @return {?}
     */
    function wrap(context, params) {
        var key;
        for (key in params) {
            if (params.hasOwnProperty(key) && params[key]) {
                context[key] = params[key];
            }
        }
        return context;
    }
    /** @type {!HTMLDocument} */
    var doc = document;
    /** @type {boolean} */
    var b = /mobile|iPhone|Android|htc|Lenovo|huawei/i.test(global.navigator.userAgent.toString());
    global.Yoda = {};
    global.YODA_CONFIG = {};
    var that = new NGWebSocket("yoda_seed");
    global.Yoda.LX = that;
    var GRUNT_TASKS_BUILD = {
        pro: "https://verify.meituan.com",
        staging: "//verify-test.meituan.com",
        dev: "//verify.inf.dev.sankuai.com",
        test: "//verify.inf.test.sankuai.com",
        ppe: "//verify.inf.ppe.sankuai.com",
        development: "//verify-test.meituan.com"
    };
    /** @type {string} */
    var cloneOverviewParamArray = "";
    /** @type {string} */
    var $handle = "";
    /** @type {string} */
    var $constraint = "";
    /** @type {string} */
    var c = "";
    /** @type {string} */
    var v = "";
    /** @type {string} */
    var name = "";
    /** @type {string} */
    var id = "";
    /** @type {string} */
    var script = "";
    /** @type {string} */
    var root = "";
    /** @type {string} */
    var obj = "";
    /** @type {string} */
    var value = "";
    /** @type {string} */
    var key = "";
    /**
     * @param {!Object} options
     * @param {string} env
     * @return {undefined}
     */
    Parser.prototype.init = function (options, env) {
        /** @type {number} */
        cloneOverviewParamArray = Date.now();
        /** @type {boolean} */
        $constraint = $handle = false;
        /** @type {boolean} */
        v = c = true;
        /** @type {string} */
        key = value = obj = root = script = id = name = "";
        this.env = env || "pro";
        var multiCompletion = new init(options.requestCode, this.env);
        global.Yoda.CAT = multiCompletion;
        /** @type {!Object} */
        this.options = options;
        b = void 0 === options.isMobile ? b : options.isMobile;
        /** @type {string} */
        this.feVersion = "1.4.0";
        /** @type {number} */
        this.source = b ? 3 : 1;
        this.getConf(this.options.requestCode);
    };
    /**
     * @param {!Object} args
     * @return {undefined}
     */
    Parser.prototype.getConf = function (args) {
        var b = GRUNT_TASKS_BUILD[this.env] + "/v2/ext_api/page_data";
        args = {
            requestCode: args,
            feVersion: this.feVersion,
            source: this.source
        };
        var pageOptimizer = this;
        /** @type {number} */
        var d = Date.now();
        request(b, args, function (data) {
            /** @type {*} */
            data = JSON.parse(data);
            /** @type {number} */
            var newChartRight = Date.now() - d;
            var params = {
                kvs: {
                    pagedata: [newChartRight],
                    TTFB: [newChartRight]
                },
                tags: {
                    action: data.data ? data.data.action : "",
                    type: data.data ? data.data.type : "",
                    result: data.status ? data.status : ""
                },
                ts: Date.now()
            };
            window.Yoda.CAT.metric(params);
            window.Yoda.CAT.postBatch(b, 0, 0, newChartRight, "200|" + data.status, "ajax");
            pageOptimizer.confBack(data);
        });
    };
    /**
     * @param {!Object} options
     * @return {undefined}
     */
    Parser.prototype.confBack = function (options) {
        if (1 === options.status && options.data) {
            var defaults = wrap(options.data, this.options);
            this.config = defaults;
            if (!this._yoda_config) {
                /** @type {string} */
                this._yoda_config = JSON.stringify(defaults);
                /** @type {string} */
                this._yoda_options = JSON.stringify(this.options);
                this._yoda_listIndex = options.data.defaultIndex || 0;
                this._yoda_riskLevel = this.config.riskLevel;
            }
            this.config.category = this.config.isHideSwitch ? "MULTIPLE" : this.config.category;
            defaults = options.data.yodaVersion;
            options = options.data.verifyMethodVersion;
            this.filter();
            this.ensureVersion(defaults, options);
        } else {
            global.Yoda.CAT.sendLog(GRUNT_TASKS_BUILD[this.env] + "/v2/ext_api/page_data", "jsError", "[dataException]:\u8bf7\u6c42pageData\u63a5\u53e3\u672a\u6b63\u5e38\u8fd4\u56de\u6570\u636e, \u73af\u5883\u4fe1\u606f\u4e3a:" + this.source, JSON.stringify(options));
            this.handleError(options);
        }
    };
    /**
     * @param {!Object} a
     * @param {!Object} opts
     * @return {undefined}
     */
    Parser.prototype.ensureVersion = function (a, opts) {
        /** @type {*} */
        a = JSON.parse(a);
        /** @type {*} */
        opts = JSON.parse(opts);
        if (a) {
            key = b ? a.i : a.d;
        }
        try {
            var snippet = JSON.parse(this.config.riskLevelInfo)[Number(id)];
            name = JSON.parse(snippet).name;
            if (opts = JSON.parse(opts[name])) {
                value = b ? opts.i : opts.d;
            }
            this.isNeedLoad();
            this.getSourcePath();
            this.loadSource();
        } catch (that) {
            global.Yoda.CAT.sendLog(GRUNT_TASKS_BUILD[this.env] + "/v2/ext_api/page_data", "jsError", "[dataException]:\u89e3\u6790pageData\u63a5\u53e3\u6570\u636e\u5931\u8d25, \u73af\u5883\u4fe1\u606f\u4e3a:" + this.source, that.message);
            this.handleError("\u521d\u59cb\u5316\u5931\u8d25");
        }
    };
    /**
     * @return {undefined}
     */
    Parser.prototype.isNeedLoad = function () {
        /** @type {!NodeList<Element>} */
        var allScripts = doc.getElementsByTagName("script");
        /** @type {number} */
        var index = allScripts.length;
        /** @type {number} */
        var i = 0;
        if (key && value && index) {
            for (; i < index; i++) {
                var current = allScripts[i].src;
                if (~current.indexOf(key)) {
                    /** @type {boolean} */
                    c = false;
                    /** @type {boolean} */
                    $constraint = true;
                }
                if (~current.indexOf(value)) {
                    /** @type {boolean} */
                    v = false;
                    /** @type {boolean} */
                    $handle = true;
                }
                if (!c && !v) {
                    break;
                }
            }
        }
    };
    /**
     * @return {undefined}
     */
    Parser.prototype.loadSource = function () {
        var service = this;
        var _self = function () {
            /**
             * @param {string} tag
             * @return {?}
             */
            function init(tag) {
                return function (error, val, onready) {
                    /** @type {number} */
                    var startTime = Date.now();
                    /** @type {!Element} */
                    var e = doc.createElement(tag);
                    /** @type {(HTMLHeadElement|null)} */
                    var cursor = doc.head;
                    /** @type {string} */
                    var key = "src";
                    /** @type {string} */
                    var type = "link" === tag ? "css" : "js";
                    /**
                     * @return {undefined}
                     */
                    e.onload = function () {
                        /** @type {null} */
                        e = e.onload = e.onerror = e.onreadystatechange = null;
                        /** @type {number} */
                        var touchTime = Date.now() - startTime;
                        if ("script" === tag) {
                            that.report(val, "duration", {
                                custom: {
                                    duration: touchTime,
                                    result: "download",
                                    requestCode: service.options.requestCode
                                }
                            });
                        }
                        global.Yoda.CAT.postBatch(error, 0, 0, touchTime, "200|", type);
                        if ("function" === typeof onready) {
                            onready();
                        }
                        if ("pro" !== service.env) {
                            global.YODA_CONFIG.__API_URL__ = GRUNT_TASKS_BUILD[service.env];
                            service.setDomain(GRUNT_TASKS_BUILD[service.env]);
                        }
                    };
                    /**
                     * @return {undefined}
                     */
                    e.onerror = function () {
                        service.handleError("\u52a0\u8f7d\u5931\u8d25");
                        /** @type {number} */
                        var touchTime = Date.now() - startTime;
                        global.Yoda.CAT.postBatch(error, 0, 0, touchTime, "500|", type);
                        that.report(val, "downloadFailed");
                        global.Yoda.CAT.sendLog(error, "resourceError", "downloadFailed", "[\u4e0b\u8f7djs\u5931\u8d25]:" + error);
                    };
                    switch (tag) {
                        case "script":
                            /** @type {string} */
                            e.type = "text/javascript";
                            /** @type {boolean} */
                            e.async = false;
                            /** @type {boolean} */
                            e.defer = true;
                            break;
                        case "link":
                            /** @type {string} */
                            e.type = "text/css";
                            /** @type {string} */
                            e.rel = "stylesheet";
                            /** @type {string} */
                            key = "href";
                    }
                    /** @type {string} */
                    e[key] = error;
                    cursor.appendChild(e);
                };
            }
            return {
                css: init("link"),
                js: init("script")
            };
        }();
        if (c) {
            that.report("yoda", "req");
            _self.js(root, "yoda", function () {
                /** @type {boolean} */
                $constraint = !$constraint;
                service.moduleInit();
            });
        }
        if (v) {
            if (that.report(name, "req"), "withCredentials" in new global.XMLHttpRequest) {
                _self.js(script, name, function () {
                    /** @type {boolean} */
                    $handle = true;
                    service.moduleInit();
                });
            } else {
                if ("undefined" !== typeof XDomainRequest) {
                    var slideshowtimer = window.setInterval(function () {
                        if (void 0 !== window.Yoda.Ballade) {
                            _self.js(script, name, function () {
                                /** @type {boolean} */
                                $handle = true;
                                service.moduleInit();
                                window.clearInterval(slideshowtimer);
                            });
                        }
                    }, 1E3);
                }
            }
        }
        if (!(c || v)) {
            this.moduleInit();
        }
        if (obj) {
            _self.css(obj);
        }
    };
    /**
     * @return {?}
     */
    Parser.prototype.moduleInit = function () {
        if ($handle && $constraint) {
            this[name] = {};
            this.config.yodaInitTime = cloneOverviewParamArray;
            if ("function" === typeof global.Yoda[name]) {
                return this[name].initModule = new global.Yoda[name](this.config), false;
            }
            /** @type {!Element} */
            var script = doc.createElement("script");
            /** @type {string} */
            script.type = "text/javascript";
            script.appendChild(doc.createTextNode(this.moduleText));
            doc.body.appendChild(script);
            this[name].initModule = new global.Yoda[name](this.config);
        }
    };
    /**
     * @return {undefined}
     */
    Parser.prototype.getSourcePath = function () {
        /** @type {string} */
        var k = b ? "i" : "d";
        /** @type {string} */
        key = key ? key + "." : "";
        /** @type {string} */
        value = value ? value + "." : "";
        if ("development" === this.env) {
            /** @type {string} */
            k = "i" === k ? "mobile" : "desktop";
            /** @type {string} */
            script = "/modules/" + name + "/" + k + "/" + name + ".js";
            /** @type {string} */
            obj = "/modules/" + name + "/" + k + "/" + name + ".css";
            /** @type {string} */
            root = "./yoda-" + k + ".js";
        } else {
            /** @type {string} */
            root = "https://static.meituan.net/bs/yoda-static/file:file/" + k + "/js/yoda." + key + "js";
            /** @type {string} */
            script = "https://static.meituan.net/bs/yoda-static/file:file/" + k + "/js/" + name + "." + value + "js";
        }
    };
    /**
     * @param {string} method
     * @param {string} data
     * @return {undefined}
     */
    Parser.prototype.handleError = function (method, data) {
        if ("string" !== typeof method) {
            method = (data = method) && data.error && data.error.message;
        }
        var type = this.options.failCallbackFun;
        if (type && "function" === typeof global[type]) {
            var result = {
                code: "121333",
                requestCode: this.options.requestCode
            };
            setTimeout(function () {
                global[type](result);
            }, 1E3);
        }
        var e = this.options.failCallbackUrl;
        if (e) {
            setTimeout(function () {
                /** @type {!Element} */
                var a = document.createElement("a");
                a.href = e;
                global.location.href = (a.origin || a.protocol + "//" + a.host) + a.pathname + a.search + a.hash;
            }, 1E3);
        }
        this.notifyErr(method);
    };
    /**
     * @param {string} name
     * @return {undefined}
     */
    Parser.prototype.notifyErr = function (name) {
        /** @type {(Element|null)} */
        var templateOrFragment = doc.getElementById(this.options.root);
        if (b) {
            /** @type {!Element} */
            var c = doc.createElement("div");
            /** @type {!Element} */
            var d = doc.createElement("div");
            /** @type {string} */
            d.innerHTML = name;
            c.appendChild(d);
        } else {
            /** @type {!Element} */
            c = doc.createElement("div");
            /** @type {string} */
            c.innerHTML = name;
        }
        templateOrFragment.appendChild(c);
    };
    /**
     * @param {?} opt_decode
     * @return {undefined}
     */
    Parser.prototype.setDomain = function (opt_decode) {
        setTimeout(function () {
            window.YODA_CONFIG.__API_URL__ = opt_decode;
        }, 0);
    };
    /**
     * @param {!Object} b
     * @return {undefined}
     */
    Parser.prototype.resetVariable = function (b) {
        /** @type {number} */
        cloneOverviewParamArray = Date.now();
        $handle = b.moduleLoaded || false;
        $constraint = b.yodaLoaded || false;
        c = b.yodaNeedLoad || true;
        v = b.moduleNeedLoad || true;
        name = b.MODULE_NAME || "";
        script = b.MODULE_URL || "";
        root = b.YODA_URL || "";
        obj = b.CSS_URL || "";
        value = b.MODULE_VERSION || "";
        key = b.YODA_VERSION || "";
    };
    /**
     * @return {undefined}
     */
    Parser.prototype.filter = function () {
        var args = this.config.riskLevel.split(/[,|]/g);
        if (args[0] && 1 === args.length) {
            id = this.config.riskLevel;
        } else {
            /** @type {*} */
            args = JSON.parse(this.config.riskLevelInfo);
            /** @type {*} */
            var dupes = JSON.parse(this.config.verifyMethodVersion);
            var row = this.config.riskLevel.split("|");
            var CR_index = this.config.defaultIndex || 0;
            for (; CR_index < row.length; CR_index++) {
                var itemIds = row[CR_index].split(",");
                /** @type {number} */
                var i = 0;
                /** @type {number} */
                var h = 1;
                for (; i < itemIds.length; i++) {
                    /** @type {*} */
                    var obj = JSON.parse(args[Number(itemIds[i])]);
                    if (!obj.name || !dupes[obj.name]) {
                        /** @type {number} */
                        h = 0;
                        break;
                    }
                }
                if (h) {
                    id = itemIds[0];
                    this._yoda_listIndex = CR_index;
                    break;
                }
            }
        }
    };
    /**
     * @param {!Object} s
     * @param {string} obj
     * @param {?} color
     * @return {?}
     */
    NGWebSocket.prototype.report = function (s, obj, color) {
        if ("pro" !== window.seed.env) {
            return false;
        }
        var imageData = {
            appnm: this.appnm,
            channel: "techportal",
            ct: b ? "i" : "www",
            ch: "web",
            sc: window.screen.width + "*" + window.screen.height,
            ua: window.navigator.userAgent
        };
        s = {
            nm: "MV",
            tm: Date.now(),
            nt: 0,
            isauto: 6,
            val_cid: s,
            val_bid: obj,
            val_lab: color
        };
        this.addToSendQueue(imageData, s);
    };
    /**
     * @param {!Object} name
     * @param {!Object} argument
     * @return {undefined}
     */
    NGWebSocket.prototype.addToSendQueue = function (name, argument) {
        var message;
        if (message = this.sendQueue[name.channel]) {
            message = message.data;
        } else {
            /** @type {!Array} */
            message = [];
            this.sendQueue[name.channel] = {
                conf: name,
                data: message
            };
        }
        message.push(argument);
        var oAuthAdapter = this;
        setTimeout(function () {
            oAuthAdapter.send();
        }, 0);
    };
    /**
     * @return {undefined}
     */
    NGWebSocket.prototype.send = function () {
        /** @type {!Array} */
        var array = [];
        for (name in this.sendQueue) {
            if (this.sendQueue.hasOwnProperty(name)) {
                var data = this.sendQueue[name];
                var c = data.conf;
                if (data = wrap(c, {
                    appnm: c.appnm,
                    category: "data_sdk_" + name,
                    evs: data.data
                })) {
                    array.push(data);
                }
            }
        }
        if (0 < array.length) {
            /** @type {string} */
            var name = "https://report.meituan.com/?_lxskd_rnd=" + Date.now() + Math.ceil(1E3 * Math.random());
            this.sendStatic(name, {
                data: array
            });
        }
        this.sendQueue = {};
    };
    /**
     * @param {string} path
     * @param {!Object} response
     * @return {?}
     */
    NGWebSocket.prototype.sendStatic = function (path, response) {
        if (0 === response.data.length) {
            return false;
        }
        try {
            var xhr = new global.XMLHttpRequest;
            if ("withCredentials" in xhr) {
                xhr.open("POST", path, true);
            } else {
                if ("undefined" !== typeof global.XDomainRequest) {
                    xhr = new global.XDomainRequest;
                    xhr.open("POST", path);
                } else {
                    throw Error("\u7075\u7280\u521b\u5efaXHR\u5bf9\u8c61\u5931\u8d25");
                }
            }
            /**
             * @return {undefined}
             */
            xhr.onerror = function () {
                xhr.abort();
                /** @type {null} */
                xhr = null;
            };
            xhr.send(JSON.stringify(response.data));
        } catch (controlFlowAction) {
            throw Error("\u7075\u7280XHR\u8bf7\u6c42\u670d\u52a1\u5668\u53d1\u751f\u5f02\u5e38: " + controlFlowAction.message);
        }
        return true;
    };
    /**
     * @param {string} item
     * @param {number} trigger
     * @param {number} reqArgs
     * @param {number} touchTime
     * @param {string} argUrl
     * @param {string} params
     * @return {undefined}
     */
    init.prototype.postBatch = function (item, trigger, reqArgs, touchTime, argUrl, params) {
        /** @type {string} */
        item = item + "\t" + Date.now() + "\t" + trigger + "\t" + reqArgs + "\t" + touchTime + "\t" + this.project + "\t" + this.origin + "\t" + argUrl + "\t\t\t\t" + params;
        this.batchs.push(item);
    };
    /**
     * @return {undefined}
     */
    init.prototype.sendBatch = function () {
        if (0 < this.batchs.length) {
            /** @type {string} */
            var TMP_FILENAME = this.host + "/api/batch?v=" + this.catVersion;
            var res = {
                c: "S\t\t\t\t\t\t" + this.unionId + "\n" + this.batchs.join("\n")
            };
            this.sendStatic(TMP_FILENAME, res);
            /** @type {!Array} */
            this.batchs = [];
        }
    };
    /**
     * @param {string} speed
     * @param {string} easing
     * @return {undefined}
     */
    init.prototype.speed = function (speed, easing) {
        /** @type {string} */
        var id = "&project=" + this.project + "&pageurl=" + window.location.href + "&unionId=" + this.unionId + "&timestamp=" + Date.now() + "&speed=" + speed + "&customspeed=" + easing;
        /** @type {string} */
        id = this.host + "/api/speed?v=" + this.catVersion + id;
        var jQuery = this;
        var client = new global.XMLHttpRequest;
        client.open("GET", id);
        /**
         * @return {undefined}
         */
        client.onerror = function () {
            jQuery.speed(speed, easing);
            client.abort();
            /** @type {null} */
            client = null;
        };
        client.send();
    };
    /**
     * @param {string} state
     * @param {string} type
     * @param {string} context
     * @param {string} fullName
     * @return {undefined}
     */
    init.prototype.sendLog = function (state, type, context, fullName) {
        /** @type {!Array} */
        state = [{
            project: this.project,
            pageUrl: window.location.origin,
            resourceUrl: state || "",
            category: type,
            sec_category: context,
            level: "error",
            unionId: this.unionId,
            timestamp: Date.now(),
            content: fullName || ""
        }];
        this.sendStatic(this.host + "/api/log?v=" + this.catVersion, {
            c: JSON.stringify(state)
        });
    };
    /**
     * @param {?} a
     * @return {undefined}
     */
    init.prototype.metric = function (a) {
        this.sendStatic(this.host + "/api/metric?v=" + this.catVersion + "&p=" + this.project, {
            data: JSON.stringify(a)
        });
    };
    /**
     * @param {string} path
     * @param {string} response
     * @return {?}
     */
    init.prototype.sendStatic = function (path, response) {
        request(path, response, function () {
        });
        return true;
    };
    /**
     * @param {string} a
     * @return {?}
     */
    init.prototype["byte"] = function (a) {
        /** @type {number} */
        var val = 0;
        var startLen = a.length;
        if (a) {
            /** @type {number} */
            var j = 0;
            for (; j < startLen; j++) {
                if (255 < a.charCodeAt(j)) {
                    /** @type {number} */
                    val = val + 2;
                } else {
                    val++;
                }
            }
            return val;
        }
        return 0;
    };
    /** @type {function(!Object, string): ?} */
    global.YodaSeed = Parser;
})(window);
