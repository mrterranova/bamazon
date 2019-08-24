// adding appropriate connections to the products
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

//create conection to mysql
connection.connect((err)=>{
    if(err) {throw err;}
    console.log('You are now connected to bamazon...');
    readDB();
    //InquireItems();
});
function readDB(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        // console.log(res.RowDataPacket.product_name);
        for (var i=0; i< res.length; i++){
            console.log(res[i].item_id + " ||\t"+ res[i].product_name+ " ||\t"+ res[i].department_name+ " ||\t"+ res[i].price+ " ||\t"+res[i].stock_quantity+"\n");
        }
        
    });
}

// give the users an option for viewing items
function InquireItems(){
console.log("Welcome to Bamazon.\n The following is our current store selection:");



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
    //switch case in order to parse out user's want of viewing products
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
};

// view items in categories
function categories(){

};

//view items in range of certain prices
function prices(){

};

//view all items
function items(){

};

// exit store application
function exit(){

};

