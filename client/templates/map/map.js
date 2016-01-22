Template.map.helpers({
    getHeight() {
        return Meteor.settings.public.map.height;
    },
    getWidth() {
        return Meteor.settings.public.map.width;
    },
    getUrl() {
        let origin = Meteor.settings.public.map.origin;
        let destination = Meteor.settings.public.map.destination;
        let apiKey = Meteor.settings.public.map.apiKey;

        return `https://www.google.com/maps/embed/v1/directions?origin=place_id:${origin}&destination=place_id:${destination}&key=${apiKey}`;
    }
});

Template.map.onCreated(() => {

    let viewCommand = L.current().map.commands.update;
    Commands.add(viewCommand.cmd, viewCommand.help, () => {
        $('.map').attr('src', (i, val) => val);
    }, 'map');
});