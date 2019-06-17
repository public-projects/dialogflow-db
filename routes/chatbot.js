var express = require('express');
var router = express.Router();

router.get("/test", (request, response) => {
    console.log("/chatbot/test server in module!");
    response.send('/chatbot/test server in module!');
});

router.get("/del", (request, response) => {
    console.log("/chatbot/del server!");
    database.collection("all").deleteMany({});
    response.send('deleting!');
});

router.post("/find", (request, response) => {
    collection.findOne({ "question": request.body.question }, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

router.post("/update", (request, response) => {
    collection.insertOne({ "question": request.body.question, "answer": request.body.answer }, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

module.exports = router;