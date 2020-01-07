'use strick';

var mongoose = require('mongoose'),
    Contact = mongoose.model('Contacts');

// 전체 find
exports.list_all = function(req, res) {
    Contact.find({}, function(err, contact) {
        if(err)
            res.send(err);

        res.json(contact);

        // res.json(contact.phone_num);

        console.log(contact);
    });    
};

// 추가
exports.create = function(req, res) {
    var new_contact = new Contact(req.body);
/*    let new_contact = new Contact(
        {
            name : req.body.name,
            phone_num : req.body.phone_num
        }
    )
*/
    new_contact.save(function(err, contact) {
        if(err)
            res.send(err);
        res.json(contact);
        console.log(contact);
    });    

};

// req로 name 받음 -> phone_num 보내줌
exports.read = function(req, res) {
    
    Contact.find({'name':req.params.nameid}, function(err, contact) {
        console.log(contact);
        console.log(req.params.nameid);

        if(err)
            res.send(err);
        res.json(contact);
        console.log(contact);
    });    
};

// ------------------------------------------------
// update
exports.update = function(req, res) {
    Contact.findOndAndUpdate({_id: req.params.contact_id}, 
        req.body, {new:true}, function(err, contact) {
        if(err)
            res.send(err);
        res.json(contact);
    });    
};

// delete
exports.delete = function(req, res) {

    Contact.remove({
      _id: req.params.contact_id
    }, function(err, contact) {
      if (err)
        res.send(err);
      res.json({ message: 'Contact successfully deleted' });
    });
  };
  

