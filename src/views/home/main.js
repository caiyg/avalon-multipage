// require('avalon2');
// require('mmRouter');
require('./../../components/header/header.js');
var root = avalon.define({
	$id:'app',
	contents:"hello!here is home",
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
        path: 'no ',
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
    var html = require('text!./pages/' + pathname + '.html');
    var vm = require('./pages/' + pathname + '.js');
    addState(pathname, vm, html);
    console.log(this.path)
    avalon.router.add("/"+pathname, function(a) {
        root.currPath = this.path;
        root.currPage = getPage(this.path);
    })
});


avalon.history.start({
    root: "/bbb/bbb"
});
// avalon.router.navigate('/bb/second', 0);
// avalon.history.setHash('/bb/second');

avalon.ready(function() {
    avalon.scan(document.body)
});
