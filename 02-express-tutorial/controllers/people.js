const { people } = require('../data.js');

function addPerson(req, res) {
    if (!req.body.name) {
        return res.status(400).json({ success: false, message: "Please provide a name" });
    }
    people.push({ id: people.length + 1, name: req.body.name });
    res.status(201).json({ success: true, name: req.body.name });
}

function getPeople(req, res) {
    res.json(people);
}

function getPerson(req,res) {
    const personId = parseInt(req.params.id);
    const person = people.find(person => person.id === personId);  
    if (!person) {
        return res.status(404).json({ message: "Person not found" });
    }  
    res.status(200).json(person);
    
}

function updatePeople(req, res) {
    const personId = parseInt(req.params.id);
    const updatedName = req.body.name;
    const personIndex = people.findIndex(person => person.id === personId);
    if (personIndex === -1) {
        return res.status(404).json({ message: "Person not found" });
    }
    people[personIndex].name = updatedName;
    res.json({ success: true, message: "Person updated successfully" });
}

function deletePerson(req, res) {
    const personId = parseInt(req.params.id);
    const updatedPeople = people.filter(person => person.id !== personId);
    if (updatedPeople.length === people.length) {
        return res.status(404).json({ message: "Person not found" });
    }
    people.splice(0, people.length, ...updatedPeople);
    res.json({ success: true, message: "Person deleted successfully" });
}

module.exports = { addPerson, getPeople, getPerson, updatePeople, deletePerson };