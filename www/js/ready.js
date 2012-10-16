function log(msg) {
    var $li = $('<li>').text((new Date()).toISOString() + ' : ' + msg);
    $('#log').append($li);
}

function deviceReady() {
    log('deviceReady(): entry');

    // firstly, show that the device is ready
    $('#deviceready').addClass('hide');
    $('#deviceready .complete').removeClass('hide');
    setTimeout(function() {
        $('#app').addClass('hide');
    }, 3000);

    // ---

    var deviceName     = window.device.name;
    var deviceCordova  = window.device.cordova;
    var devicePlatform = window.device.platform;
    var deviceVersion  = window.device.version;
    var deviceUuid     = window.device.uuid;

    // show the device info
    $('#app-device-name').text(deviceName);
    $('#app-device-cordova').text(deviceCordova);
    $('#app-device-platform').text(devicePlatform);
    $('#app-device-uuid').text(deviceUuid);
    $('#app-device-version').text(deviceVersion);

    // ---

    // get the compass info
    var compassHeading;
    log('Doing compassHeading');
    var watchId = navigator.compass.watchHeading(
        function(heading) {
            $('#app-compass-magnetic-heading').text(heading.magneticHeading);
            $('#app-compass-true-heading').text(heading.trueHeading);
            $('#app-compass-heading-accuracy').text(heading.headingAccuracy);
            $('#app-compass-timestamp').text(heading.timestamp);
        },
        function() {
            $('#app-compass-magnetic-heading').text('Not Defined');
        },
        { frequency : 1000 } // every second
    );

    // ---

    // acceleration
    log('Doing accelerometer');
    var watchAccId = navigator.accelerometer.watchAcceleration(
        function(acc) {
            $('#acc-x').text(acc.x);
            $('#acc-y').text(acc.y);
            $('#acc-z').text(acc.z);
            $('#acc-timestamp').text(acc.timestamp);
        },
        function(err) {
            $('#acc-timestamp').text('Error: ' + err);
        },
        { frequency : 1000 } // every second
    );

    log('deviceReady(): exit');
}

document.addEventListener('deviceready', deviceReady, false);
