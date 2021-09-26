import fs from "fs";
import path from "path";

const HOME_DIRECTORY = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];

const main = () => {
    if (HOME_DIRECTORY === undefined) {
        throw "Cannot get home directory path...";
    }
    if (!fs.existsSync(path.join(__dirname, "..", "dist"))) {
        fs.mkdirSync(path.join(__dirname, "..", "dist"));
    }
    if (!fs.existsSync(path.join(__dirname, "..", ".clasp.json")) && fs.existsSync(path.join(__dirname, "..", "dist", ".clasp.json"))) {
        // .clasp.jsonがapi直下にないときはコピー
        fs.copyFileSync(path.join(__dirname, "..", "dist", ".clasp.json"), path.join(__dirname, "..", ".clasp.json"));
    }
    if (fs.existsSync(path.join(HOME_DIRECTORY, ".clasprc.json"))) {
        // credentialsフォルダに持っていく
        if (!fs.existsSync(path.join(__dirname, "..", "credentials"))) {
            throw "Cannot find credentials directory. You must run `npm run postinstall` or `npm install` command before create apps.";
        }
        fs.copyFileSync(path.join(HOME_DIRECTORY, ".clasprc.json"), path.join(__dirname, "..", "credentials", ".old.clasprc.json"));
        fs.copyFileSync(path.join(__dirname, "..", "credentials", ".clasprc.json"), path.join(HOME_DIRECTORY, ".clasprc.json"), );
        console.warn("Create local .clasprc.json successfully!");
    } else {
        throw "Cannot find .clasprc.json file in your home directory. Did you logged in successfully?"
    }
};

main();