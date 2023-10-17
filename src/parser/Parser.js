const fs = require("fs");

module.exports = {
    /**
     * Parses the code
     * 
     * @param {string} code 
     * @returns {string}
     */
    parse(code) {
        const lines = (
            fs.readFileSync("./src/library/Orchid.oc").toString() +
            "\n" +
            "(async () => {" + code + "})();"
        );

        let linesArray = lines.split("\n");
        let inEnumBlock = false;
        let enumName;

        for (let i = 0; i < linesArray.length; i++) {
            let line = linesArray[i].trim();

            if (inEnumBlock) {
                if (line.includes("=")) {
                    linesArray[i] = `${line.replace("=", ":")}`
                } else if (linesArray[i].includes("}")) {
                    inEnumBlock = false;
                } else {
                    linesArray[i] = `${line.replace(",", "")}: ${i - 1},`
                }
            } else if (line.startsWith('enum')) {
                inEnumBlock = true;

                enumName = line.replace("enum ", "").replace("{", "").trim();
                linesArray[i] = `const ${enumName} = {`;
            }
        }

        return linesArray.join("\n");
    }
};
