/* eslint-disable no-undef */
const chai = require('chai');
let expect = chai.expect;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const jwtService = require('../../services/jwt-service');

function run() {
    process.env.JWT_SECRET = 'secret';
    describe('Generate Token Test', () => {

        let authTokenDeleteMany, authTokenCreate;

        beforeEach(function () {
            authTokenDeleteMany = sinon.stub(AuthToken, 'deleteMany');
            authTokenCreate = sinon.stub(AuthToken, 'create');
        });

        afterEach(function () {
            authTokenDeleteMany.restore();
            authTokenCreate.restore();
        });

        it('it should generate token', () => {
            authTokenCreate.returns({});
            const token = jwtService.generateToken({ username: 'bhavesh' });
            expect(token).to.not.eql(null);
        });

        it('it should delete token while generating token', () => {
            authTokenDeleteMany.returns({});
            const token = jwtService.generateToken({ username: 'bhavesh' });
            expect(token).to.not.eql(null);
        });
    });

    describe('Refresh Token', () => {
        let authTokenDeleteMany, authTokenCreate, jwtDecode;

        beforeEach(function () {
            authTokenDeleteMany = sinon.stub(AuthToken, 'deleteMany');
            authTokenCreate = sinon.stub(AuthToken, 'create');
            jwtDecode = sinon.stub(jwt, 'decode');
        });

        afterEach(function () {
            authTokenDeleteMany.restore();
            authTokenCreate.restore();
            jwtDecode.restore();
        });

        it('it should refresh token validity check', () => {
            jwtDecode.returns('jcccjh');
            authTokenDeleteMany.returns({});
            authTokenCreate.returns({});
            const token = jwtService.refreshToken('jfghhdxhg');
            expect(token).to.not.eql(null);
        });

        it('it should throw validity expired exception', () => {
            jwtDecode.returns({ iat: 1645095863 / 1000 });
            authTokenDeleteMany.returns({});
            authTokenCreate.returns({});
            try {
                jwtService.refreshToken('jfghhdxhg');
            } catch (error) {
                expect(error.code).to.eql(103);
            }
        });
    });

}

module.exports = {
    run
};
