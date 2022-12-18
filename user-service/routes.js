const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const actuatorRouter = require('./routes/actuator');
const doctorsRouter = require('./routes/doctors');
const patientsRouter = require('./routes/patients');
const staffsRouter = require('./routes/staffs');
const hospitalRouter = require('./routes/hospitals');
const verifyMiddleware = require('./middleware/verify');


module.exports = {

    configure: app => {

        app.use('/hospital-user/api/v1/events', require('./queue/receiver/index'));

        app.use('/hospital-user/api/v1/actuator', actuatorRouter);
        app.use('/hospital-user/api/v1/user', userRouter);
        app.use('/hospital-user/api/v1/doctor',verifyMiddleware, doctorsRouter);
        app.use('/hospital-user/api/v1/patient',verifyMiddleware, patientsRouter);
        app.use('/hospital-user/api/v1/staff',verifyMiddleware, staffsRouter);
        app.use('/hospital-user/api/v1/hospital', hospitalRouter);
        app.use('/hospital-user/api/v1/', indexRouter);

        app.get('/', (req, res) => res.send('OK'));
    }
};
