/**
 * Created by Johnny on 06.01.2016.
 */
Template.time.onCreated(() => {

    let l = L.current()["time"];
    let settings = Meteor.settings.public.time;

    setInterval(() => {
        let format = `${settings.twentyFourHours ? 'HH' : 'hh'}:mm${settings.showSeconds ? ':ss' : ''}`;
        let now = moment();
        $('.time-display').text(now.format(format));

        $('.weekday').text(l.days[now.weekday()]);
        $('.date').text(now.format(settings.dateFormat));
    }, settings.showSeconds ? (1000) : (1000 * 10));
});