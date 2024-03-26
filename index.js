console.log("Harshal is a hero, just a lazy one.");
console.log("Somehow this stupid guy works");

let fs = require("fs");
let os = require("os");

let user = os.userInfo();
console.log(user);

fs.appendFile('greetings.txt', 'Hi' + user.username + '!',()=>{console.log("New file named greetings.txt is created")});