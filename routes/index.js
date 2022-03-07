var express = require('express');
const { Result } = require('express-validator');
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
            console.log('Failed to retrieve the experiences List: ' + err);
        }
    });
});
// SHOW ADD USER FORM
router.get('/add', function (req, res, next) {

    res.render('add', {
        title: 'Add New experience',
        name: '',
        place: ''
    })
})
// ADD NEW USER POST ACTION
router.post('/add', function (req, res, next) {

    // req.assert('name', 'Name is required').notEmpty() //Validate name
    console.log(req.body)
    //   var errors = req.validationErrors()
    // if (!errors) { //No errors were found.  Passed Validation!
        var userDetails = new Emodel({
            name: req.body.name,
            place: req.body.place
        });
        userDetails.save((err, doc) => {
            if (!err) {
                req.flash('success', 'experience added successfully!');
                res.redirect('/');
            }
    
            else
                res.render('add', {
                    title: 'Add New Experience',
                    name: user.name,
                    place: user.place
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
        console.log(req.body)
        var experience = {
            name: req.body.name,
            place: req.body.place
        }
        // var id=req.body.id;
        // experience.updateOne({"_id":id},{
        //     $set:experience
        // },experience,(err,result)=>{
        //     console.log(err)
        // }
        // )
        // req.flash('success', 'User has been updated successfully!');
        // res.redirect("/index");
        Emodel.updateOne({_id: req.body.id}, {
            $set:experience
        }, function (err, data) {
            if (err) {
                req.flash('error', 'Something Goes to Wrong!');
                res.render('/index');
            } else {
                req.flash('success', 'experience has been updated successfully!');
                res.redirect('/');
            }
        });
    // } else { //Display errors to user
    //     var error_msg = ''
    //     errors.forEach(function (error) {
    //         error_msg += error.msg + '<br>'
    //     })
        // req.flash('error', error_msg)
        /**
        * Using req.body.name 
        * because req.param('name') is deprecated
        */
        // res.render('/edit', {
        //     title: 'Edit experience',
        //     id: req.params.id,
        //     name: req.body.name
        // })
    
})
// DELETE Experince
router.get('/delete/(:id)', function (req, res, next) {
    Emodel.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            req.flash('danger', 'experience has been deleted successfully!');
            res.redirect('/');
        } else {
            console.log('Failed to Delete experience Details: ' + err);
        }
    });
})
module.exports = router;