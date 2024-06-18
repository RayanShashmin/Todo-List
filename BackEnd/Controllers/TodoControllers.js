const TodoModel = require('../models/TodoModels');

module.exports.getToDo = async (req, res) => {
    try {
        const ToDo = await TodoModel.find();
        res.status(200).send(ToDo);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.saveToDo = async (req, res) => {
    const { text } = req.body;
    try {
        await TodoModel.create({ text });
        res.status(200).send("Added Successfully.");
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.deleteToDo = async (req, res) => {
    const { _id } = req.body;
    try {
        await TodoModel.findByIdAndDelete(_id);
        res.status(200).send("Deleted Successfully.");
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.updateToDo = async (req, res) => {
    const { _id, text, completed } = req.body;
    try {
        await TodoModel.findByIdAndUpdate(_id, { text, completed });
        res.status(200).send("Updated Successfully.");
    } catch (err) {
        res.status(500).send(err);
    }
};
