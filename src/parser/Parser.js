const fs = require("fs");

module.exports = {
    /**
     * Parses the code
     * 
     * @param {string} code 
     * @returns {string}
     */
    parse(code) {
        let lines = (fs.readFileSync("./src/library/Orchid.oc").toString() + "\n" + code)
            .split("\n");
        let inEnumBlock = false;
        let enumName;

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();

            if (inEnumBlock) {
                if (line.includes("=")) {
                    lines[i] = `${line.replace("=", ":")}`
                } else if (lines[i].includes("}")) {
                    inEnumBlock = false;
                } else {
                    lines[i] = `${line.replace(",", "")}: ${i - 1},`
                }
            } else if (line.startsWith('enum')) {
                inEnumBlock = true;

                enumName = line.replace("enum ", "").replace("{", "").trim();
                lines[i] = `const ${enumName} = {`;
            }
        }

        return lines.join("\n");
    }
};
