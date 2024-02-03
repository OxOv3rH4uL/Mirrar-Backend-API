import request  from "supertest";
import { expect } from "chai";
import updated_product_details from '../update/update_product.json' assert {type: "json" };

describe("Update Product API Testing" , () => {
    const url = 'http://localhost:3001';
    const product_id = '1';
    it("Update Product" , (done) => {
        request(url)
        .put('/update/product/' + product_id)
        .send(updated_product_details)
        .set('Accept','application/json')
        .end(function(err,res){
            expect(res.statusCode).to.be.equal(200);
            expect(res.text).to.be.equal("Updated Successfully!")
            if(err){
                throw err;
            }
            done();
        })
    })
})