function Initialize () {
        document.addEventListener('DOMContentLoaded', () => {
          
			var applicationID = '';
			var applicationSecret = '';
        
            angular.bootstrap(document, ["sdk"]).get("rainbowSDK");
        
            var onReady = function onReady() {
                console.log("[DEMO] :: On SDK Ready !");
            };
        
            var onLoaded = function onLoaded() {
                console.log("[DEMO] :: On SDK Loaded !");
        
                rainbowSDK.initialize(applicationID, applicationSecret).then(function() {
                    console.log("[DEMO] :: Rainbow SDK is initialized!");
                }).catch(function(err) {
                    console.log("[DEMO] :: Something went wrong with the SDK...", err);
                });
            };
        
            $(document).on(rainbowSDK.RAINBOW_ONREADY, onReady);
        
            $(document).on(rainbowSDK.RAINBOW_ONLOADED, onLoaded);
        
            rainbowSDK.load();
          
        });

}

export default Initialize;
