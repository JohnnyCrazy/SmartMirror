/**
 * Created by Johnny on 04.12.2015.
 */

FlowRouter.route('/', {
    name: 'main',
    triggersExit: [(c) => {
        Commands.delNamespace('main');
    }],
    action: function (params, queryParams) {
        BlazeLayout.render("appLayout", { area: "main" });
    }
});

FlowRouter.route('/help', {
    name: 'help',
    action: function (params, queryParams) {
        BlazeLayout.render("appLayout", { area: "help" });
    }
});

FlowRouter.route('/help/:term', {
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

FlowRouter.route('/weather', {
    name: 'weather',
    triggersExit: [(c) => {
        Commands.delNamespace('weather');
    }],
    action: function (params, queryParams) {
        BlazeLayout.render("appLayout", { area: "weather" });
    }
});

FlowRouter.route('/news', {
    name: 'news',
    triggersExit: [(c) => {
        Commands.delNamespace('news');
    }],
    action: function (params, queryParams) {
        BlazeLayout.render("appLayout", { area: "news" });
    }
});

FlowRouter.route('/news/:article', {
    name: 'news',
    triggersExit: [(c) => {
        Commands.delNamespace('newsArticle');
    }],
    action: function (params, queryParams) {
        BlazeLayout.render("appLayout", { area: "newsArticle" });
    }
});