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
        message: "What would you like to do?",
        choices: ["View all items by department:",
            "Make a purchase on an item above:",
            "Exit:"
            ]
        }
    ]). then(answer=>{
        //switch case in order to parse out user's want of viewing products
        switch(answer.viewOptions){
            case "View all items in a specific department:":
                categories();
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
    console.log("\nPlease select a department:\n`````````````````````````````````\n");
};

//view all items
function items(){
    console.log("\nReady to purchase an item?\n Please select which item you would like from above:\n`````````````````````````````````\n");
    inquirer.prompt([
        {
            type: "input",
            name: "purchase",
            message: "What would you like to purchase? [Press 'Q' to exit.]"
        }
    ]). then(userAnswer=>{
      let correct = false;
      for(let i=0; i<res.length; i++){
        if (res[i].productname==userAnswer.purchase){
            correct = true;
            let product = userAnswer.purchase;
            let id= i;
            inquirer.prompt([
                {
                    type: "input",
                    name: "quantityItem",
                    message: "Quantity of "+ userAnswer.purchase, 
                    validate: function(value){
                        if (isNaN(value)==false){
                            return true;
                        } else {
                            return false;
                        }
                    }

                }
            ]).then(function(answer){
                if ((res[id].stock_quantity.answer.quantityItem)>0){
                    connection.query("UPDATE products SET stock_quantity ='"+(res[id].stock_quantity-answer.quantityItem)+"' WHERE product_name='"+product+"'",function(err, res2){
                        console.log("Product Purchased");
                        makeTable();
                    })
                } else {
                    console.log("Not a valid selection.");
                    promptCustomer(res);
                }
            })
        }
      }

    });
};

// exit store application
function exit(){
    console.log("\nThank you for visiting bamazon! We hope that you will return!\n");
};

