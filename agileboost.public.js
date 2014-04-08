(function($){
	$.fn.icon={};
	$.fn.icon2={};

	$.fn.icon.createElement=function(target,key,isIcon2){
		var options=$.data(target,key).options;
		var ele=null;
		var iconOpt=isIcon2?options.icon2:options.icon;
		if(iconOpt && iconOpt.name){
			ele=document.createElement('i');
			ele.className='icon-'+iconOpt.name+' ';
			if(!options.text){
				ele.className+=' icon-only';
			}
			if(iconOpt.position){
				ele.className+=' icon-on-'+iconOpt.position;
			}
			if(iconOpt.size){
				ele.className+=' '+iconOpt.size;
			}
		} 
		return ele;
	};
	$.fn.icon.addIcon=function(target,iconEle,options,isIcon2){
		if(iconEle){
			if(!isIcon2){
				if(options.icon.position==='right'){
					$(target).append(iconEle);
				}else{
					$(target).prepend(iconEle);
				}
			}else{
				if(options.icon2.position==='right'){
					$(target).append(iconEle);
				} else if(options.icon2.position==='left'){
					$(target).prepend(iconEle);
				} else if(options.icon &&  options.icon.position==='left'){
					$(target).append(iconEle);
				} else if (options.icon && options.icon.position==='right'){
					$(target).prepend(iconEle);
				} else if (options.icon ){
					$(target).append(iconEle);
				} else 
				{
					$(target).append(iconEle);
				}
			}
		}
	} ;
	$.fn.icon.parseOptions=function(target){
		var t=$(target); 
		var options= $.extend(
						{
							name:(t.attr('icon-name')?t.attr('icon-name'):undefined),
							size:(t.attr('icon-size')?t.attr('icon-size'):undefined),
							position:(t.attr('icon-position')?t.attr('icoin-position'):undefined)
						},
						{
							name:(t.attr('icon')?t.attr('icon'):undefined),
							position:(t.attr('icon-pos')?t.attr('icon-pos'):undefined)
						} 
						);
		return ((options.name || options.size  || options.position)?options:undefined);
	};
	$.fn.icon2.parseOptions=function(target){
		var t=$(target);
		var options= $.extend(
						{
							name:(t.attr('icon2-name')?t.attr('icon2-name'):undefined),
							size:(t.attr('icon2-size')?t.attr('icon2-size'):undefined),
							position:(t.attr('icon2-position')?t.attr('icoin2-position'):undefined)
						},
						{
							name:(t.attr('icon2')?t.attr('icon2'):undefined), 
							position:(t.attr('icon2-pos')?t.attr('icon2-pos'):undefined)
						} 
						);
		return ((options.name || options.size  ||  options.position)?options:undefined);
	};

	$.fn.icon.defaults={ 
		name:null,
		size:null,//icon-2x,bigger-110,bigger-125,bigger-150,bigger-160,bigger-230,如果按钮没有文字内容，要加一个class:icon-only
		position:null
	};
})(jQuery);