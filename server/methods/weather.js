Meteor.methods({
    getCurrentWeather() {
        let lang = Meteor.settings.public.language;
        let apiKey = Meteor.settings.public.weather.apiKey;
        let cityId = Meteor.settings.public.weather.cityId;
        let metric = Meteor.settings.public.weather.metric ? "metric" : "imperial";

        console.log(lang, apiKey, cityId, metric);

        return HTTP.get(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&lang=${lang}&units=${metric}`);
    }
});