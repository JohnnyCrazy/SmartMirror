Template.newsArticle.helpers({
    getArticle() {
        return Template.instance().article.get();
    }
});

Template.newsArticle.onCreated(() => {
    let instance = Template.instance();
    instance.article = new ReactiveVar(false);

    let updateArticle = () => {
        Meteor.call('getArticle', FlowRouter.getParam('article'), (err, res) => {
            console.log(err, res);
            if (!err) {
                instance.article.set(res);
            }

        });
    };

    updateArticle();
});