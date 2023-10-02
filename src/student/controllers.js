const pool= require('../../db'); // importing our database

const queries = require('./queries')

//calling database
const getStudents = (req, res)=>{
    // console.log("getting students");
     pool.query(queries.getStudents, (error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
     });
};

// calling getStudentById api
const getStudentById = (req, res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows)
    }); 
};

//Posting 
const addStudent = (req, res) =>{
    const { name, email, age, dob } = req.body;
    //Checking email already taken...
    pool.query(queries.checkEmailExist, [email], (error, results) =>{
        if (results.rows.length)
        res.send("Email already exists.")
    });

    //add student to database when email doesn't exist..
    pool.query(queries.addStudent, [name, email, age, dob], (error, results) =>{
        if (error) throw error;
        res.status(201).send("Student Created Successfully");
    })
};


const removeStudent = (req, res) =>{
    const id = parseInt(req.params.id);
    
    //check id exist in database..
    pool.query(queries.getStudentById, [id] , (error, results) => {
           const noStudentFound = !results.rows.length;
           if (noStudentFound) {
            res.send("Student does not exist in the Database");
           }

           //Delete id if it exist....
          pool.query(queries.removeStudent, [id], (error, results) =>{
            if (error) throw error;
            res.status(200).send("Student removed successfully");
          })
});
};


const updateStudent = (req, res) =>{
    const id = parseInt(req.params.id);
    const { name } = req.body;
  // checking student exist
    pool.query(queries.getStudentById, [id], (error, results) =>{
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
         res.send("Student does not exist in the Database");
        }


           pool.query(queries.updateStudent, [name, id], (error, results)=>{
            if(error) throw error;
            res.status(200).send("Student updated successfully")
           });
    });
};



module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent
}