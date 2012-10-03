//create the application namespace
var app = (function(window, document, undefined) {

var moduleData = {};

	return {

		register: function(moduleId, Creator){
			moduleData[moduleId] = {
				creator: Creator,
				instance: null
			};
		},

		start: function(moduleId){
            moduleData[moduleId].instance = moduleData[moduleId].creator(Sandbox(this));
			moduleData[moduleId].instance.init();
		},

		startAll: function(){
			for (var moduleId in moduleData){
				if (moduleData.hasOwnProperty(moduleId)){
					this.start(moduleId);
				}
			}
		},

		stop: function(moduleId){
			var data = moduleData[moduleId];
			if(data.instance){
				data.instance.destroy();
				data.instance = null;
			}
		},

        stopAll: function(){
            for (var moduleId in moduleData){
                if (moduleData.hasOwnProperty(moduleId)){
                    this.stop(moduleId);
                }
            }
        },

		getModuleData: function(moduleId){
			return moduleData[moduleId];
		},

		/**
		 * Returns the namespace specified and creates it if it doesn't exist
		 * @method namespace
		 * @param  {string*} arguments 1-n namespaces to create
		 * @return {object}  A reference to the last namespace object created
		 */
		namespace: function() {
		    var a=arguments, o=null, i, j, d;
		    for (i=0; i<a.length; i=i+1) {
		        d = ("" + a[i]).split(".");
		        o = this;
		        for (j=(d[0] == "app") ? 1 : 0; j<d.length; j=j+1) {
		            o[d[j]] = o[d[j]] || {};
		            o = o[d[j]];
		        }
		    }
		    return o;
		}
	};

}(this, this.document));

//utility methods
app.Utils = function(){
    	return{
			domManipulation: function(data){
				switch (data.type) {
					case "css":
						$(data.what).css(data.styles);
						break;
					case "append":
						$(data.where).append(data.what);
						break;
                    case "setHtml":
                        $(data.where).html(data.what);
                        break;
				    case "remove":
                        $(data.what).remove();
                        break;
                    case "attr":
                    	$(data.what).attr(data.attr);
                    	break;
                    case "addClass":
                    	$(data.where).addClass(data.what);
                    	break;
                    case "removeClass":
                    	$(data.where).removeClass(data.what);
                    	break;
				}
			},

			getValue: function(data){
				var elem = this.getElement(data);
				return elem.val();
			},

			getElement: function(data){
                return $(data.selector);
			},

			//bind a live event to the module parent element and namspace that event
			setEventBinding: function(data){
				switch (data.method) {
					case "live":
						$(data.selector).live(data.type+"."+data.moduleId,
							  function(e){
								  data.handler.method.call(data.handler.context || this, e);
								}
						  );
						break;
    				case "persist":
						$(data.selector).live(data.type,
							  function(e){
								  data.handler.method.call(e);
								}
						  );
						break;

                    case "bind":
                        $(data.selector).bind(data.type+"."+data.moduleId,
							  function(e){
								  data.handler.method.call(data.handler.context || this, e);
								}
                        );
                    case "delegate":
                        $(data.parent).delegate(data.child, data.type+"."+data.moduleId, data.handler.context,function(e){
							  data.handler.method.call(data.handler.context || this, e);
							}
                        );
                        break;
				}
			},

			//remove any bound events when a module is stopped
			removeEventBinding: function(data){
				switch (data.method) {
					case "live":
						$(data.selector).die(data.type+"."+data.moduleId,
							  $.proxy(data.handler.context, data.handler.method)
						  );
						break;
                    case "bind":
                        $(data.selector).unbind(data.type+"."+data.moduleId,
							  $.proxy(data.handler.context, data.handler.method)
                        );
                    case "delegate":
                        $(data.parent).undelegate(data.child, data.type+"."+data.moduleId,
							  $.proxy(data.handler.context, data.handler.method)
                        );
                        break;
				}
            },

			throttle: function(data){
				//generic throttle function to stop functions from being called more than 1 time per 200ms
				clearTimeout(data.method.tId);
				data.method.tId = setTimeout(function(){
					data.method.call(data.context, data.params);
				}, 500);
			},

			setContext: function(data){
				return $.proxy(data.context, data.method);
			},

			animate: function(data){
				switch (data.type){
					case "show":
							$(data.selector).show(data.time, data.callback.call(data.context));
						break;
					case "hide":
							$(data.selector).hide(data.time, data.callback.call(data.context));
						break;
					case "animate":
							$(data.selector).animate({

							});
						break;
				}
			},

			show: function(elem){
				$(elem).show();
			},

			hide: function(elem){
				$(elem).hide();
			},

			toggle: function(elem){
				$(elem).toggle();
			}
		};
}();

//inter-module communication methods
app.Communication = function(){
    //object containing all the handler functions
	var handlers = {};

	return{
		listen: function(msg){
			var type = msg.type;
			if (!handlers[type]) {
				handlers[type] = [];
			}
			handlers[type].push({context:msg.context, callback:msg.callback});
		},

		notify: function(msg){
			if(!msg.target){
				msg.target = this;
			}
			var type = msg.type;
			if (handlers[type] instanceof Array) {
				var msgList = handlers[type];
				for (var i = 0, len = msgList.length; i < len; i++) {
					msgList[i].callback.call(msgList[i].context, msg.data);
				}
			}
		},

		remove: function(msg){
			var type = msg.type, callback = msg.callback, handlersArray = handlers[type];
			if (handlersArray instanceof Array) {
				for (var i=0, len=handlersArray.length; i < len; i++){
					if (handlersArray[i].callback == callback){
						break;
					}
				}
				handlers[type].splice(i, 1);
			}
		}
	}
}();
