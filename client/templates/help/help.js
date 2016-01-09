Template.help.helpers({
    commands() {
        let term = FlowRouter.getParam('term');

        let text = FlowRouter.getParam('term') || '';
        $('.help-category').text(`: ${text}`);

        if (term) {
            let termCategory = L.current()[term];
            if (termCategory && "commands" in termCategory) {
                let commands = termCategory.commands;
                return Object.keys(commands).map((command) => {
                    return commands[command];
                });
            }
        } else {
            let commands = L.current().commands;
            return Object.keys(commands).map((command) => {
                return commands[command];
            });
        }
    }
});

Template.help.onRendered(() => {
    let text = FlowRouter.getParam('term') || '';
    $('.help-category').text(`: ${text}`);
});