/**
 * Created by Johnny on 04.12.2015.
 */

FlowRouter.route('/', {
    name: 'main',
    action: function (params, queryParams) {
        BlazeLayout.render("appLayout");
    }
});

FlowRouter.route('/help/:term?', {
    name: 'help',
    action: function (params, queryParams) {
        BlazeLayout.render("appLayout", { area: "help" });
    }
});

FlowRouter.route('/xkcd', {
    name: 'xkcd',
    triggersExit: [(c) => {
        Commands.delNamespace('xkcd');
    }],
    action: function (params, queryParams) {
        BlazeLayout.render("appLayout", { area: "xkcd" });
    }
});