const express = require('express');
const bodyParser = require('body-parser');
const { router } = require('./routes/apiRoutes');

const server = express();

server.set('port', process.env.PORT || 3000);

server.use(bodyParser.json());
server.use('/', express.static('public'));
server.use('/api/v1', router);

server.listen(server.get('port'), () => {
  console.log(`MB server listening at ${server.get('port')}`);
});
