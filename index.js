const fs = require("fs");
const path = require("path");

const Logger = require("./src/utils/Logger");

const Optimization = require("./src/parser/Optimization");
const Parser = require("./src/parser/Parser");

async function main() {
    if (process.argv.includes("--bundle")) {
        fs.writeFileSync("main.js",
            Parser.parse(
                fs.readFileSync("./src/library/Orchid.oc").toString() +
                fs.readFileSync("./src/library/Math.oc").toString()
            )
        )
    }

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

            const fileContents = fs.readFileSync(filePath, "utf8");

            Logger.info("Compiling " + directoryFile);

            let contents = Parser.parse(fileContents);

            if (!process.argv.includes("--noOptimization")) {
                contents = await Optimization.optimize(contents);
            }

            if (process.argv.includes("--bundle")) {
                fs.appendFileSync(
                    "main.js",
                    await Parser.parse(
                        contents.replaceAll("module.exports={", `const ${directoryFile.replace(".oc", "")} = {`)
                    )
                );
            } else {
                fs.writeFileSync(
                    directoryFile.replace(".oc", ".js"),
                    contents
                );
            }
        }
    } catch (error) {
        Logger.error(error.stack);
    }

    if (!process.argv.includes("--noOptimization")) {
        const content = fs.readFileSync("main.js");

        fs.writeFileSync("main.js", await Optimization.optimize(content.toString()));
    }
}

main();