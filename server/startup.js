Meteor.startup(() => {
    let exec = Meteor.npmRequire('child_process').exec;

    exec('echo Hello', function (error, stdout, stderr) {
        console.log('HDMI Test: ', stdout);
    });
});