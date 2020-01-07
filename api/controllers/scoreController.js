'use strick';

var mongoose = require('mongoose'),
    Account = mongoose.model('Accounts'),
    Course_list = mongoose.model('Course_lists'),
    Taken_course = mongoose.model('Taken_courses'),
    Score = mongoose.model('Scores');
    


// 유저 별 수강한 과목 
exports.show_taken_list = function(req,res) {
    Taken_course.find({username:req.params.username}, function(err, taken) {

        if(err)
            res.send(err);
        res.json(taken);

        console.log("User별 수강 과목");
        console.log(req.params.username);
        console.log(taken);
    });    
};


// Top3: score가 A - desc 정렬
exports.show_top3 = function(req,res) {
    Score.find({'score': 'A'}).sort('-student_prop').exec(function(err, top3) {
        if(err)
            res.send(err);
        res.json(top3);

        console.log("Top3");
        console.log(top3);
    });
    

};


// 검색한 과목의 성적 비율
exports.search_result = function(req,res) {
    Score.find({'course_name':req.params.course_name}).sort('score').exec(function(err,s_result ) {

        if(err)
            res.send(err);
        res.json(s_result);

    
        console.log("특정 과목 search");
        console.log(req.params.course_name);
        console.log(s_result);
    });    
};



// 전체 과목 리스트
exports.all_courses = function(req,res) {
    Course_list.find({}, function(err, all_courses) {

        if(err)
            res.send(err);
        res.json(all_courses);

        console.log("all_courses");
        console.log(all_courses);
    });    
};



// 성적 입력 -> 점수, 비율 db
exports.update_score_prop = function(req,res) {
    var new_course_name = req.params.course_name;
    var new_score = req.params.score;

    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log("put update");

    console.log(req.params.course_name);
    console.log(req.params.score);

    // 1. score 학생수 +1
    Score.findOneAndUpdate(
        {course_name:new_course_name, score:new_score},
        {$inc : {'student_cnt' : 1}},
        {   upsert: true,        
            new: true           // filter 매칭값 없으면 새로 만듬  
        },
        function(err, new_score) {
            if(err)
                res.send(err);
    
            console.log(req.body.course_name);
            console.log(new_score);


            // 2. 비율 계산 {student_cnt:1},
            var course_scores = Score.find({course_name:new_course_name}, function(err, course_scores){
                if(err)
                    console.log(err);

                // 전체 학생 수
                all_std = 0;
                for(var i in course_scores) {
                    all_std += course_scores[i].student_cnt; 
                    // console.log(course_scores[i]);
                }
                console.log("전체 학생수 : ", all_std);


                // 각 점수의 비율 
                for(var i in course_scores) {
                    var proportion = course_scores[i].student_cnt / all_std * 100;

                    console.log("전체 학생수",course_scores[i].student_cnt);
                    console.log(course_scores[i].score, " 의 비율:  ", proportion);
                    
                    
                    Score.findOneAndUpdate(
                        {course_name:new_course_name, score:course_scores[i].score},
                        {'student_prop' : proportion},
                        {   upsert: true,        
                            new: true 
                        },
                        function(err, prop_update) {
                            if(err)
                                console.log(err);
                            console.log("각 점수 비율 변경 ", prop_update);

                        });
                }
                
            });

            res.json(new_score);
            console.log("PUT request");
        });
};


