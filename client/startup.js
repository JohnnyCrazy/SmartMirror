Meteor.startup(() => {
    
});

Transitioner.setTransitions({
    'default': 'fade'
});

Commands = {};
Commands.cmds = [];
Commands.add = (cmd, help, cb, namespace = null) => {
    console.log(`Registering Command: ${cmd}`);

    let command = {};
    command[cmd] = cb;
    annyang.addCommands(command);

    Commands.cmds.push({
        cmd: cmd,
        help: help,
        namespace: namespace
    });
};

Commands.del = (cmd) => {
    console.log(`Removing Command: ${cmd}`);
    annyang.removeCommands(cmd);
    Commands.cmds = Commands.cmds.filter((item) => item.cmd != cmd);
};

Commands.delNamespace = (namespace) => {
    console.log(`Removing Namespace: ${namespace}`);

    let cmds = Commands.cmds.filter((cmd) => cmd.namespace == namespace)
    cmds.forEach((command) => {
        console.log(`Removing Command: ${command.cmd}`);
        annyang.removeCommands(command.cmd);
    });
    Commands.cmds = cmds;
};

Commands.start = () => {
    console.log("Starting Voice-Detection...");

    annyang.setLanguage(L.current().lang);
    annyang.start();
};

SetStatus = (status, fadeout = null) => {
    $('.status').text(status);
};