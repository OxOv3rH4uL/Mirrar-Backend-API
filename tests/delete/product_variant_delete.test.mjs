import request  from "supertest";
import { expect } from "chai";
import data from '../delete/data.json' assert { type: "json" };


describe("Deleting Product API Test" , () => {
    const url = "http://localhost:3001"
    const product_id = 1000;
    it("Should Create a Dummy Product with Product ID 1000",(done)=>{
        request(url)
        .post('/create/product/test')
        .send(data)
        .set('Accept','application/json')
        .end(function(err,res){
            console.log(res);
            expect(res.statusCode).to.be.equal(200);
            if(err){
                throw err;
            }
            done();
        })
    })
    it("Should Delete a product" , (done) =>{
        request(url)
        .delete('/delete/product/' + product_id)
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


