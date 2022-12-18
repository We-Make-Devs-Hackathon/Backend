
const verifyMiddleware = require('./middleware/verify');
const chatRouter = require('./routes/chats');

module.exports = {

    configure: app => {

        app.use('/hospital-user/api/v1/events', require('./queue/receiver/index'));

       
        app.use('/hospital-chats/api/v1/chat', chatRouter);

        app.get('/', (req, res) => res.send('OK'));
    }
};
