webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(avalon) {// require('avalon2');
	// require('mmRouter');
	__webpack_require__(2);
	var root = avalon.define({
		$id:'app',
		contents:"hello!here is about",
		alert:'test',
		currPath:'',
		currPage:''
	})
	var states = {};
	
	function addState(path, vm, html) {
	    states[path] = {
	        vm: vm,
	        html: html
	    }
	}
	avalon.component('ms-view', {
	    template: '<div ms-html="@page" class="ms-view"></div>',
	    defaults: {
	        page: '&nbsp;',
	        path: 'no',
	        onReady: function(e) {
	            var path = e.vmodel.path;
	            var state = states[path];
	            console.log(states,'ffffff')
	            avalon.vmodels[state.vm.$id] = state.vm;
	            avalon.vmodels[state.vm.$id].init();
	            setTimeout(function() {//必须等它扫描完这个template,才能替换
	                e.vmodel.page = state.html
	            },100)
	        },
	        onDispose: function(e) {
	            var path = e.vmodel.path;
	            var state = states[path];
	            var vm = state.vm;
	            var render = vm.render;
	            render && render.dispose();
	            delete avalon.vmodels[vm.$id]
	        }
	    }
	});
	
	function getPage(path) {
	    path = path.slice(1);
	    var html = '<xmp is="ms-view" class="view-container" ms-widget="{path:\'' + path + '\',page: @page}"><xmp>';
	    return html
	}
	var pages = ["aaa/aaa","bbb/bbb"];
	pages.forEach(function(pathname) {
		console.log(pathname)
	    var html = __webpack_require__(4)("./" + pathname + '.html');
	    var vm = __webpack_require__(7)("./" + pathname + '.js');
	    addState(pathname, vm, html);
	    avalon.router.add("/"+pathname, function(a) {
	    	console.log(this.path)
	        root.currPath = this.path;
	        root.currPage = getPage(this.path);
	    })
	});
	
	
	avalon.history.start({
	    root: "/aaa/aaa"
	});
	// avalon.router.navigate('/bb/second', 0);
	// avalon.history.setHash('/bb/second');
	
	avalon.ready(function() {
	    avalon.scan(document.body)
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./aaa/aaa.html": 5,
		"./bbb/bbb.html": 6
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 4;


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<div ms-controller=\"aaa\">\r\n\tthis is aaa of about\r\n\t\r\n</div>"

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<div controller=\"bbb\">\r\n\tthis is bbb of about\r\n</div>"

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./aaa/aaa.js": 8,
		"./bbb/bbb.js": 9
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 7;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(avalon) {var vm = avalon.define({
		$id:"aaa",
		init:function(){
			
		}
	})
	module.exports = vm;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(avalon) {console.log('bbb')
	var vm = avalon.define({
		$id:"bbb",
		init:function(){
			
		}
	})
	module.exports = vm;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
]);
//# sourceMappingURL=about.js.map