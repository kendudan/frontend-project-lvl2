import { Command } from "commander";
import * as process from "process";
import * as fs from "fs";
import _ from "lodash";
import * as path from "path";

const genDiff = (filepath1, filepath2) => {
    const program = new Command();
    program
        .version('0.0.1')
        .arguments(`<${filepath1}> <${filepath2}>`)
        .description('Compares two configuration files and shows a difference.')
        .option('-f, --format [type]', 'output format')
        .action((file1, file2, ) => {
            const data1 = fs.readFileSync(path.resolve(process.cwd(), file1), 'utf-8');
            const parsedData1 = JSON.parse(data1);
            const keys1 = Object.keys(parsedData1);
            const entries1 = Object.entries(parsedData1);

            const data2 = fs.readFileSync(path.resolve(process.cwd(), file2), 'utf-8');
            const parsedData2 = JSON.parse(data2);
            const keys2 = Object.keys(parsedData2);
            const entries2 = Object.entries(parsedData2);

            const result = [];
            for (const [key1, value1] of entries1) {
                if (!keys2.includes(key1)) {
                    result.push(`- ${key1}: ${value1}`);
                }
                for (const [key2, value2] of entries2) {
                    if (_.indexOf(keys1, key2) === -1) {
                        if (!result.includes(`+ ${key2}: ${value2}`)) {
                            result.push(`+ ${key2}: ${value2}`);
                        }
                    }
                    if (key1 === key2 && value1 === value2) {
                        result.push(`  ${key1}: ${value1}`);
                    }
                    if (key1 === key2 && value1 !== value2) {
                        result.push(`- ${key1}: ${value1}`);
                        result.push(`+ ${key1}: ${value2}`);
                    }

                }
            }
            const newResult = `{\n  ${result.join('\n  ')}\n}`;
            console.log(newResult);
        });

    program.parse();
}

export default genDiff;