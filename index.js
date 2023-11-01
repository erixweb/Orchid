const fs = require("fs");
const path = require("path");

const Logger = require("./src/utils/Logger");

const Optimization = require("./src/parser/Optimization");
const Parser = require("./src/parser/Parser");

async function main() {
    let contents = Parser.parse(
        fs.readFileSync("./src/library/Orchid.oc").toString() +
        fs.readFileSync("./src/library/Math.oc").toString()
    )

    try {
        const files = fs.readdirSync(".");

        for (const directoryFile of files) {
            const filePath = path.join(__dirname, directoryFile);

            if (!(
                fs.statSync(filePath).isFile() &&
                path.extname(directoryFile) === ".oc")
            ) {
                continue; // Skip non-orchid files or directories
            }

            Logger.info("Compiling " + directoryFile);

            const fileContents = fs.readFileSync(filePath, "utf8");

            contents += Parser.parse(fileContents);

            if (!process.argv.includes("--noOptimization")) {
                contents = await Optimization.optimize(contents);
            }

            if (process.argv.includes("--bundle")) {
                contents = contents.replaceAll("module.exports={", `const ${directoryFile.replace(".oc", "")} = {`);
            } else {
                fs.writeFileSync(directoryFile.replace(".oc", ".js"), contents);
                continue;
            }

            fs.writeFileSync("main.js", contents);
        }
    } catch (error) {
        Logger.error(error.stack);
    }
}

main();