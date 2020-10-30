import compression from 'compression';
import http from 'http';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { MailerController } from './controllers/MailerController';

// Add here your controllers
const controllers: Array<any> = [MailerController];

// Express configuration
const app = createExpressServer({ controllers: controllers });
const server = new http.Server(app);
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const env = process.env.APP_ENV || 'development';

// Configure servers
server.listen({ port, host }, () => {
    console.log(`App listening at http://${host}:${port} in ${env} mode`);
    console.log('Press CTRL-C to stop\n');
});
app.set('port', port);
app.set('host', host);
app.set('env', env);
app.use(compression());
