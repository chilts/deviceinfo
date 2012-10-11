function log(msg) {
    var ts = new Date();
    var li = document.createElement('li');
    li.innerHTML = '' + ts.toISOString() + ' : ' + msg;
    var ul = document.getElementById('log');
    ul.appendChild(li);
}

var app = {
    initialize: function() {
        log('initialize(): entry');
        this.bind();
    },
    bind: function() {
        log('bind(): entry');
        document.addEventListener('deviceready', this.deviceready, false);
    },
    init : function() {
        log('init(): entry');
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        log('deviceready(): entry');
        // This is an event handler function, which means the scope is the event.
        // So, we must explicitly called `app.report()` instead of `this.report()`.
        document.getElementById('app').style.display = 'none';
        app.report('deviceready');
    },
    report: function(id) {
        // Report the event in the console
        log('report(): entry');
        log("Report: " + id);

        // Toggle the state from "pending" to "complete" for the reported ID.
        // Accomplished by adding .hide to the pending element and removing
        // .hide from the complete element.
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');

        // ----------------------------------------------------------------------------
        // --- device ---
        // http://docs.phonegap.com/en/2.1.0/cordova_device_device.md.html#Device

        var deviceName     = window.device.name;
        var deviceCordova  = window.device.cordova;
        var devicePlatform = window.device.platform;
        var deviceVersion  = window.device.version;
        var deviceUuid     = window.device.uuid;

        document.querySelector('#app-device-name').innerHTML = deviceName;
        document.querySelector('#app-device-cordova').innerHTML = deviceCordova;
        document.querySelector('#app-device-platform').innerHTML = devicePlatform;
        document.querySelector('#app-device-uuid').innerHTML = deviceUuid;
        document.querySelector('#app-device-version').innerHTML = deviceVersion;

        // ----------------------------------------------------------------------------
        // --- compass ---

        // get the device information
        var compassHeading;

        // gather information
        log('Doing compassHeading');
        navigator.compass.getCurrentHeading(
            function(heading) {
                document.getElementById('app-compass-heading').innerHTML = heading;
            },
            function() {
                document.getElementById('app-compass-heading').innerHTML = heading;
            }
        );

        // ----------------------------------------------------------------------------
        // --- acceleration ---

        function onAccel(acc) {
            document.getElementById('x').innerHTML = acc.x;
            document.getElementById('y').innerHTML = acc.y;
            document.getElementById('z').innerHTML = acc.z;
            document.getElementById('timestamp').innerHTML = '' + acc.timestamp;
        }

        function badAccel(err) {
            log('Error in accelerometer : ' + err);
        }

        log('Doing accelerometer');
        navigator.accelerometer.getCurrentAcceleration(onAccel, badAccel);
        navigator.accelerometer.watchAcceleration(onAccel, badAccel, { frequency : 250 } );

        // ----------------------------------------------------------------------------
    }
};
