// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var Contact = require("./models/Contact");
var async = require("async");
var mongoose = require("mongoose");

var mongoDB = userArgs[0];

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var contacts = [];
function contactCreate(first_name, last_name, username, password, cb) {
  contactDetail = { first_name, last_name, username, password };

  var contact = new Contact(contactDetail);

  contact.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Author: " + contact);
    contacts.push(contact);
    cb(null, contact);
  });
}

function createContacts(cb) {
  async.series(
    [
      function (callback) {
        contactCreate("admin", "admin", "admin", "admin", callback);
      },
      function (callback) {
        contactCreate("user1", "user1", "user1", "user1", callback);
      },
      function (callback) {
        contactCreate("user2", "user2", "user2", "user2", callback);
      },
      function (callback) {
        contactCreate("user3", "user3", "user3", "user3", callback);
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createContacts],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("contacts: " + contacts);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
