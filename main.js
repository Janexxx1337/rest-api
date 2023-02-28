//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://admin-angela:123@cluster0.9ykoiev.mongodb.net/?retryWrites=true&w=majority')

const articleSchema = {
    title: String,
    content: String,
}

const Article = mongoose.model('Article', articleSchema)

app.route('/articles')

    .get((req, res) => {
        Article.find((err, result) => {
            if (!err) {
                res.send(result)
            }
        })
    })
    .post((req, res) => {
        // console.log(req.body.title,req.body.content)

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })

        newArticle.save((err) => {
            if (!err) {
                res.send('Successfully added')
            } else {
                res.send(err)
            }
        })
    })
    .delete((req, res) => {
        Article.deleteMany({title: 'function String() { [native code] }'}, (err) => {
            if (!err) {
                res.send('Success')
            } else {
                res.send(err)
            }
        })
    });


app.route('/articles/:articleTitle')
    .get((req, res) => {
        Article.findOne({content: req.params.articleTitle}, (err, result) => {
            if (result) {
                res.send(result)
            } else {
                res.send('No articles match')
            }
        })
    })
    .put((req, res) => {
        Article.updateMany(
            {title: req.params.articleTitle},
            {title: 'HelloMOTO', content: req.body.content},
            (err) => {
                if (!err) {
                    res.send('Success')
                }
            })
    })
    .patch((req, res) => {
        Article.updateOne(
            {title: req.params.articleTitle},
            {$set: req.body},
            (err) => {
                if(!err) {
                    res.send('Success update article')
                } else {
                    res.send(err)
                }
            }
        )
    })
    .delete( (req, res) => {
        Article.deleteMany(
            {title:'You should get up!'},
            (err) => {
                if(!err) {
                    res.send('Successfully delete')
                } else {
                    res.send(err)
                }
            }
        )
    })

app.listen(3000, function () {
    console.log("Server started on port 3000");
});