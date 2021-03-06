/**
 * Created by Johnny on 06.01.2016.
 */
Template.appLayout.onCreated(() => {
    let instance = Template.instance();

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

    let showWeather = l.commands.showWeather;
    Commands.add(showWeather.cmd, showWeather.help, () => {
        FlowRouter.go('/weather');
    });

    let showNews = l.commands.showNews;
    Commands.add(showNews.cmd, showNews.help, () => {
        FlowRouter.go('/news');
    });

    let goBack = l.commands.goBack;
    Commands.add(goBack.cmd, goBack.help, () => {
        history.back();
    });

    let goForward = l.commands.goForward;
    Commands.add(goForward.cmd, goForward.help, () => {
        history.forward();
    });

    let showMap = l.commands.showMap;
    Commands.add(showMap.cmd, showMap.help, () => {
        FlowRouter.go('/map');
    });

    let sleep = l.commands.sleep;
    Commands.add(sleep.cmd, sleep.help, () => {
        Meteor.call('sleep');
    });

    let wakeup = l.commands.wakeup;
    Commands.add(wakeup.cmd, wakeup.help, () => {
        Meteor.call('wakeup');
    });
});

Template.appLayout.onRendered(() => {
    Commands.start();
});