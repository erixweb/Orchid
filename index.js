const fs = require("fs");
const path = require("path");

const Logger = require("./src/utils/Logger");

const Optimization = require("./src/parser/Optimization");
const Parser = require("./src/parser/Parser");

async function main() {
    try {
        const files = fs.readdirSync(".");

        for (const directoryFile of files) {
            const filePath = path.join(__dirname, directoryFile);

            if (!(fs.statSync(filePath).isFile() && path.extname(directoryFile) === ".oc")) {
                continue; // Skip non-orchid files or directories
            }

            const fileContents = fs.readFileSync(filePath, "utf8");

            Logger.info("Compiling " + directoryFile);

            let contents = Parser.parse(fileContents);

            if (!process.argv.includes("--noOptimization")) {
                const optimizedContent = await Optimization.optimize(contents);
                contents = optimizedContent;
            }

            fs.writeFileSync(directoryFile.replace(".oc", ".js"), contents);
        }
    } catch (error) {
        Logger.error(error.stack);
    }
}

main();