const AdminUser = require('../model/admin-user');

const logger = require('../util/logger');
const { ErrorCodes } = require('../model/base-response');

const MODULES = {
  UserManagement: 'UserManagement',
};

function handleUnauthorized(req, res, module) {
  if (req.log) {
    req.log(`error handler: unauthorized access of ${module} APIs`);
  } else {
    logger.error(`error handler: unauthorized access of ${module} APIs`);
  }
  if (res.headersSent) {
    return;
  }
  const err = ErrorCodes.MISSING_PERMISSION;
  res.status(err.status || 500);
  if (err.errorDescription) {
    err.errorDescription = err.errorDescription.trim();
  }
  res.send({
    errors: [{ code: err.code, message: err.message }],
    errorDescription: err.errorDescription,
    module,
    meta: err.meta,
  });
}

function hasAccess(module) {
  return async (req, res, next) => {
    if (req.header('x-api-key') === process.env.INTER_COMMUNICATION_API_KEY) {
      next();
      return;
    }
    // database call to check module permission, and check if user is admin
    let hasPermission = false;
    if ('admin' === req.header('user.type')) {
      const adminUser = await AdminUser.findById(req.header('user.id'));
      if (adminUser && (
        'SuperAdmin' === adminUser.role
        || adminUser.permissions.includes(module)
      )) {
        hasPermission = true;
        req.adminUser = adminUser;
      }
    }
    if (hasPermission) {
      next();
    } else {
      handleUnauthorized(req, res, module);
    }
  };
}

function isUser(req, res, next) {
  if ('user' === req.header('user.type')) {
    next();
  } else {
    handleUnauthorized(req, res, 'User');
  }
}

function isAdmin(req, res, next) {
  if ('admin' === req.header('user.type')) {
    next();
  } else {
    handleUnauthorized(req, res, 'Admin');
  }
}

function isAuthenticated(...modules) {
  if (!Array.isArray(modules)) {
    modules = [modules];
  }
  return async (req, res, next) => {
    if (req.header('x-api-key') === process.env.INTER_COMMUNICATION_API_KEY) {
      next();
      return;
    }
    // database call to check module permission, and check if user is admin
    let hasPermission = false;
    if ('admin' === req.header('user.type')) {
      const adminUser = await AdminUser.findById(req.header('user.id'));
      if (adminUser && (
        'SuperAdmin' === adminUser.role
        || adminUser.permissions.some(e => modules.includes(e))
      )) {
        hasPermission = true;
        req.adminUser = adminUser;
      }
    } else if ('user' === req.header('user.type')) {
      hasPermission = true;
    }
    if (hasPermission) {
      next();
    } else {
      handleUnauthorized(req, res, modules);
    }
  };
}

function isSystemCall(req, res, next) {
  if (req.header('x-api-key') === process.env.INTER_COMMUNICATION_API_KEY) {
    next();
  } else {
    handleUnauthorized(req, res, 'InternalSystemCall');
  }
}

module.exports = {
  MODULES,
  isUser,
  isSystemCall,
  hasAccess,
  isAdmin,
  isAuthenticated,
  hasAccess_UserManagement: hasAccess(MODULES.UserManagement),
};
