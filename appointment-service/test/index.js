/**
 * services
 */
const actuatorServiceTest = require('./services/actuator-service-test');
/**
 * queue
 */
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
    actuatorServiceTest.run();
}

main();

