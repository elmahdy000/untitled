var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers');

/* GET users listing. */
router.get('/', function(req, res, next) {
    database.table('orders_details as od').join([
        {
            table : 'orders as o',
            on : 'o.id = od.order_id'
        },
        {
            table : 'products as p',
            on :'p.id = od.product_id'
        },
        {
            table : 'users as u',
            on : 'u.id = o.user_id'
        }
    ]).withFields(
        ['o.id','p.title as name','p.image','p.description','p.price','u.username']
    ).sort({id:1})
        .getAll()
        .then(
            orders =>{
                if(orders.length >0)
                {
                    res.status(200).json(orders);
                }else {
                    res.json('No Orders Found');
                }
            }
        ).catch(err =>console.log(err));
});
router.get('/:id', function(req, res, next) {

    const order_id = req.params.id;
    database.table('orders_details as od').join([
        {
            table : 'orders as o',
            on : 'o.id = od.order_id'
        },
        {
            table : 'products as p',
            on :'p.id = od.product_id'
        },
        {
            table : 'users as u',
            on : 'u.id = o.user_id'
        }
    ]).withFields(
        ['o.id','p.title as name','p.image','p.description','p.price','u.username']
    )
        .filter({'o.id' : order_id})
        .getAll()
        .then(
            orders =>{
                if(orders.length >0)
                {
                    res.status(200).json(orders);
                }else {
                    res.json(`No Order Found with id : ${order_id}`);
                }
            }
        ).catch(err =>console.log(err));
});

router.post('/new',(req,res)=>{

    let {userId,products} = req.body;
    console.log(userId,products);


});
module.exports = router;
