/**
 * Created by Johnny on 13.01.2016.
 */
Meteor.methods({
    getNewsHeadlines() {
        let news = Meteor.settings.public.news;
        if(!News[news])
            console.log("Unkown News Provider");

        let provider = News[news];

        return {
            name: provider.getName(),
            headlines: provider.getHeadlines()
        };
    },
    getArticle(article) {
        let news = Meteor.settings.public.news;
        if(!News[news])
            console.log("Unkown News Provider");

        let provider = News[news];

        return provider.getArticle(article);
    }
});