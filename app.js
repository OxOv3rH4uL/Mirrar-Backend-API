// const mysql = require('mysql');
// const express = require('express');
// const cors = require('cors');
// const bodyparser = require('body-parser');

import mysql from 'mysql';
import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';

const app = express();
const port = 3001;


app.use(cors());
app.use(bodyparser.json());

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("Internal Server Error!");
})



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
});

db.connect((err) => {
    if (err) {
        console.log("Connection Failed!");
    } else {
        ;
    }
});


function createTables(){
    const query1="create database if not exists MIRRAR ";
    db.query(query1,(err,result)=>{
        if(err){
            console.log("Couldn't Create The Database!");
            return;
        }else{
            db.query("use MIRRAR",(d_err,d_result)=>{
                if(d_err){
                    console.log(`Couldnt Use The Database ${d_err}`);
                    return;
                }else{
                    const product_query=`CREATE TABLE IF NOT EXISTS Product (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        product_name VARCHAR(255) NOT NULL,
                        product_description TEXT NOT NULL,
                        product_price varchar(100) NOT NULL
                    )`;
                    const variant_query=`CREATE TABLE IF NOT EXISTS Variants (
                        variant_id INT PRIMARY KEY AUTO_INCREMENT,
                        variant_name VARCHAR(255) NOT NULL,
                        variant_sku VARCHAR(50) NOT NULL,
                        variant_additionalCost varchar(100) NOT NULL,
                        variant_stockCount INT NOT NULL,
                        product_id INT,
                        FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE
                    )`;
                    db.query(product_query,(prod_err,prod_result)=>{
                        if(prod_err){
                            console.log(`Couldn't create Product Table ${prod_err}`);
                            return;
                        }else{
                            // console.log("Product Table Created Successfully!");
                            db.query(variant_query,(var_err,var_result)=>{
                                if(var_err){
                                    console.log(`Error creating the Variant Table ${var_err}`);
                                    return;
                                }else{
                                    // console.log("Variant Table Created Successfully!");
                                    ;
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}



createTables();




app.get('/', (req, res) => {
    const query = 'SHOW TABLES';
    db.query(query, (err, result) => { 
        if (err) {
            res.status(500).send(`Internal Server Error : ${err}`);
        } else {
            res.status(200).json(result); 
        }
    });
});

// CREATE A PRODUCT
app.post('/create/product',(req,res) => {
    const prod = req.body;
    const name = prod.product_name;
    const description = prod.product_description;   
    const price = prod.product_price;
    const variant = prod.product_variants;
    
    if(!name || !description || !price || variant === undefined){
        res.status(400).send("Make sure to Enter All Details");
        return;
        // process.exit(0);
    }
    try{

        let product_id = -1;
        const query = "INSERT INTO PRODUCT(product_name,product_description,product_price) VALUES(?,?,?)";
        db.query(query,[name,description,price],(err,result)=>{
            if(err){
                res.status(500).send("Cannot create product. Make sure to enter all details");
                return;
            }else{
                const q = "SELECT id from PRODUCT ORDER BY ID DESC LIMIT 1";
                db.query(q,(err,result)=>{
                    if(err){
                        res.status(500).send(`Internal Server Error: ${err}`);
                        return;
                    }else{
                        product_id = result[0].id;
                        // console.log(product_id);
                        let a = [];
                        const quer = "INSERT INTO VARIANTS(variant_name,variant_sku,variant_additionalCost,variant_stockCount,product_id) values(?,?,?,?,?)";
                        for(var i=0 ; i < variant.length ; i++){
                            const variantName = variant[i].variant_name;
                            const variantsku = variant[i].variant_sku;
                            const additional_cost = variant[i].variant_additionalCost;
                            const stock_count = variant[i].variant_stockCount;
                            if(!variantName || !variantsku || !additional_cost || !stock_count){
                                a.push(1);
                                break;
                                
                            }else{
                                db.query(quer,[variantName,variantsku,additional_cost,stock_count,product_id],(err,result)=>{
                                    if(err){
                                        res.status(500).send(`Internal Server Error: ${err}`);
                                        return;
                                    }else{
                                        ;
                                    }
                                });
                            }
                        }
                        // console.log(a.length);
                        if(a.length > 0){
                            db.query("delete from product where id = ?",[product_id],(del_err,del_result)=>{
                                if(del_err){
                                    console.log("ERROR!");
                                }else{
                                    ;
                                }
                            })
                            res.status(500).send("Make sure to Give All Variant Details Properly!");
                            // return;
                        }else{
                            res.status(200).send("Datas Inserted Successfully!");
                        }
                    }
                })
            }
            
        });

    }
    catch(err){
        console.log(`ERROR!: ${err}`);
    }

})

//GET EVERY PRODUCTS AND THEIR VARIANTS
app.get('/product_variants',(req,res)=>{
    const query = "select * from product,variants where variants.product_id=product.id";
    db.query(query,(err,result)=>{
        if(err){
            res.status(404).send("CANNOT RETRIEVE ALL DATA");
        }else{
            res.status(200).json(result);
        }
    })
})

// GET PRODUCT ALONE
app.get('/products',(req,res)=>{
    const query = "select * from product";
    db.query(query,(err,result)=>{
        if(err){
            res.status(404).send("CANNOT RETRIEVE ALL PRODUCT")
        }else{
            res.status(200).json(result);
        }
    })
})



//SEARCH BY NAME
app.get('/search/name/:name',(req,res) => {
    const name = req.params.name;
    const query = "SELECT * FROM product,variants WHERE product_name LIKE ? and product.id = variants.product_id";
    db.query(query, [`%${name}%`], (err, result) => {
        if(err){
            res.status(404).send("NOT FOUND!");
        } else {
            res.status(200).json(result); 
        }
    });
});


//SEARCH BY DESCRIPTION
app.get('/search/desc/:description',(req,res) => {
    const des = req.params.description;
    const query = "SELECT * FROM product,variants WHERE product.product_description LIKE ? and product.id = variants.product_id";
    db.query(query, [`%${des}%`], (err, result) => {
        if(err){
            res.status(404).send("NOT FOUND!");
        } else {
            res.status(200).json(result); 
        }
    });
});

// SEARCH BY VARIANT NAME
app.get('/search/variant_name/:name',(req,res) => {
    const varName = req.params.name;
    const query = "SELECT product.*, variants.* FROM product JOIN variants ON variants.variant_id = product.id WHERE variants.variant_name LIKE ?";
    db.query(query,[`%${varName}%`],(err,result)=>{
        if(err){
            res.status(404).send("NOT FOUND!");
        }else{
            res.status(200).json(result);
        }
    })
})


// SEARCH ANOTHER METHOD
app.get('/search',(req,res)=>{
    let search_query = "";
    if(req.query?.name){
        search_query = req.query.name;
        const query = "SELECT * FROM product,variants WHERE product_name LIKE ? and product.id = variants.product_id";
        db.query(query, [`%${search_query}%`], (err, result) => {
            if(err){
                res.status(404).send("NOT FOUND!");
            } else {
                res.status(200).json(result); 
            }
        });
    }else if(req.query?.desc){
        search_query = req.query.desc;
        const query = "SELECT * FROM product,variants WHERE product_description LIKE ? and product.id = variants.product_id";
        db.query(query, [`%${search_query}%`], (err, result) => {
            if(err){
                res.status(404).send("NOT FOUND!");
            } else {
                res.status(200).json(result); 
            }
        });
    }else if(req.query?.variant_name){
        search_query = req.query.variant_name;
        //another way of writing this one it seems mysql ftw
        const query = "SELECT product.*, variants.* FROM product JOIN variants ON variants.product_id = product.id WHERE variants.variant_name LIKE ?";
        db.query(query,[`%${search_query}%`],(err,result)=>{
            if(err){
                res.status(404).send("NOT FOUND!");
            }else{
                res.status(200).json(result);
            }
        });
    }
})




//DELETE PRODUCT BY ID
app.delete('/delete/product/:id',(req,res) =>{
    const id = req.params.id;
    const query = "delete from product where id=?";
    db.query(query,[id],(err,result)=>{
        if(err){
            res.status(500).send(`Internal Server Error:${err}`);
            return;
        }else{
            if(result.affectedRows == 0){
                res.status(404).send("ID NOT FOUND!");
                return;
            }else{

                res.status(200).json("DELETED SUCCESSFULLY");
            }
        }
    });
})



// UPDATE PRODUCT DETAIL BY ID
app.put('/update/product/:id', (req, res) => {
    const productId = req.params.id;
    const upProd = req.body;    
    const upname = upProd.product_name;
    const updescription = upProd.product_description;
    const upprice = upProd.product_price;
    if(!upname || !updescription || !upprice){
        res.status(400).send("Make sure to Give All The Product Details for Updating!");
        return;
    }
    // const upVariants = upProd.product_variants;
    
    const query1 = "update product set product_name = ? , product_description = ? , product_price = ? where id = ?";
    try{

        db.query(query1,[upname,updescription,upprice,productId],(err,result)=>{
            if(err){
                res.status(500).send("Internal Server Error!");
                return;
            }else{
                if(result.affectedRows == 0){
                    res.status(404).send("ID NOT FOUND!");
                }else{
                    res.status(200).send("Updated Successfully!");
                }
            }
        })
    }
    catch(err){
        console.log(`ERROR!: ${err}`);
    }

});


//UPDATING VARIANT OF THE PRODUCT BY VARIANT ID
app.put('/update/product/:productId/variant/:variantId',(req,res) =>{
    const prodId = req.params.productId;
    const varId = req.params.variantId;
    const updated_variant = req.body;
    const updated_name = updated_variant.variant_name;
    const updated_sku = updated_variant.variant_sku;
    const updated_additional_cost = updated_variant.variant_additionalCost;
    const updated_sc = updated_variant.variant_stockCount;

    if(!updated_variant || !updated_name || !updated_sku || !updated_additional_cost || !updated_sc){
        res.status(400).send("Make Sure to Enter All the Variant Details to Update!");
        return;
    }
    // console.log(updated_variant);
    const query = "update variants set variant_name = ? , variant_sku = ? , variant_additionalCost = ? , variant_stockCount = ? where variant_id = ? and product_id = ?";
    db.query(query,[updated_name,updated_sku,updated_additional_cost,updated_sc,varId,prodId],(err,result)=>{
        if(err){
            res.status(500).send(`Internal Server Error: ${err}`);
            return;
        }else{
            if(result.affectedRows == 0){
                res.status(404).send("ID NOT FOUND!");
                return;
            }else{

                res.status(200).send("Variant Updated Successfully!");  
            }
        }
    })
})
app.use((req,res,next)=>{
    res.status(404).send("Not Found!");
})

app.listen(port, () => {
    ;
});

export default app;