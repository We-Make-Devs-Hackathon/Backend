
const verifyMiddleware = require('./middleware/verify');
const appointmentRouter = require('./routes/appointments');

module.exports = {

    configure: app => {

        app.use('/hospital-user/api/v1/events', require('./queue/receiver/index'));

       
        app.use('/hospital-appointments/api/v1/appointment',verifyMiddleware, appointmentRouter);

        app.get('/', (req, res) => res.send('OK'));
    }
};
