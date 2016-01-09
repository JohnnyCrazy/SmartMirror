L = {};

L.current = () => {
    let lang = Meteor.settings.public.language;
    return L[lang];
};
