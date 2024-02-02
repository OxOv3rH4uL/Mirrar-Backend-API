// const request = require('supertest');
// const expect = require('chai').expect;

import request  from "supertest";
import { expect } from "chai";

describe("Search Functionality API Tests" , () =>{
    const url = 'http://localhost:3001';
    describe("Search By Name" , () =>{
        it("Should fetch the data by name" , (done) => {
            const name = "Test_Product"
            request(url)
            .get('/search/name/' + name)
            .set('Accept' , 'application/json')
            .end(function(err,res){
                expect(res.statusCode).to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
        })
        it("Should fetch the data by Description" , (done) => {
            const desc = "Test";
            request(url)
            .get('/search/desc/' + desc)
            .set('Accept' , 'application/json')
            .end(function(err,res){
                expect(res.statusCode).to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
        })
        it("Should fetch the data by Variant Name" , (done) => {
            const variant_name = 'T_VAR1';
            request(url)
            .get('/search/variant_name/' + variant_name)
            .set('Accept' , 'application/json')
            .end(function(err,res){
                expect(res.statusCode).to.be.equal(200);
                if(err){
                    throw err;
                }
                done();
            })
        })
    })
})