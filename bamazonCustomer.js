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
    InquireItems();
    //InquireItems();
});
function InquireItems(){
    console.log("Welcome to Bamazon.\n The following is our current store selection:\n");
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        // console.log(res.RowDataPacket.product_name);
        for (var i=0; i< res.length; i++){
            console.log(res[i].item_id + "\t||\t"+ res[i].product_name+ " || "+ res[i].department_name+ " || "+ res[i].price+ " || "+res[i].stock_quantity+"\n");
        }  
        CustomerOptions();
    });
};

// give the users an option for viewing items
function CustomerOptions(){

    inquirer.prompt([
        {type: "list",
        name: "viewOptions",
        message: "What would you like to locate?",
        choices: ["View all items by department:",
            "View all items by within a certain price range:",
            "Make a purchase on an item above:",
            "Exit:"
            ]
        }
    ]). then(answer=>{
        //switch case in order to parse out user's want of viewing products
        switch(answer.viewOptions){
            case "View all items by department:":
                categories();
                break;
            case "View all items by within a certain price range:":
                prices();
                break;
            case "Make a purchase on an item above:":
                items();
                break;
            case "Exit:":
                exit();
                break;
        }
    });
};

// view items in categories
function categories(){
    console.log("\nPlease select a department: ");
};

//view items in range of certain prices
function prices(){
    console.log ("\nPlease select a price range: ");
};

//view all items
function items(){
    console.log("\nReady to purchase an item?\n Please select which item you would like: ");
};

// exit store application
function exit(){
    console.log("\nThank you for visiting bamazon! We hope that you will return!");
};

