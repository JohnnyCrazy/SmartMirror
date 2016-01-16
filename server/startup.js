Meteor.startup(() => {
    let exec = Meteor.npmRequire('child_process').exec;

    let proxy = exec(`cd ../../../../../.proxy/ & @echo off & node main.js`, (error, stdout, stderr) => {
        console.log(`Proxy-Proc: ${stdout}`);
        console.log(`Proxy-Proc error: ${stderr}`);
        if (error !== null) {
            console.log(`Proxy-Proc error: ${error}`);
        }
    });

    //Start Chromium
    let chromium = exec(`cd ../../../../../ & @echo off & startChromium`, (error, stdout, stderr) => {
        console.log(`Chromium-Proc: ${stdout}`);
        console.log(`Chromium-Proc error: ${stderr}`);
        if (error !== null) {
            console.log(`Chromium-Proc error: ${error}`);
        }
    });
});