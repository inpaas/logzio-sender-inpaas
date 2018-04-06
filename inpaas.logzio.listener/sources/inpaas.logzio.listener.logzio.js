/**
 * Auto-generated comment stub
 *
  * @inpaas.key inpaas.logzio.listener.logzio
 * @inpaas.name logzio
 * @inpaas.type patterntype.service
 * @inpaas.engine Nashorn
 * @inpaas.anonymous false
*/

/*
 * logzio
 * inpaas.logzio.listener.logzio
 */
(function logzio() {
	'use strict';
	 
	function getStatus(data) {
		var lc = Java.type("org.slf4j.LoggerFactory").getILoggerFactory();
      	var rootLogger = lc.getLogger("ROOT");
            	
      	var list = [];
		var it = rootLogger.iteratorForAppenders();      	
      	while(it.hasNext()) {
          	var appender = it.next();
          	if (appender.getName() != "LogzIo-Appender") continue;
          
          	list.push({
              	"name": appender.getName(),
              	"started": appender.isStarted()
            });
		}
      
      	return list;
	}
	
	RESTService.addEndpoint({ "name": "getStatus", "method": "GET", "path": "/status" }, getStatus);
	
})();