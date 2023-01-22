const personalInfo = require("../models/personalInfo");

//getALl
class Controller {
    getAll(req, res, next) {
        personalInfo.find((err, response) => {
            if (err) return next(err);
            res.status(200).json({ data: response });
        });
    }

    //get By Id
    getById(req, res, next) {
        let { id } = req.params;
        // if (id.match(/^[0-9a-fA-F]{24}$/)) {
        personalInfo.findOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).json({ success: true, response });
        });
        // } 
        // else
        //     res.status(404).json({ success: false, response: "error" });
    }
    //add
    post(req, res, next) {
        let { filename } = req.file;
        let { name, headline, cv, aboutMe } = req.body;
        let body = { name: name, headline: headline, cv: cv, aboutMe: aboutMe, image: filename };

        let doc = new personalInfo(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    //edit
    put(req, res, next) {
        let { id } = req.params;
        let { name, headline, cv, aboutMe } = req.body;
        let { filename } = req.file || {};
        let data = { name: name, headline: headline, cv: cv, aboutMe: aboutMe, image: filename };
        personalInfo.updateOne({ _id: id }, data, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    //delete
    delete(req, res, next) {
        let { id } = req.params;
        personalInfo.findByIdAndDelete({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }
}

const controller = new Controller();
module.exports = controller;