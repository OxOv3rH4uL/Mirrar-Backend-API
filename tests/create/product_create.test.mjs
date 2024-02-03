import request  from "supertest";
import { expect } from "chai";
import product_details from '../create/data.json' assert { type: "json" };

//Product Variant Stock Count is not specified! in this data
const data = {
    "product_name":"Test_Product1",
    "product_description": "Test_Product_Description1",
    "product_price":"T1000",
    "product_variants":[{
        "variant_name":"T_VAR1",
        "variant_sku":"TEST_SKU1",
        "variant_additionalCost":"T1",
        "variant_stockCount":20
    },{
        "variant_name":"T_VAR2",
        "variant_sku":"TEST_SKU2",
        "variant_additionalCost":"T2",
        "variant_stockCount":20
    },{
        "variant_name":"T_VAR3",
        "variant_sku":"TEST_SKU3",
        "variant_additionalCost":"T3",
    }]
}	

describe("Creating Product and Variant Functionality Tests!" , () =>{
    const url = "http://localhost:3001";

        
    describe("Creating a product" , () =>{
        it("Should Create a Product" , (done) =>{
            request(url)
            .post('/create/product')
            .send(product_details)
            .set('Accept','application/json')
            .end(function(err,res){
                expect(res.statusCode).to.be.equal(200);
                expect(res._body).to.be.an('array');
                if(err){
                    throw err;
                }
                done();
            })
        })
    })

    describe("Should Return 500 when we try to insert wrong data",()=>{
        it("Should Return 500" ,(done) =>{
            request(url)
            .post('/create/product')
            .send(data)
            .set('Accept','application/json')
            .end(function(err,res){
                expect(res.statusCode).to.be.equal(500);
                if(err){
                    throw err;
                }
                done();      
            })
        })
    })
})