var MongoClient = require("mongodb");
var driver = {};
var conn = MongoClient.connect("mongodb://localhost:27017/Data_DB");

//get all employees
driver.findEmp = function () {
  return conn
    .then(function (mongoClientInstance) {
      var dataBase = mongoClientInstance.db();
      var collection = dataBase.collection("Employee");
      return collection
        .find()
        .project({ _id: 0 })
        .toArray();
    })
    .then(function (items) {
      console.log(items);
      return items;
    });
};
//update employee
driver.updateEmp = function (empData, req) {
  return conn.then(function (mongoClientInstance) {
    var dataBase = mongoClientInstance.db();
    var collection = dataBase.collection("Employee");
    return collection
      .findOneAndUpdate(
        { name: empData.updateName },
        {
          $set: {
            name: empData.name,
            age: empData.age,
          }
        },
        { returnOriginal: false }
      )
      .then(function (result) {
        return result.value;
      });
  });
};
//insert a new employee
driver.insertEmp = function (empData) {
  return conn.then(function (mongoClientInstance) {
    var dataBase = mongoClientInstance.db();
    var collection = dataBase.collection("Employee");
    return collection.insertOne(empData).then(function (result) {
      if (result.insertedCount > 0) return result.ops[0];
      else return null;
    });
  });
};

module.exports = driver;
