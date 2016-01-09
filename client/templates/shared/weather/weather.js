/**
 * Created by Johnny on 06.01.2016.
 */

let icons = {
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
            $('.weather-text').text(`ERROR: ${err.message}`);
            $('.weather-temp').attr('src', '');
        } else {
            let data = res.data;

            console.log(data);

            let weatherText = data.weather.map((weather) => weather.description).join('<br>');
            let weatherIcons = data.weather.map((weather) => {
                return {
                    icon: icons[weather.icon.substring(0, 2)],
                    moon: weather.icon.endsWith('n')
                };
            });

            $('.weather-text').html(weatherText);
            $('.weather-temp').text(data.main.temp);

            $('.weather-icons').html('');
            weatherIcons.forEach((weatherIcon) => {
                let i = $('.weather-icons').append(`<i class=\"climacon ${weatherIcon.icon} ${weatherIcon.moon ? 'moon' : ''}\"></i> `);
            });
        }
    });
};

Template.weather.onCreated(() => {
    updateWeather();
    setInterval(() => updateWeather(), 1000 * 60 * 5);
});

Template.weather.helpers({
    getIconClass() {
        return Meteor.settings.public.weather.metric ? "celsius" : "fahrenheit";
    }
});