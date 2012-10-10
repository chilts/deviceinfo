var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // This is an event handler function, which means the scope is the event.
        // So, we must explicitly called `app.report()` instead of `this.report()`.
        document.getElementById('app').style.display = 'none';
        app.report('deviceready');
    },
    report: function(id) {
        // Report the event in the console
        console.log("Report: " + id);

        // Toggle the state from "pending" to "complete" for the reported ID.
        // Accomplished by adding .hide to the pending element and removing
        // .hide from the complete element.
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');

        // ----------------------------------------------------------------------------
        // --- device ---
        // http://docs.phonegap.com/en/2.1.0/cordova_device_device.md.html#Device

        var deviceName = window.device.name;
        var deviceCordova = window.device.cordova;
        var devicePlatform = window.device.platform;
        var deviceVersion = window.device.version;
        var deviceUuid = window.device.uuid;

        document.querySelector('#app-device-name').innerHtml(deviceName);
        document.querySelector('#app-device-cordova').innerHtml(deviceCordova);
        document.querySelector('#app-device-platform').innerHtml(devicePlatform);
        document.querySelector('#app-device-uuid').innerHtml(deviceUuid);
        document.querySelector('#app-device-version').innerHtml(deviceVersion);

        // ----------------------------------------------------------------------------
        // --- compass ---

        // get the device information
        var compassHeading;

        // gather information
        navigator.compass.getCurrentHeading(
            function(heading) {
                compassHeading = heading;
            },
            function() {
                compassHeading = 'Not defined';
            }
        );

        document.querySelector('#app-compass-heading').innerHtml(compassHeading);

        // ----------------------------------------------------------------------------
    }
};
