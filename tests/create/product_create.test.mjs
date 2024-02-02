import request  from "supertest";
import { expect } from "chai";
import product_details from '../create/data.json' assert { type: "json" };



// console.log(product_details);
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
                expect(res.text).to.be.equal("Datas Inserted Successfully!");
                if(err){
                    throw err;
                }
                done();
            })
        })
    })
})