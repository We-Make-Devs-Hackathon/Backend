/* eslint-disable no-undef */
process.env.INTER_COMMUNICATION_API_KEY = 'temp';
process.env.HOSPITAL_USER_ENDPOINT='http://localhost:8081';
const chai = require('chai');
let expect = chai.expect;
const requestTemplate = require('../../util/request-template');
const axios = require('axios').default;
const sinon = require('sinon');

function run(){

    describe('Request template test',() => {
        let axiosStub;

        beforeEach(function(){
            axiosStub = sinon.stub(axios, 'request');
        });

        afterEach(function(){
            axiosStub.restore();
        });

        it('it should call request', () => {
            let req = {
                header: (value) => {
                    if(value == 'user.id'){
                        return 'id';
                    }
                    if(value == 'user.type'){
                        return 'user';
                    }
                }
            };
            const result = requestTemplate.call(req, 'hospital-user', 'GET', '/hospital-user/api/v1/users', { pageNo: 2 });
            expect(result).to.not.eql(null);
        });

        it('it should make get request', () => {
            let req = {
                header: (value) => {
                    if(value == 'user.id'){
                        return 'id';
                    }
                    if(value == 'user.type'){
                        return 'user';
                    }
                }
            };
            const result = requestTemplate.get(req, 'hospital-user', '/hospital-user/api/v1/users', { pageNo: 2 }, headers = {});
            expect(result).to.not.eql(null);
        });

        it('it should make get request without query', () => {
            let req = {
                header: (value) => {
                    if(value == 'user.id'){
                        return 'id';
                    }
                    if(value == 'user.type'){
                        return 'user';
                    }
                }
            };
            const result = requestTemplate.get(req, 'hospital-user', '/hospital-user/api/v1/users');
            expect(result).to.not.eql(null);
        });
        
        it('it should make put request', () => {
            let req = {
                header: () => {},
                userId: 'id',
                userType: 'user'
            };
            const result = requestTemplate.put(req, 'hospital-user', '/api/v1/users', {name: 'test'}, headers = {});
            expect(result).to.not.eql(null);
        });

        it('it should make put request', () => {
            let req = {
                header: () => {},
                userId: 'id',
                userType: 'user'
            };
            const result = requestTemplate.put(req, 'hospital-user', '/api/v1/users', {name: 'test'});
            expect(result).to.not.eql(null);
        });

        it('it should make post request', () => {
            let req = {
                userId: 'id',
                userType: 'user'
            };
            const result = requestTemplate.post(req, 'hospital-user', '/api/v1/users', {name: 'test'}, headers = {});
            expect(result).to.not.eql(null);
        });

        it('it should make post request without headers', () => {
            let req = {
                userId: 'id',
                userType: 'user'
            };
            const result = requestTemplate.post(req, 'hospital-user', '/api/v1/users', {name: 'test'});
            expect(result).to.not.eql(null);
        });

        it('it should make delete request', () => {
            let req = {
                userId: 'id',
                userType: 'user'
            };
            const result = requestTemplate.del(req, 'hospital-user', 'users', {}, headers = {});
            expect(result).to.not.eql(null);
        });

        it('it should make delete request without headers', () => {
            let req = {
                userId: 'id',
                userType: 'user'
            };
            const result = requestTemplate.del(req, 'hospital-user', 'users', {});
            expect(result).to.not.eql(null);
        });

        it('it should genrate request object', () => {
            const result = requestTemplate.generateRequestObject('id');
            expect(result.log('id')).to.not.eql(null);
            expect(result.error('id')).to.not.eql(null);
        });
        

    });
}

module.exports = {
    run
};