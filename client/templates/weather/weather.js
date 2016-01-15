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

Template.weatherForecastRow.helpers({
    getIconsForWeather() {
        let icons = [];
        let weatherIcons = this.weather.map((weather) => {
            return {
                icon: climaIcons[weather.icon.substring(0, 2)],
                moon: weather.icon.endsWith('n')
            };
        });

        weatherIcons.forEach((weatherIcon) => {
            icons.push(`<i class=\"climacon ${weatherIcon.icon} ${weatherIcon.moon ? 'moon' : ''}\"></i> `);
        });
        return icons;
    }
});

Template.weather.helpers({
    getForecast() {
        return Template.instance().forecast.get();
    },
    getIconClass() {
        return Meteor.settings.public.weather.metric ? "celsius" : "fahrenheit";
    }
});

Template.weather.onCreated(() => {
    let instance = Template.instance();
    instance.forecast = new ReactiveVar(false);

    let updateWeather = () => {
        instance.forecast.set(false);
        Meteor.call('getForecast', (err, res) => {
            let weathers = {};

            for (let i = 0; i < res.data.list.length; i++) {
                let data = res.data.list[i];
                let date = moment(data.dt_txt);
                let index = L.current().time.days[date.weekday()];
                weathers[index] = weathers[index] || [];

                if (i == 0) { //This is some weird hack, I should prob. change this some day
                    if (date.hours() != 0) {
                        for (let u = 0; (u * 3) < date.hours(); u++) {
                            weathers[index].push(undefined);
                        }
                    }
                }
                weathers[index].push(data);
            }

            let arr = Object.keys(weathers).map((key) => {
                if (weathers[key].length < 8) { //This is some weird hack, I should prob. change this some day
                    let length = weathers[key].length;
                    for (let u = 0; u < 8 - length; u++) {
                        weathers[key].push(undefined);
                    }
                }
                return {
                    day: key,
                    weathers: weathers[key]
                };
            });
            instance.forecast.set(arr);
        });
    };

    let updateCommand = L.current().weather.commands.update;
    Commands.add(updateCommand.cmd, updateCommand.help, () => {
        updateWeather();
    }, 'weather');

    updateWeather();
});