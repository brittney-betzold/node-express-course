const express = require("express");
const router = express.Router();
const { addPerson, getPeople, getPerson, updatePeople, deletePerson } = require("../controllers/people.js");

router.get('/', getPeople);
router.get('/:id', getPerson);
router.post('/', addPerson);
router.put('/:id', updatePeople);
router.delete('/:id', deletePerson);

module.exports = router;