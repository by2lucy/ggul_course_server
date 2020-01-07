'use strict';
module.exports = function(app) {
  var sc = require('../controllers/scoreController');

  app.route('/taken_course/:username')
    .get(sc.show_taken_list);

  app.route('/proportion/')
    .get(sc.show_top3);
    
  app.route('/proportion/:course_name')
    .get(sc.search_result);

  app.route('/course_list')
    .get(sc.all_courses);

  app.route('/score/new/:course_name/:score')
    .put(sc.update_score_prop)

};
