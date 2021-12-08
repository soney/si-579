const fs = require('fs');

module.exports = function SimpleLog(filename) {
    const value = [];

    try {
        fs.readFile(filename, (fileContent) => {
            try {
                value = JSON.parse(fileContent)
            } catch {
                console.error(`Error parsing ${filename}`);
            }
        });
    } catch {
        console.error(`Error reading ${filename}`);
    }

    return {
        value,
        push: (data) => {
            value.push(data);
            fs.writeFile(filename, JSON.stringify(value), () => {
                console.log(`Wrote db to ${filename}`);
            });
        }
    };
}