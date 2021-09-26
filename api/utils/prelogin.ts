import fs from "fs";
import path from "path";

const HOME_DIRECTORY = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];

const main = () => {
    if (HOME_DIRECTORY === undefined) {
        throw "Cannot get home directory path...";
    }
    if (fs.existsSync(path.join(HOME_DIRECTORY, ".clasprc.json"))) {
        // すでにclaspでログインしたことがあるので、一旦手元に退避させる
        console.warn(".clasprc.json is already in your home directory. copy as temporary file.")
        fs.copyFileSync(path.join(HOME_DIRECTORY, ".clasprc.json"), path.join(__dirname, "..", ".clasprc.json"));
    }
};

main();