(function($){
	function createButton(target){
		var opts=$.data(target,'linkbutton').options;

		$(target).empty();
		$(target).addClass('btn').removeClass('agb-linkbutton');
		if(opts.id){
			$(target).attr('id',opts.id);
		} else {
			$(target).removeAttr('id');
		}
		if(opts.color){
			$(target).addClass('btn-'+opts.color);
		}
		if(opts.size){
			$(target).addClass('btn-'+opts.size);
		}
		if(opts.border==false){
			$(target).addClass('no-border');
		} 
		if(opts.block){
			$(target).addClass('btn-block');
		}
		if(opts.canActive){
			$(target).attr('data-toggle','button');
		}
		var iconEle  =$.fn.icon.createElement(target,'linkbutton'); 
		var iconEle2 =$.fn.icon.createElement(target,'linkbutton',true); 
		if(opts.text){
			$(target).html(opts.text);
			$.fn.icon.addIcon(target,iconEle,opts);
			$.fn.icon.addIcon(target,iconEle2,opts,true);
		}
		setDisabled(target,opts.disabled);
	}
	function setDisabled(target,disabled){
		var state=$.data(target,'linkbutton');
		if(disabled){
			state.options.disabled=true;
			var href=$(target).attr('href');
			if(href){
				state.href=href;
				$(target).attr('href','javascript:void(0);');
			}
			var onclick=$(target).attr('onclick');
			if(onclick){
				state.options.onclick=onclick;
				$(target).attr('onclick',null);
			}
			$(target).addClass('disabled');
		} else {
			state.options.disabled=false;
			if(state.href){
				$(target).attr('href',state.href);
			}
			if(state.onclick){
				target.onclick=state.onclick;
			}
		}
	}

	$.fn.linkbutton=function(options){
		if(typeof options=="string"){
			switch(options){
				case 'options':
					return $.data(this[0],'linkbutton').options;
				case 'enable':
					return this.each(function(){
						setDidabled(this,false);
					});
				case 'disable':
					return this.each(function(){
						setDisabled(this,true);
					});
			}
		}
		options=options || {};
		return this.each(function(){
			var state=$.data(this,'linkbutton');
			if(state){
				$.extend(state.options,options);
			} 
			else {
				var t=$(this);
				$.data(this,'linkbutton',
								{options:
									$.extend({},
											 $.fn.linkbutton.defaults,
											 $.fn.linkbutton.parseOptions(this),
											 options
										)
								});  
				t.removeAttr('disabled');
			} 
			createButton(this);  
		});
	}

	$.fn.linkbutton.parseOptions=function(target){
		var t=$(target); 
		return $.extend({},
						$.parser.parseOptions(target,['text',
												'size','block','icon','icon2',
												'disabled','border','color','canActive']),
						{
											id        :t.attr('id'),
											color     :(t.attr('color')?t.attr('color'):undefined),
											icon      :$.fn.icon.parseOptions(target),
											icon2     :$.fn.icon2.parseOptions(target), 
											text      :$.trim(t.html()),
											size      :(t.attr('size')?t.attr('size'):undefined), 
											block     :(t.attr('block')?true:undefined),
											disabled  :(t.attr('disabled')?true:undefined),
											border    :(t.attr('border')?t.attr('border'):undefined),
											canActive :(t.attr('canActive')?t.attr('canActive'):undefined)
					    }
				);
	}

	$.fn.linkbutton.defaults={
		id        :null,
		color     :null,  //btn-waring(橙色),grey(灰),danger(红色),purple(紫色),yellow,light,inverse(深灰),Pink(酒红),success(绿色),info(淡蓝),primary(蓝色),default(浅灰),white,link(无边框,无背景色)
		icon      :null,  //$.fn.icon.defaults 
		icon2     :null,  //$.fn.icon.defaults
		text      :'',
		size      :null, //minier,xs,sm,default,lg 
		block     :false,        //是否块级元素
		disabled  :false,      //是否禁用
		border    :true ,        //当鼠标移过的时候，是否有边框显示,如果为false，会自动加class:no-border
		canActive :false          //是否可激活   (内阴影样式)
	};
})(jQuery);