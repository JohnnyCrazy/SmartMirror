/**
 * Created by Johnny on 13.01.2016.
 */
News = {};

News["spiegel"] = {
    getName() {
        return "SPIEGEL-Online";
    },
    getHeadlines() {
        let Xray = Meteor.npmRequire('x-ray');
        let x = new Xray().driver(XRayDriver('ISO-8859-1'));

        let response = Async.runSync((done) => {
            x('http://www.spiegel.de/schlagzeilen/tops/index.html', {
                headlines: x('.teaser', [{
                    intro: '.headline-intro',
                    title: '.headline',
                    url: 'a@href'
                }])
            })((err, obj) => {
                done(err, obj);
            });
        });
        if(!response.error)
            return response.result.headlines.splice(0, 10);
        else
            throw new Meteor.Error('could-not-fetch', 'Could not fetch News...');
    },
    getArticle(url) {
        let Xray = Meteor.npmRequire('x-ray');
        let x = new Xray().driver(XRayDriver('ISO-8859-1'));

        let response = Async.runSync((done) => {
            x(url, {
                intro: {
                    title: '.article-title.lp-article-title',
                    details: '.article-intro'
                },
                text: '.article-section.clearfix'
            })((err, obj) => {
                obj.intro.title = obj.intro.title.trim().replace(/\n\s*\n/g, '');
                obj.text = obj.text.trim()
                    .replace(/\n\s*\n/g, '\n')
                    .replace(/if \(typeof ADI != 'undefined'\) ADI\.ad\('content_ad_(:?.*)'\);/g, '')
                    .replace(/\n/g, '<br>');
                done(err, obj);
            });
        });
        if(!response.error)
            return response.result;
        else
            throw new Meteor.Error('could-not-fetch', 'Could not fetch News...');
    }
};