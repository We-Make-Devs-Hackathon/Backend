/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const authService = require('../../services/auth-service');
const jwtService = require('../../services/jwt-service');
const AdminUser = require('../../model/admin-user');

function run() {

    describe('Admin Login Test', () => {

        let adminUser;
        let jwtGenerateToken;

        beforeEach(function () {
            adminUser = sinon.stub(AdminUser, 'findOne');
            jwtGenerateToken = sinon.stub(jwtService, 'generateToken');
        });

        afterEach(function () {
            adminUser.restore();
            jwtGenerateToken.restore();
        });

        it('it should throw invalid credentials exceptoin', async () => {
            adminUser.returns(null);
            try {
                await authService.adminLogin({ email: 'test@email.com' });
            } catch (e) {
                expect(e.status).to.eql(401);
                expect(e.code).to.eql(104);
                expect(e.message).to.eql('Invalid credentials');
            }
        });

        it('it should login user - admin', async () => {
            jwtGenerateToken.returns({ email: 'test@email.com', type: 'admin' });
            adminUser.returns({ password: '$2b$10$tmMKZmBtURRTsazSNcUyFuHWp13Op0kaRbDZAvtAXosYIMvG0FKta' });
            const result = await authService.adminLogin({ email: 'e', password: 'kp2699' });
            expect(result).to.not.eql(null);
        });
    });

    describe('Refresh Token Test', () => {
        let refreshToken;
        beforeEach(function () {
            refreshToken = sinon.stub(jwtService, 'refreshToken');
        });
        afterEach(function () {
            refreshToken.restore();
        });
        it('it should check token is authorized or not', async () => {
            refreshToken.returns('bjkbkjo');
            const result = await authService.refreshToken('Bearer cgcvhgvbuyghjb');
            expect(result).to.not.eql(null);
        });

        it('it should throw error of unauthorized token', async () => {
            refreshToken.throws();
            try {
                await authService.refreshToken('Bearer cgcvhgvbuyghjb');
            } catch (e) {
                expect(e.status).to.eql(401);
                expect(e.code).to.eql(101);
                expect(e.message).to.eql('Unauthorized');
            }
        });
    });
}

module.exports = {
    run
};