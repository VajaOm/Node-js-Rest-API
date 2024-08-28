const parseJson = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                resolve(JSON.parse())
            } catch (error) {
                reject(error);
            }
        });

    });
    
}

module.exports = parseJson;