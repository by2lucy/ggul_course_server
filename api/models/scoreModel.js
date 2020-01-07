'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 계정
var Account_schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
  });

// 과목 리스트
var Course_list_schema = new Schema({
    course_name: {
        type: String,
        required: true,
        unique: true
    },
    professor: {
        type: String
    }
});

// 유저 별 수강과목
var Taken_course_schema = new Schema({
    username: {
        type: String
    },
    course_name: {
        type: String
    }
});

// 성적 
var Score_schema = new Schema({
    course_name: {
        type: String
    },
    score: {
        type: String,
        required: true
    },
    student_cnt: {
        type: Number
    },
    student_prop :{
        type: Number
    }

});


module.exports = mongoose.model('Accounts', Account_schema);
module.exports = mongoose.model('Course_lists', Course_list_schema);
module.exports = mongoose.model('Taken_courses', Taken_course_schema);
module.exports = mongoose.model('Scores', Score_schema);
