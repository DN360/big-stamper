import fs from "fs";
import path from "path";

const HOME_DIRECTORY = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];

const main = () => {
    if (HOME_DIRECTORY === undefined) {
        throw "Cannot get home directory path...";
    }
    if (fs.existsSync(path.join(HOME_DIRECTORY, ".clasprc.json"))) {
        // credentialsフォルダに持っていく
        if (!fs.existsSync(path.join(__dirname, "..", "credentials"))) {
            throw "Cannot find credentials directory. You must run `npm run postinstall` or `npm install` command before create apps.";
        }
        fs.copyFileSync(path.join(__dirname, "..", "credentials", ".old.clasprc.json"), path.join(HOME_DIRECTORY, ".clasprc.json"), );
        console.info("Restore original .clasprc.json");
    } else {
        throw "Cannot find .clasprc.json file in your home directory. Did you logged in successfully?"
    }
};

main();