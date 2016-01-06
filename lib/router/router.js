/**
 * Created by Johnny on 04.12.2015.
 */

FlowRouter.route('/', {
    action: function (params, queryParams) {
        BlazeLayout.render("appLayout");
    }
});