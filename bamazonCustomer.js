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
});

function InquireItems(){
    console.log("Welcome to Bamazon.\n The following is our current store selection:\n");
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        // console.log(res.RowDataPacket.product_name);
        for (var i=0; i< res.length; i++){
            console.log(res[i].item_id + "\t||\t"+ res[i].product_name+ " || "+ res[i].department_name+ " || "+ res[i].price+ " || "+res[i].stock_quantity+"\n");
        }  
        CustomerOptions(res);
    });
};

//view all items
var CustomerOptions = function(res){
    console.log("\nReady to purchase an item?\n Please select which item you would like from above:\n`````````````````````````````````\n");
    inquirer.prompt([
        {
            type: "input",
            name: "purchase",
            message: "What would you like to purchase? [Press 'Q' to exit.]"
        }
    ]). then(function(userAnswer){
      var correct = false;
      if(userAnswer.purchase.toUpperCase()=="Q"){
          console.log("Thank you for visiting Bamazon!")
          process.exit();
      }
      for(var i=0; i<res.length; i++){
        if (res[i].product_name==userAnswer.purchase){
            correct = true;
            var product = userAnswer.purchase;
            let id= i;
            inquirer.prompt([
                {
                    type: "input",
                    name: "quant",
                    message: "Quantity of "+ userAnswer.purchase + " in purchase?", 
                    validate: function(value){
                        if (isNaN(value)==false){
                            return true;
                        } else {
                            return false;
                        }
                    }

                }
            ]).then(function(userAnswer){
                if ((res[id].stock_quantity-userAnswer.quant)>=0){
                    connection.query("UPDATE products SET stock_quantity ='"+(res[id].stock_quantity- userAnswer.quant)+"' WHERE product_name='"+product+"'",function(err, res2){
                        console.log("Product Purchased");
                        InquireItems();
                    })
                } else {
                    console.log("Not a valid selection.");
                    CustomerOptions(res);
                }
            })
        }
      }
      if(i==res.length && correct == false){
          console.log("Not a valid selection.");
          CustomerOptions(res);
      }
    });
};

