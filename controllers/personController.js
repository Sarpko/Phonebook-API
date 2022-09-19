const db = require('../models');
const { Op } = require("sequelize");

const Person = db.person;

const addPerson = async (req, res) =>{

    let info = {
        firstname: req.body.firstname,
        surname: req.body.surname,
        company: req.body.company,
        phoneNumbers: req.body.phoneNumbers,
        userId: req.body.userId,
    }

    try {
        const persons = await Person.create(info)
        res.send({ message: "Person created successfully!" });
      } catch(err) {
        res.status(400).send({ message: err.message });
        console.log(err); 
      }
}

const findAllPersons = async (req, res) =>{

    try {
        const persons = await Person.findAll(
            {
                where: {
                    userId: req.body.userId,
                }
            }
        );
        res.send(persons);
      } catch(err) {
        res.status(400).send({ message: err.message });
        console.log(err); 
      }

}

const deleteSinglePerson = async (req, res) =>{

    try {
        const person = await Person.destroy(
            {
                where: {
                    [Op.and] :[{
                        id: req.body.id,
                        userId: req.body.userId,
                    }],
                }
            }
        );
        res.send("Person deleted successfully!");
      } catch(err) {
        res.status(400).send({ message: err.message });
        console.log(err); 
      }

}

const updateSinglePerson = async (req, res) =>{

    try {
        const person = await Person.update(
            {
                firstname: req.body.firstname,
                surname: req.body.surname,
                company: req.body.company,
                phoneNumbers: req.body.phoneNumbers,
           
            },
            {
                where: {
                    [Op.and] :[{
                        id: req.body.id,
                        userId: req.body.userId,
                    }],
                }
            }
        );
        if(person == 1){
            res.send("Person updated successfully!");
        }else {
            res.status(400).send("Person not found!");
        }
      } catch(err) {
        res.status(400).send({ message: err.message });
        console.log(err); 
      }

}

const findPersons = async (req, res) =>{

    try {
        const persons = await Person.findAll(
            {
                where: {
                    userId: req.body.userId,
                    [Op.and] :[{
                        firstname: {
                            [Op.like]:req.body.firstname ? '%'+ req.body.firstname + '%' : "%%",
                        }},
                        {
                        surname: {
                            [Op.like]: req.body.surname ? '%'+  req.body.surname + '%' : "%%",
                        }},
                        {
                        company: {
                            [Op.like]:req.body.company ? '%'+ req.body.company + '%' : "%%",
                        }},
                        {
                        phoneNumbers: {
                            [Op.like]:req.body.phoneNumbers ? '%'+ req.body.phoneNumbers + '%': "%%",
                        }}
                    ],
                }
            }
        );
        res.send(persons);
      } catch(err) {
        res.status(400).send({ message: err.message });
        console.log(err); 
      }

}

module.exports = {
    addPerson,
    findAllPersons,
    deleteSinglePerson,
    updateSinglePerson,
    findPersons
}