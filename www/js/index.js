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

        // get the device information
        var deviceHeading, deviceName, deviceVersion;
        navigator.compass.getCurrentHeading(
            function(heading) {
                deviceHeading = heading;
            },
            function() {
                deviceHeading = 'Not defined';
            }
        );
        deviceName = window.device.name;
        deviceVersion = window.device.version;

        // do the device info
        var one = document.querySelector('#app-device-heading');
        one.innerHtml(deviceHeading);
        var two = document.querySelector('#app-device-name');
        two.innerHtml(devicename);
        var three = document.querySelector('#app-device-version');
        three.innerHtml(deviceVersion);
    }
};
