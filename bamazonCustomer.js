let mysql = require('mysql');
let inquirer = require('inquirer');

//create connection
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect((err)=>{
    if(err) {throw err;}
    console.log('MySQL now connected...');
    inquireItems();
});

function inquireItems(){
console.log("Welcome to Bamazon.\n The following is our current store selection:");
connection.query = "SELECT * "
inquirer.prompt([
    type: "list",
    name: "viewOptions",
    message: "What would you like to locate?"
    
])
};
