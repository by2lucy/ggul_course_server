'use strict';
module.exports = function(app) {
  var contacts = require('../controllers/contactController');

  app.route('/contacts')
    .get(contacts.list_all)
    .post(contacts.create);

  app.route('/contacts/:nameid')
    .get(contacts.read)
    .put(contacts.update)
    .delete(contacts.delete);

};
