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
    navigator.compass.getCurrentHeading(
        function(heading) {
            $('#app-compass-heading').text(heading);
        },
        function() {
            $('#app-compass-heading').text('Not Defined');
        }
    );

    // ---

    // acceleration
    function onAccel(acc) {
        $('#x').text(acc.x);
        $('#y').text(acc.y);
        $('#z').text(acc.z);
        $('#timestamp').text(acc.timestamp);
    }

    function badAccel(err) {
        err = err || '';
        log('Error in accelerometer : ' + err);
    }

    log('Doing accelerometer');
    navigator.accelerometer.getCurrentAcceleration(onAccel, badAccel);

    function jsonp(data) {
        log(JSON.stringify(data));
        return;
        for( var i = 0; i < data.length; i++) {
            log(i + ' ' + data[i]);
        }
    }

    log('deviceReady(): exit');
}

document.addEventListener('deviceready', deviceReady, false);
