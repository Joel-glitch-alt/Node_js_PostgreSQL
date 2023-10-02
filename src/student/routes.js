const { Router } = require ('express');
// router object
const router = Router();
//
const controller = require('./controllers');

//creating router root;
router.get('/', controller.getStudents);

//posting data to the database
router.post('/', controller.addStudent);

//
router.get('/:id', controller.getStudentById);

//update Student....
router.put('/:id',controller.updateStudent);

//delete 
router.delete('/:id', controller.removeStudent);


module.exports = router;
