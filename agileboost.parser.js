/**
* parser - jQuery ACE-ADMIN
* 
*
*
*/
(function($){
	$.parser={
		auto:true,
		onComplete:function(context){},
		plugins:['linkbutton'],
		parse:function(context){
			var aa=[];
			for(var i=0;i<$.parser.plugins.length;i++){
				var name=$.parser.plugins[i];
				var r=$(".agb-"+name,context);
				if(r.length){
					if(r[name]){
						r[name]();
					}else{
						aa.push({name:name,jq:r});
					}
				}
			}
			if(aa.length && window.agbloader){
				var names=[];
				for(var i=0;i<aa.length;i++){
					names.push(aa[i].name);
				}
				agbloeader.load(names,function(){
					for(var i=0;i<aa.length;i++){
						var name=aa[i].name;
						var jq=aa[i].jq;
						jq[name]();
					}
					$.parser.onComplete.call($.parser,context);
				});
			}else{
				$.parser.onComplete.call($.parser,context);
			}
		},
		parseOptions: function(target, params){
            var t = $(target);
            var options = {};
            var s = $.trim(t.attr("data-options"));
            if (s) {
                var prev = s.substring(0, 1);
                var end = s.substring(s.length - 1, 1);
                if (prev != "{") {
                    s = "{" + s;
                }
                if (end != "}") {
                    s = s + "}";
                }
                options = (new Function("return " + s))();
            }
            if (params) {
                var opts = {};
                for (var i = 0; i < params.length; i++) {
                    var pp = params[i];
                    if (typeof pp == "string") {
                        if (pp == "width" || pp == "height" || pp == "left" || pp == "top") {
                            opts[pp] = parseInt(target.style[pp]) || undefined;
                        }
                        else {
                            opts[pp] = t.attr(pp);
                        }
                    }
                    else {
                        for (var _c in pp) {
                            var _d = pp[_c];
                            if (_d == "boolean") {
                                opts[_c] = t.attr(_c) ? (t.attr(_c) == "true") : undefined;
                            }
                            else {
                                if (_d == "number") {
                                    opts[_c] = t.attr(_c) == "0" ? 0 : parseFloat(t.attr(_c)) || undefined;
                                }
                            }
                        }
                    }
                }
                $.extend(options, opts);
            }
            return options;
        } 
	};

	$(function(){
		if(!window.abgloader && $.parser.auto){
			$.parser.parse();
		}
	});
})(jQuery);