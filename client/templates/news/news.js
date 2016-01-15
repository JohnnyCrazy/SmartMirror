Template.news.helpers({
    getHeadlines() {
        console.log(Template.instance().headlines.get());
        return Template.instance().headlines.get();
    }
});

Template.news.onCreated(() => {
    let headlineResponse;
    let maxItems = 0;
    let selected = 0;

    let instance = Template.instance();
    instance.headlines = new ReactiveVar(false);

    let viewCommand = L.current().news.commands.view;
    Commands.add(viewCommand.cmd, viewCommand.help, () => {
        let pathDef = "/news/:article";
        var params = { article: headlineResponse.headlines[selected].url };

        var path = FlowRouter.path(pathDef, params);
        FlowRouter.go(path);
    }, 'news');

    let upCommand = L.current().news.commands.up;
    Commands.add(upCommand.cmd, upCommand.help, () => {
        if (selected - 1 >= 0) {
            headlineResponse.headlines[selected].selected = false;
            selected--;
            headlineResponse.headlines[selected].selected = true;
            instance.headlines.set(headlineResponse);
        }
    }, 'news');

    let downCommand = L.current().news.commands.down;
    Commands.add(downCommand.cmd, downCommand.help, () => {
        if (selected + 1 < maxItems) {
            headlineResponse.headlines[selected].selected = false;
            selected++;
            headlineResponse.headlines[selected].selected = true;
            instance.headlines.set(headlineResponse);
        }
    }, 'news');

    let updateNews = () => {
        instance.headlines.set(false);
        Meteor.call('getNewsHeadlines', (err, res) => {
            console.log(err, res);
            if (!err) {
                res.headlines = res.headlines.map((headline, i) => {
                    headline.id = i;
                    headline.selected = i == selected;
                    return headline;
                });
                headlineResponse = res;
                maxItems = res.headlines.length;
                instance.headlines.set(res);
            }
        })
    };

    updateNews();
});