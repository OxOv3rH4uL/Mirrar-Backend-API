// const request = require('supertest');
// const expect = require('chai').expect;

import request  from "supertest";
import { expect } from "chai";

describe("Search Functionality API Tests" , () =>{
    const url = 'http://localhost:3001';

    describe("When Wrong Data is being searched" , () => {
        it("Should return 404 When we Search By Name" , (done)=>{
            const name = "ZZZZ"
            request(url)
            .get('/search/name/' + name)
            .set('Accept' , 'application/json')
            .end(function(err,res){
                expect(res.statusCode).to.be.equal(404);
                expect(res.text).to.be.equal("NOT FOUND!");
                if(err){
                    throw err;
                }
                done();
            })
        })
        it("Should return 404 When we Search By Description" , (done)=>{
            const desc = "ZZZZ"
            request(url)
            .get('/search/desc/' + desc)
            .set('Accept' , 'application/json')
            .end(function(err,res){
                expect(res.statusCode).to.be.equal(404);
                expect(res.text).to.be.equal("NOT FOUND!");
                if(err){
                    throw err;
                }
                done();
            })
        })
        it("Should return 404 When we Search By Variant Name" , (done)=>{
            const variant_name = "ZZZZ"
            request(url)
            .get('/search/variant_name/' + variant_name)
            .set('Accept' , 'application/json')
            .end(function(err,res){
                expect(res.statusCode).to.be.equal(404);
                expect(res.text).to.be.equal("NOT FOUND!");
                if(err){
                    throw err;
                }
                done();
            })
        })
    })

    describe("Search By Name , Description , Variant_Name" , () =>{
        it("Should fetch the data by name" , (done) => {
            const name = "Test_Product"
            request(url)
            .get('/search/name/' + name)
            .set('Accept' , 'application/json')
            .end(function(err,res){
                expect(res.statusCode).to.be.equal(200);
                expect(res._body).to.be.an('array');
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
                expect(res._body).to.be.an('array');
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
                expect(res._body).to.be.an('array');
                if(err){
                    throw err;
                }
                done();
            })
        })

    })
    describe("Search Functionality 2 API Tests" , () =>{
        it("Should fetch the data by Name" , (done) => {
            const name = "Test"
            request(url)
            .get('/search?name=' + name)
            .set('Accept' , 'application/json')
            .end(function(err,res){
                expect(res.statusCode).to.be.equal(200);
                expect(res._body).to.be.an('array');
                if(err){
                    throw err;
                }
                done();
            })
        })
        it("Should fetch the data by Description", (done)=>{
            const desc = "Test";
            request(url)
            .get('/search?desc=' + desc)
            .set('Accept' , 'application/json')
            .end(function(err,res){
                expect(res.statusCode).to.be.equal(200);
                expect(res._body).to.be.an('array');
                if(err){
                    throw err;
                }
                done();
            })
        })
        it("Should fetch the data by Variant Name" , (done) => {
            const variant_name = 'T_VAR1';
            request(url)
            .get('/search?variant_name=' + variant_name)
            .set('Accept' , 'application/json')
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
})