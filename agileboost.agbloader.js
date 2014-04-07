/**
*
*
*
*/
(function(){
	var modules={
		dropdown:{
			js:'agileboost.dropdown.js',
			css:'dropdown.css',
			dependencies:['linkbutton']    //这个是指引用的模块
		},
		linkbutton:{
			js:'agileboost.linkbutton.js' 
		}
	};
	var locales={
		"en":'agb-lang-en.js',
		"zh_CN":"agb-lang-zh_CN.js"        //这个是指语言模块
	};
	var queues={};

	function loadJs(url,callback){
		var done=false;
		var script=document.createElement('script');
		script.type="text/javascript";
		script.language='javascript';
		script.src=url;
		script.onload=script.onreadystatechange=function(){
			if(!done && (!script.readyState || script.readState=='loaded' || script.readyState=="complete")){
				done=true;
				script.onload=script.onreadystatechange=null;
				if(callback){
					callback.call(script);
				}
			}
		}
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	function runJs(url,callback){
		loadJs(url,function(){
			document.getElementsByTagName("head")[0].removeChild(this);
			if(callback){
				callback();
			}
		});
	}

	function loadCss(url,callback){
		var link=document.createElement('link');
		link.rel="stylesheet";
		link.type="text/css";
		link.media='screen';
		link.href=url;
		document.getElementsByTagName('head')[0].appendChild(link);
		if(callback){
			callback.call(link);
		}
	}

	function loadSingle(name,callback){
		queues[name]='loading';

		var module=modules[name];
		var jsStatus="loading";
		var cssStatus=(agbloader.css && module['css'])?"loading":"loaded";

		if (agbloader.css && module['css']){
			if (/^http/i.test(module['css'])){
				var url = module['css'];
			} else {
				var url = agbloader.base + 'themes/' + agbloader.theme + '/' + module['css'];
			}
			loadCss(url, function(){
				cssStatus = 'loaded';
				if (jsStatus == 'loaded' && cssStatus == 'loaded'){
					finish();
				}
			});
		}

		if (/^http/i.test(module['js'])){
			var url = module['js'];
		} else {
			var url = agbloader.base + 'plugins/' + module['js'];
		}
		loadJs(url, function(){
			jsStatus = 'loaded';
			if (jsStatus == 'loaded' && cssStatus == 'loaded'){
				finish();
			}
		});
		function finish(){
			queues[name] = 'loaded';
			agbloader.onProgress(name);
			if (callback){
				callback();
			}
		}
	}
	function loadModule(name,callback){
		var mm=[];
		var doLoad=false;

		if(typeof name==='string'){
			add(name);
		}else{
			for(var i=0;i<name.length;i++){
				add(name[i]);
			}
		}

		function add(name){
			if(!modules[name])return;
			var d=modules[name]['dependencies'];
			if(d){
				for(var i=0;i<d.length;i++){
					add(d[i])
				}
			}
			mm.push(name);
		}
		function finish(){
			if(callback){
				callback();
			}
			agbloader.onLoad(name);
		}

		var time=0;
		function loadMm(){
			if (mm.length){
				var m = mm[0];	// the first module
				if (!queues[m]){
					doLoad = true;
					loadSingle(m, function(){
						mm.shift();
						loadMm();
					});
				} else if (queues[m] == 'loaded'){
					mm.shift();
					loadMm();
				} else {
					if (time < agbloader.timeout){
						time += 10;
						setTimeout(arguments.callee, 10);
					}
				}
			} else {
				if (agbloader.locale && doLoad == true && locales[agbloader.locale]){
					var url = agbloader.base + 'locale/' + locales[agbloader.locale];
					runJs(url, function(){
						finish();
					});
				} else {
					finish();
				}
			}

		}
		loadMm();
	}
	agbloader={
		modules:modules,
		locales:locales,

		base:'.',
		//theme:'',
		css:true,
		locale:null,
		timeout:2000,

		load:function(name,callback){
			if (/\.css$/i.test(name)){
				if (/^http/i.test(name)){
					loadCss(name, callback);
				} else {
					loadCss(agbloader.base + name, callback);
				}
			} else if (/\.js$/i.test(name)){
				if (/^http/i.test(name)){
					loadJs(name, callback);
				} else {
					loadJs(agbloader.base + name, callback);
				}
			} else {
				loadModule(name, callback);
			}
		},
		onProgress:function(name){},
		onLoad:function(name){}
	};

	var scripts=document.getElementsByTagName('script');
	for(var i=0;i<scripts.length;i++){
		var src=scripts[i].src;
		if(!src)continue;
		var m = src.match(/agbloader\.js(\W|$)/i);
		if (m){
			agbloader.base = src.substring(0, m.index);
		}
	}
	window.using=agbloader.load;
	if(window.jQuery){
		jQuery(function(){
			agbloader.load('parser',function(){
				jQuery.parser.parse();
			});
		});
	}

})();