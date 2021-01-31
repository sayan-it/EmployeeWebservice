var express = require("express");
var routing = express.Router();

var DAL = require("../public/javascripts/EmployeeDAL.js");

//insert an employee
routing.post("/InsertEmployee", function(req, res) {
  let empData={
    name:req.body.name,
    age:req.body.age
  }
  console.log(empData);
  //res.json({ message: "data came" })
  return DAL.insertEmp(empData).then(function(items) {
    if (items != null)
      res.json({
        message:
          "Saved Successfully"
      });
    else {
      res.status(500);
      res.json({ message: "Could not save employee data" });
    }
  });
});

//update employee details
routing.post("/updateEmployeeDetails", function(req, res) {
  let empData={
    updateName:req.body.prevName,
    name:req.body.name,
    age:req.body.age
  }
  return DAL.updateEmp(empData, req, res)
    .then(function(items) {
      res.json({
        message:
          "Successfully Updated"
      });
    })
    .catch(function(err) {
      res.json({ message: "sorry, Error here" });
    });
});

//get all the employees
routing.get("/retreiveEmployeelist", function(req, res) {
  console.log(
    "request received for retreiving employee details from database!!"
  );
  return DAL.findEmp()
    .then(function(items) {
      res.json(items);
    })
    .catch(function(err) {
      res.json({ message: "sorry, Error here" });
    });
});

module.exports = routing;
