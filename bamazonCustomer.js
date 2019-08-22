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
console.log("Welcome to Bamazon.\n\nClick to view any of the following:");

inquirer.prompt([
    type: "list"
    
])
};
