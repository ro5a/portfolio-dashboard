var express = require('express');
var router = express.Router();

var Emodel = require('../models/Emodel');
/* GET home page. */
router.get('/', function (req, res, next) {
    
    Emodel.find((err, docs) => {
        if (!err) {
            res.render("index", {
                data: docs 
            });
        } else {
            console.log('Failed to retrieve the Users List: ' + err);
        }
    });
});
// SHOW ADD USER FORM
router.get('/add', function (req, res, next) {

    res.render('add', {
        title: 'Add New experience',
        name: ''
    })
})
// ADD NEW USER POST ACTION
router.post('/add', function (req, res, next) {

    // req.assert('name', 'Name is required').notEmpty() //Validate name
    console.log(req.body)
    //   var errors = req.validationErrors()
    // if (!errors) { //No errors were found.  Passed Validation!
        var userDetails = new Emodel({
            name: req.body.name
        });
        userDetails.save((err, doc) => {
            if (!err) {
                req.flash('success', 'User added successfully!');
                res.redirect('/');
            }
    
            else
                res.render('add', {
                    title: 'Add New User',
                    name: user.name
                })
        });
     
    //  else { //Display errors to user
    //     var error_msg = ''
    //     errors.forEach(function (error) {
    //         error_msg += error.msg + '<br>'
    //     })
    //     req.flash('error', error_msg)
    //     res.render('add', {
    //         title: 'Add New User',
    //         name: req.body.name
    //     })
    // }
   
})
// SHOW EDIT USER FORM
router.get('/edit/(:id)', function (req, res, next) {
    Emodel.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("edit", {
                title: "Update experience Details",
                data: doc
            });
        } else {
            req.flash('error', 'experience not found with id = ' + req.params.id)
            res.redirect('/index')
        }
    });
})
// EDIT USER POST ACTION
router.post('/update/:id', function (req, res, next) {
    // req.assert('name', 'Name is required').notEmpty() //Validate nam
    // var errors = req.validationErrors()
    // if (!errors) {
        var experience = {
            name: req.sanitize('name').escape().trim(),
        }
        Emodel.findByIdAndUpdate(req.body.id, {
            name: req.body.name
        }, function (err, data) {
            if (err) {
                req.flash('error', 'Something Goes to Wrong!');
                res.render('index');
            } else {
                req.flash('success', 'User has been updated successfully!');
                res.redirect('/index');
            }
        });
    // } else { //Display errors to user
    //     var error_msg = ''
    //     errors.forEach(function (error) {
    //         error_msg += error.msg + '<br>'
    //     })
        req.flash('error', error_msg)
        /**
        * Using req.body.name 
        * because req.param('name') is deprecated
        */
        res.render('/edit', {
            title: 'Edit experience',
            id: req.params.id,
            name: req.body.name
        })
    
})
// DELETE USER
router.get('/delete/(:id)', function (req, res, next) {
    Emodel.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/index');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
})
module.exports = router;