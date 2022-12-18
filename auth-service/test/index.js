/**
 * services
 */
const authServiceTest = require('./services/auth-service-test');
const jwtServiceTest = require('./services/jwt-service-test');
const actuatorServiceTest = require('./services/actuator-service-test');
/**
 * queue
 */
const adminUserUpdateProcessorTest = require('./queue/receiver/admin-user-update-test');
const senderTest = require('./queue/sender-test');
/**
 * util
 */
const dateUtilTest = require('./util/date-util-test');
const passwordUtilTest = require('./util/password-util-test');
const utilsTest = require('./util/utils-test');
const requestTemplateTest = require('./util/request-template-test');

function main() {

    /**
     * queue
     */
    adminUserUpdateProcessorTest.run();
    senderTest.run();

    /**
     * util
     */
    dateUtilTest.run();
    passwordUtilTest.run();
    utilsTest.run();
    requestTemplateTest.run();

    /**
     * services
     */
    authServiceTest.run();
    jwtServiceTest.run();
    actuatorServiceTest.run();
}

main();

