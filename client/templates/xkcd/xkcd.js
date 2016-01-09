let currentXKCD;

let processResponse = (err, res) => {

    console.log(err,res);
    if (err) {
        $('.xkcd-title').text(`ERROR: ${err.message}`);
        $('.xkcd-image').attr('src', '');
    } else {
        let data = res.data;

        currentXKCD = data.num;
        $('.xkcd-title').text(data.title);
        $('.xkcd-image').attr('src', data.img);
    }
};

Template.xkcd.onCreated(() => {
    let l = L.current();

    let nextXKCD = l.xkcd.commands.next;
    Commands.add(nextXKCD.cmd, nextXKCD.help, () => {
        $('.xkcd-title').text("Loading...");
        Meteor.call('getXKCD', currentXKCD - 1, (err, res) => {
            processResponse(err, res);
        });
    }, 'xkcd');

    let prevXKCD = l.xkcd.commands.previous;
    Commands.add(prevXKCD.cmd, prevXKCD.help, () => {
        $('.xkcd-title').text("Loading...");
        Meteor.call('getXKCD', currentXKCD + 1, (err, res) => {
            processResponse(err, res);
        });
    }, 'xkcd');
});

Template.xkcd.onRendered(() => {
    Meteor.call('getXKCD', (err, res) => {
        processResponse(err, res);
    });
});