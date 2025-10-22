import { createApp } from './app.js';
import { Env } from './config/env.js';
const app = createApp();
app.listen(Env.PORT, () => console.log('Server on', Env.PORT));
