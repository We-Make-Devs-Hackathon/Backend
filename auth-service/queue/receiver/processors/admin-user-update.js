const AdminUser = require('../../../model/admin-user');

/**
 * 
 * @param {*} req  - object: { type: string, body: object }
 */
module.exports = async function (req) {
    req.log(`in admin-user-update.js file, req.type: ${req.type}`);
    const entity = await AdminUser.findById(req.body._id);
    if (entity) {
        await AdminUser.findByIdAndUpdate(entity._id, req.body);
        req.log('AdminUserUpdated ' + JSON.stringify(req.body));
    } else {
        await AdminUser.create(req.body);
        req.log('AdminUserCreated ' + JSON.stringify(req.body));
    }
};
