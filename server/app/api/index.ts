import * as express from 'express';

export const api: express.Router = express();

api.get('/time', function (req, res) {
    return res.json({ time: new Date() });
});

export default api;