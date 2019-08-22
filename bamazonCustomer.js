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
    InquireItems();
});

function InquireItems(){
console.log("Welcome to Bamazon.\n The following is our current store selection:");
connection.query = "SELECT * from products";
inquirer.prompt([
    {type: "list",
    name: "viewOptions",
    message: "What would you like to locate?",
    choices: ["View all items by categories:",
        "View all items by within a certain price range:",
        "View all items in store:",
        "Exit:"
        ]
    }
]). then(answer=>{
    switch(answer.action){
        case "View all items by categories:":
            categories();
        case "View all items by within a certain price range:":
            prices();
        case "View all items in store:":
            items();
        case "Exit:":
            exit();
    }
});
}

