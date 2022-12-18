const { ValidationMessages } = require('../model/base-response');

const constants = require('../util/constants');
const requestTemplate = require('../util/request-template');

/**
 * 
 * Usage example: await sender.emit(req, 'remove-fcm-token', payload, constants.SERVICES.notification)
 * 
 * @param {*} req - Express Request Object - used to pass trace/span id
 * @param {*} type - Event type aka Event Name (same as processor name)
 * @param {*} body - Event Payload
 * @param  {array of string - use ${constants.SERVICES} object for service string} services 
 */
async function emit(req, type, body, ...services) {
    if (!services.length) {
        throw `services ${ValidationMessages.MUST_BE_ARRAY}`;
    }
    if (constants.SERVICES.all === services[0]) {
        services = Object.values(constants.SERVICES);
        services.splice(services.findIndex(e => e === constants.SERVICES.all), 1);
        services.splice(services.findIndex(e => e === constants.SERVICE_NAME), 1);
    }
    const event = { type, body };
    if ('true' != process.env.ENABLE_QUEUE) {
        await Promise.all(services.map(async service => {

            requestTemplate.post(req, service, `/${service}/api/v1/events`, event).then(() => {
                req.log('EventPosted', JSON.stringify(event));
            }).catch(error => {
                req.error(`error handler: :${JSON.stringify(error)}, obj: ${error}`);
                // eslint-disable-next-line no-console
                console.error(new Date().toISOString(), `traceId[${req.traceId}]`, `spanId[${req.id}]`, error);
            });
        }));
    } else {
        // eslint-disable-next-line no-console
        console.log('TODO: logic to send msgs in the queue is pending');
    }
}

module.exports = {
    emit,
};
