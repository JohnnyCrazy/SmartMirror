/**
 * Created by Johnny on 04.12.2015.
 */
// Global route
// FlowRouter.subscriptions = function() {
//   this.register('myCourses', Meteor.subscribe('courses'));
// };

FlowRouter.notfound = {
    // Subscriptions registered here don't have Fast Render support.
    subscriptions: function() {

    },
    action: function() {
        BlazeLayout.render("appLayout", {area: "notFound"});
    }
};