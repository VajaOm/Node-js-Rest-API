const querystring = require('querystring');

const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const contentType = req.headers['content-type'];
                
                if (contentType === 'application/json') {
                    resolve(JSON.parse(body));
                } else if (contentType === 'application/x-www-form-urlencoded') {
                    resolve(querystring.parse(body));
                } else {
                    reject(new Error('Unsupported Content-Type'));
                }
            } catch (error) {
                reject(error);
            }
        });

        req.on('error', (error) => {
            reject(error);
        });
    });
};

module.exports = parseBody;
