/**
 * Created by Johnny on 06.01.2016.
 */
Template.appLayout.onCreated(() => {
    let l = L.current();

    let goHome = l.commands.goHome;
    Commands.add(goHome.cmd, goHome.help, () => {
        FlowRouter.go('/');
    });

    let showHelp = l.commands.showHelp;
    Commands.add(showHelp.cmd, showHelp.help, () => {
        FlowRouter.go('/help');
    });

    let showHelpAdv = l.commands.showHelpAdv;
    Commands.add(showHelpAdv.cmd, showHelpAdv.help, (c) => {
        console.log(c);
        FlowRouter.go(`/help/${c}`);
    });

    let showXKCD = l.commands.showXKCD;
    Commands.add(showXKCD.cmd, showXKCD.help, () => {
        FlowRouter.go('/xkcd');
    });

    let goBack = l.commands.goBack;
    Commands.add(goBack.cmd, goBack.help, () => {
        history.back();
    });

    let goForward = l.commands.goForward;
    Commands.add(goForward.cmd, goForward.help, () => {
        history.forward();
    });
});

Template.appLayout.onRendered(() => {
    Commands.start();
});