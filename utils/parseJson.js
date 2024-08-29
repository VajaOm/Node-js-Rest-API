const querystring = require('querystring');

const parseJson = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const parsedBody = querystring.parse(body);
                resolve(parsedBody);
            } catch (error) {
                reject(error);
            }
        });

    });
    
}

module.exports = parseJson;