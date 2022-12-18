/* eslint-disable no-undef */
const chai = require('chai');
let expect = chai.expect;
const passwordUtil = require('../../util/password-util'); 

function run(){
   
    describe('Crypt Password Test',()=>{
            
        it('it should return crypt password',() =>{
            const result = passwordUtil.cryptPassword('test123');
            expect(result).to.not.eql(null);
        });
    });

    describe('Compare Password Test', ()=>{
        
        it('it should compare password',() =>{
            const result = passwordUtil.comparePassword('test123','$2b$10$SXu7OkbHpdbgNCf6xcAvSerjjFGomgoDiB8suvNSx7pmKwsSduqJG');
            expect(result).to.eql(true);
        });
    });  

}

module.exports = {
    run
};