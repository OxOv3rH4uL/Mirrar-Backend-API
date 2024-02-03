import request  from "supertest";
import { expect } from "chai";
import update_variant_details from '../update/update_variant.json' assert {type:"json"};

describe("Update Variant API Test" , () =>{
    const url = 'http://localhost:3001';
    const product_id = '1';
    const variant_id = '2';
    it("Should Return 404 when wrong id is given" , (done) =>{
        request(url)
        .put("/update/product/1000/variant/1000")
        .send(update_variant_details)
        .set('Accept','application/json')
        .end(function(err,res){
            expect(res.statusCode).to.be.equal(404);
            expect(res.text).to.be.equal("ID NOT FOUND!");
            if(err){
                throw err;
            }
            done();
        })

    })
    it("Update Variant" , (done) =>{
        request(url)
        .put(`/update/product/${product_id}/variant/${variant_id}`)
        .send(update_variant_details)
        .set('Accept','application/json')
        .end(function(err,res){
            expect(res.statusCode).to.be.equal(200);
            expect(res._body).to.be.an('array');
            if(err){
                console.log("Error Happened!");
            }
            done();
        })
    })
})