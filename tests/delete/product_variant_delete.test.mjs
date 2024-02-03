import request  from "supertest";
import { expect } from "chai";

describe("Deleting Product API Test" , () => {
    const url = "http://localhost:3001"
    const product_id = 2;
    it("Should Delete a product" , (done) =>{
        request(url)
        .delete('/delete/product/' + product_id)
        .set('Accept','application/json')
        .end(function(err,res){
            expect(res.statusCode).to.be.equal(200);
            expect(res._body).to.be.equal('DELETED SUCCESSFULLY');
            if(err){
                throw err;
            }
            done();
        })
    })
})


