import request  from "supertest";
import { expect } from "chai";
import update_variant_details from '../update/update_variant.json' assert {type:"json"};

describe("Update Variant API Test" , () =>{
    const url = 'http://localhost:3001';
    const product_id = '45';
    const variant_id = '80';
    it("Update Variant" , (done) =>{
        request(url)
        .put(`/update/product/${product_id}/variant/${variant_id}`)
        .send(update_variant_details)
        .set('Accept','application/json')
        .end(function(err,res){
            expect(res.statusCode).to.be.equal(200);
            expect(res.text).to.be.equal("Variant Updated Successfully!");
            if(err){
                console.log("Error Happened!");
            }
            done();
        })
    })
})