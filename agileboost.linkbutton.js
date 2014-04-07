(function($){
	function createButton(target){
		var opts=$.data(target,'linkbutton').options;

		$(target).empty();
		$(target).addClass('btn');
		if(opts.id){
			$(target).attr('id',opts.id);
		} else {
			$(target).removeAttr('id');
		}
		if(opts.btnStyle){
			$(target).addClass('btn-'+opts.btnStyle);
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
		var iconEle=null;
		var iconEle2=null;
		if(opts.icon){
			iconEle=document.createElement('i');
			iconEle.className='icon-'+opts.icon+ ' align-top ';
			if(!opts.text){
				iconEle.className+=' icon-only';
			}
			if(opts.iconPos){
				iconEle.className+=' icon-on-'+opts.iconPos;
			}
			if(opts.iconSize){
				iconEle.className+=' '+opts.iconSize;
			}  
		}
		if(opts.icon2){
			iconEle2=document.createElement('i');
			iconEle2.className='icon-'+opts.icon2+" align-top ";
			if(!opts.text){
				iconEle2.className+=' icon-only'; 
			}
			if(opts.icon2Pos){
				iconEle2.className+=' icon-on-'+opts.icon2Pos;
			}
			if(opts.icon2Size){
				iconEle2.className+=' '+opts.iconSize;
			}
		}
		if(opts.text){
			$(target).html(opts.text);
			if(iconEle){
				if(opts.iconPos==='right'){
					$(target).append(iconEle);
				}else{
					$(target).prepend(iconEle);
				}
			}
			if(iconEle2){
				if(opts.icon2Pos==='right'){
					$(target).append(iconEle2);
				}else{
					$(target).prepend(iconEle2);
				}
			}
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
						$.parser.parseOptions(target,['icon','iconPos','iconSize','text',
												'size','icon2','icon2Pos','icon2Size','block',
												'disabled','border','btnStyle']),
						{
											id:  t.attr('id'),
											btnStyle:(t.attr('btnStyle')?t.attr('btnStyle'):undefined),
											icon:(t.attr('icon')?t.attr('icon'):undefined),
											iconPos:(t.attr('iconPos')?t.attr('iconPos'):undefined),
											iconSize:(t.attr('iconSize')?t.attr('iconSize'):undefined),
											text:$.trim(t.html()),
											size:(t.attr('size')?t.attr('size'):undefined),
											icon2:(t.attr('icon2')?t.attr('icon2'):undefined),
											icon2Pos:(t.attr('icon2Pos')?t.attr('icon2Pos'):undefined),
											icon2Size:(t.attr('icon2Size')?t.attr('icon2Size'):undefined),
											block:(t.attr('block')?true:undefined),
											disabled:(t.attr('disabled')?true:undefined),
											border:(t.attr('border')?t.attr('border'):undefined)
					    }
				);
	}

	$.fn.linkbutton.defaults={
		id:null,
		btnStyle:null,  //btn-waring(橙色),grey(灰),danger(红色),purple(紫色),yellow,light,inverse(深灰),Pink(酒红),success(绿色),info(淡蓝),primary(蓝色),default(浅灰),white,link(无边框,无背景色)
		icon:null,
		iconPos:'left',  //left,right
		iconSize:null,  //icon-2x,bigger-110,bigger-125,bigger-150,bigger-160,bigger-230,如果按钮没有文字内容，要加一个class:icon-only
		text:'',
		size:null, //minier,xs,sm,default,lg
		icon2:null,
		icon2Pos:'right',
		icon2Size:null,
		block:false,        //是否块级元素
		disabled:false,      //是否禁用
		border:true         //当鼠标移过的时候，是否有边框显示,如果为false，会自动加class:no-border
		 
	};
})(jQuery);