/**
 * Created by Johnny on 06.01.2016.
 */
Template.timeDisplay.onCreated(() => {

    let settings = Meteor.settings.public.time;


    setInterval(() => {
        let format = `${settings.twentyFourHours ? 'HH' : 'hh'}:mm${settings.showSeconds ? ':ss' : ''}`;
        $('.time-display').text(moment().format(format));
    }, settings.showSeconds ? (1000) : (1000 * 10));
});