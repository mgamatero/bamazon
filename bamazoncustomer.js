var mysql = require('mysql')
var inq = require('inquirer')
var pmpt = inq.createPromptModule()

var config = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bamazon',
  port: 3308
})

function openConnection() {
  config.connect(function (e) {
    if (e) throw e
  })
}

function closeConnection() {
  config.end(function (e) {
    if (e) throw e
  })
}

//diplays 
function displayItems() {
  //openConnection() - debug?
  config.query('SELECT * FROM products', function (e, r) {
    if (e) { console.log(e) }
    for (var i = 0; i < r.length; i++) {
      for (var key in r[i]) {
        if (key === 'price') {
          console.log(key + ": $" + r[i][key])
        }
        else {
          console.log(key + ": " + r[i][key])
        }
      }
      console.log('\n')
    }
  })
  //brings it back to main menu
  start()
  //closeConnection() - debug?
}

var buyQry = [
  {
    type: 'input',
    name: 'itemIndex',
    message: 'What item_id are you buying?'
  },
  {
    type: 'input',
    name: 'quantity',
    message: 'Quantity?'
  }
]

function buyQuestions() {
  pmpt(buyQry).then(function (r) {
    makeBuy(r.itemIndex, r.quantity)
    //console.log(r.itemIndex, r.quantity) - debug
  })
}

function makeBuy(itemNum, itemQuantity) {
  // openConnection - debug?


  var checkStock = `
  SELECT stock_quantity,price,product_name FROM products 
  WHERE item_id = ?
  `
  config.query(checkStock, itemNum, function (e, r) {
    if (e) { throw e }
    //Checks if there is enough stock, and update table if so
    if ((parseInt(JSON.stringify(r[0].stock_quantity))) >= itemQuantity) {
      var newStockQuantity = (parseInt(JSON.stringify(r[0].stock_quantity))) - itemQuantity
      var totalPrice =  (parseFloat(JSON.stringify(r[0].price))) * itemQuantity
      var product = r[0].product_name
      console.log("Congratulations, you bought " + itemQuantity + " "+product+ " (item_index#" + itemNum+ ")")
      console.log("Total Price: " + totalPrice)
      console.log("New Stock Quantity: " + newStockQuantity)
         

      // updates table
      var updateStock = `
      UPDATE products SET stock_quantity = `+ newStockQuantity+
      ` WHERE item_id = `+itemNum
            
      var updateParameters = { newStockQuantity, itemNum }
      config.query(updateStock, function (e, r) {
        if (e) { throw e }
      })
          
      start()
    }
    else {
      console.log("Insufficient stock, there are only " + JSON.stringify(r[0].stock_quantity) + " items available.")
      start()
    }
  })
}





function start() {
  var viewBuyQuestions = [
    {
      type: 'list',
      name: 'viewOrBuy',
      message: 'Would you like to [View] or [Buy]?',
      choices: ['View', 'Buy']
    }
  ]

  pmpt(viewBuyQuestions).then(function (r) {
    switch (r.viewOrBuy) {
      case "View":
        displayItems()
        break
      case "Buy":
        buyQuestions()
        break
    }
  })
}

//runs the whole program
start()




//TO BE IMPLEMENTED LATER
//var updateStockParams = {newStockQuantity,itemNum}
  //*********************************************************** */
  //Trouble here - asynchronous call so there is no value for newStockQuantity. I ended up
  //hardcoding stock_quantity = 0 instead.  That works fine

  // console.log(newStockQuantity)
  // console.log(stockAvailable)

  // 
  // })


  //   var values = {
  //     product_name: itemNum,
  //     price: itemQuantity
  //   }
  //   var insertQry = `
  //     INSERT INTO products
  //     SET ?
  // `

  // config.query(insertQry,values,function(e,r){
  // if (e) {throw e}

  // })

  // closeConnection()




