import request  from "supertest";
import { expect } from "chai";
import updated_product_details from '../update/update_product.json' assert {type: "json" };

describe("Update Product API Testing" , () => {
    const url = 'http://localhost:3001';
    const product_id = '1';
    it("Should return 404 when wrong id is given" , (done)=>{
        request(url)
        .put('/update/product/1000')
        .send(updated_product_details)
        .set('Accept','application/json')
        .end(function(err,res){
            expect(res.statusCode).to.be.equal(404);
            expect(res.text).to.be.equal("ID NOT FOUND!")
            if(err){
                throw err;
            }
            done();
        })
    })
    it("Update Product" , (done) => {
        request(url)
        .put('/update/product/' + product_id)
        .send(updated_product_details)
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