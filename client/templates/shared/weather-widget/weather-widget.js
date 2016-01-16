/**
 * Created by Johnny on 06.01.2016.
 */

let climaIcons = {
    '01': 'sun',
    '02': 'cloud sun',
    '03': 'cloud',
    '04': 'cloud',
    '09': 'rain',
    '10': 'rain sun',
    '11': 'lightning',
    '13': 'snow',
    '50': 'fog'
};


let updateWeather = () => {
    Meteor.call('getCurrentWeather', (err, res) => {
        if (err) {
            $('.weather-widget-text').text(`ERROR: ${err.message}`);
            $('.weather-widget-temp').attr('src', '');
        } else {
            let data = res.data;

            let weatherText = data.weather.map((weather) => weather.description).join('<br>');
            let weatherIcons = data.weather.map((weather) => {
                return {
                    icon: climaIcons[weather.icon.substring(0, 2)],
                    moon: weather.icon.endsWith('n')
                };
            });

            $('.weather-widget-text').html(weatherText);
            $('.weather-widget-temp').text(data.main.temp);

            $('.weather-widget-icons').html('');
            weatherIcons.forEach((weatherIcon) => {
                let i = $('.weather-widget-icons').append(`<i class=\"climacon ${weatherIcon.icon} ${weatherIcon.moon ? 'moon' : ''}\"></i> `);
            });
        }
    });
};

Template.weatherWidget.onRendered(() => {
    updateWeather();
    setInterval(() => updateWeather(), 1000 * 60 * 5);
});

Template.weatherWidget.helpers({
    getIconClass() {
        return Meteor.settings.public.weather.metric ? "celsius" : "fahrenheit";
    }
});