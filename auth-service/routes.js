const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const hospitalAuthRouter = require('./routes/hospitalAuth');
const actuatorRouter = require('./routes/actuator');

module.exports = {

    configure: app => {

        app.use('/hospital-iam/api/v1/events', require('./queue/receiver/index'));

        app.use('/hospital-iam/api/v1/actuator', actuatorRouter);
        app.use('/hospital-iam/api/v1/auth', authRouter);
        app.use('/hospital-iam/api/v1/hospitalAuth', hospitalAuthRouter);
        app.use('/hospital-iam/api/v1/', indexRouter);

        app.get('/', (req, res) => res.send('OK'));
    }
};
