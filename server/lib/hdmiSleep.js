Meteor.methods({
    sleep() {
        let exec = Meteor.npmRequire('child_process').exec;

        exec('/opt/vc/bin/tvservice -o', function (error, stdout, stderr) {
            if(error)
                console.log('HDMI Sleep-Eror: ', error);
            else
                console.log('HDMI Sleep: ', stdout);
        });
    },
    wakeup() {
        let exec = Meteor.npmRequire('child_process').exec;

        exec('/opt/vc/bin/tvservice -p', function (error, stdout, stderr) {
            if(error)
                console.log('HDMI WakeUp-Eror: ', error);
            else
                console.log('HDMI WakeUp: ', stdout);
        });
    }
});