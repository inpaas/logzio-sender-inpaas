/**
 * Auto-generated comment stub
 *
  * @inpaas.key inpaas.logzio.listener.appender
 * @inpaas.name LogzIOAppenderListener
 * @inpaas.type patterntype.applistener
 * @inpaas.engine Nashorn
 * @inpaas.anonymous false
*/

/*
 * LogzIOAppenderListener
 * inpaas.logzio.listener.appender
 * 
 */
(function LogzIOAppenderListener(scope) {
	'use strict';
	
	var logger = logging.withLogger("inpaas.logzio.listener.appender");
  
  	function attach(settings) {
		if (settings.ds_token == null) return;

		var LogzIoSender = require("inpaas.extensions.jar")
        	.getClass("inpaas.logzio", "com.inpaas.logzio.LogzIoSender");
      
        LogzIoSender.attach({
        	  "url": "https://listener.logz.io:8071"
            , "type": settings.ds_type || "inpaas_logs"
            , "token": settings.ds_token
        });      
    }
  
  	function dettach() {
		var LogzIoSender = require("inpaas.extensions.jar")
        	.getClass("inpaas.logzio", "com.inpaas.logzio.LogzIoSender");

		LogzIoSender.dettach();
    }

	function handle(event) {
		logger.info("handle - " + event);

       	var settings = require("inpaas.core.entity.dao").getDao("LOGZIO_CONFIG").withAuthorizationOverride().find().first();
      	if(settings == null) {
          	settings = {
              	"ds_type": "inpaas_logs"
            };

          	require("inpaas.core.entity.dao").getDao("LOGZIO_CONFIG").withAuthorizationOverride().insert(settings);          	
        }
      
      	if (event == "UNLOAD") {
          	dettach();
          
        } else {
          	attach(settings);
          
        }      
	}
  
	/*public exports*/
	scope["run"] = handle;	
  	scope["attach"] = attach;
  	scope["dettach"] = dettach;
  
	return scope;

})(typeof module !== "undefined" ? module.exports : this);