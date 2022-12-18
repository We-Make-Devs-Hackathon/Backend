/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const sinon = require('sinon');
const AdminUser = require('../../../model/admin-user');
const adminUserUpdateProcessor = require('../../../queue/receiver/processors/admin-user-update');

function run() {

    describe('It sync admin user details', () => {

        let adminUserFindById, adminUserfindByIdAndUpdate, adminUserCreate, tokenfindOneAndDelete;

        beforeEach(function () {
            adminUserFindById = sinon.stub(AdminUser, 'findById');
            adminUserfindByIdAndUpdate = sinon.stub(AdminUser, 'findByIdAndUpdate');
            adminUserCreate = sinon.stub(AdminUser, 'create');
            tokenfindOneAndDelete = sinon.stub(AuthToken,'findOneAndDelete');
        });

        afterEach(function () {
            adminUserFindById.restore();
            adminUserfindByIdAndUpdate.restore();
            adminUserCreate.restore();
            tokenfindOneAndDelete.restore();
        });

        it('it should create admin user', async() => {
            let req = {
                body:{
                    name: 'bhavesh'
                },
                log:(...args) => {}
            };
            adminUserFindById.returns(null);
            adminUserUpdateProcessor(req);
        });
        
        it('it should update admin user', async() => {
            let req = {
                body:{
                    name: 'bhavesh',
                    userId:'id'
                },
                log:(...args) => {}
            };
            adminUserFindById.returns({_id:'id'});
            adminUserfindByIdAndUpdate.returns(null);
            adminUserUpdateProcessor(req);
        });
        
        it('it should delete token', async() => {
            let req = {
                body:{
                    name: 'bhavesh',
                    status:'Inactive'
                },
                log:(...args) => {}
            };
            adminUserFindById.returns({_id:'id'});
            tokenfindOneAndDelete.returns({});
            adminUserUpdateProcessor(req);
        });
    });
}

module.exports = {
    run
};

