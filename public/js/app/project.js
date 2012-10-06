require(["core", "sandbox"], function() {
    //This function is called when scripts/helper/util.js is loaded.
	
    require.ready(function() {
		//This function will be called when all the dependencies
		//listed above are loaded. Note that this function could
		//be called before the page is loaded. This callback is optional.
        require(["app/modules", "app/mapmodule"]);
    });
});