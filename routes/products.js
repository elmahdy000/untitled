var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers');


/* GET home page. */
router.get('/', function (req, res, next) {

    let page = (req.query.page != undefined && req.query.page != 0 ) ? req.query.page : 1;
    let limit = (req.query.limit != undefined && req.query.limit != 0 ) ? req.query.limit : 10;

    let startValue;
    let endValue;

    if(page >0)
    {
        startValue = (page*limit)-limit;
        endValue = page * limit;
    }
    else
    {
        startValue  = 0;
        endValue = 10;
    }


    database.table('products as p').join(
        [{
            table: 'categories as c',
            on: 'c.id = p.cat_id'

        }]
    ).withFields(
        [
            'c.title as Category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.image',
            'p.id'
        ]
    ).slice(startValue,endValue).sort({id:.1})
        .getAll()
        .then(
            prods=>
            {
                if(prods.length > 0)
                {
                    res.status(200).json({
                        count : prods.length,
                        products : prods
                    });
                }else
                {
                    res.json({message : "No products Found"})
                }
            }
        ).catch(err =>console.log(err));
});
router.get('/:prodId',(req,res)=>{

    let prodId = req.params.prodId;
    console.log(prodId);

    database.table('products as p').join(
        [{
            table: 'categories as c',
            on: 'c.id = p.cat_id'

        }]
    ).withFields(
        [
            'c.title as Category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.image',
            'p.images',
            'p.id'
        ]
    ).filter({
        'p.id' : prodId
    })
        .get()
        .then(
            prod=>
            {
                if(prod)
                {
                    res.status(200).json(prod);
                }else
                {
                    res.json({message : `No product Found with product Id : ${prodId}`})
                }
            }
        ).catch(err =>console.log(err));



});
router.get('/category/:catName',(req,res)=>{

    let page = (req.query.page != undefined && req.query.page != 0 ) ? req.query.page : 1;
    let limit = (req.query.limit != undefined && req.query.limit != 0 ) ? req.query.limit : 10;

    const cat_title = req.params.catName;


    let startValue;
    let endValue;

    if(page >0)
    {
        startValue = (page*limit)-limit;
        endValue = page * limit;
    }
    else
    {
        startValue  = 0;
        endValue = 10;
    }


    database.table('products as p').join(
        [{
            table: 'categories as c',
            on: `c.id = p.cat_id and c.title like '%${cat_title}%'`


        }]
    ).withFields(
        [
            'c.title as Category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.image',
            'p.id'
        ]
    ).slice(startValue,endValue)
        .sort({id:.1})
        .getAll()
        .then(
            prods=>
            {
                if(prods.length > 0)
                {
                    res.status(200).json({
                        count : prods.length,
                        products : prods
                    });
                }else
                {
                    res.json({message : "No products Found"})
                }
            }
        ).catch(err =>console.log(err));
})
module.exports = router;
