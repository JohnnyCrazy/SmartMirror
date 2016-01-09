Meteor.methods({
    'getXKCD'(index = -1) {
        if(index == -1)
            return HTTP.get('https://xkcd.com/info.0.json');
        else
            return HTTP.get(`https://xkcd.com/${index}/info.0.json`);
    }
});