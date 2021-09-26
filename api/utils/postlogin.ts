import fs from "fs";
import path from "path";

const HOME_DIRECTORY = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];

const main = () => {
    if (HOME_DIRECTORY === undefined) {
        throw "Cannot get home directory path...";
    }
    if (fs.existsSync(path.join(HOME_DIRECTORY, ".clasprc.json"))) {
        // credentialsフォルダに持っていく
        if (!fs.existsSync(path.join(__dirname, "..", "credentials"))) fs.mkdirSync(path.join(__dirname, "..", "credentials"));
        fs.copyFileSync(path.join(HOME_DIRECTORY, ".clasprc.json"), path.join(__dirname, "..", "credentials", ".clasprc.json"));
        console.info("Create local .clasprc.json successfully!");
    } else {
        throw "Cannot find clasp.json file in your home directory. Did you logged in successfully?"
    }
    if (fs.existsSync(path.join(__dirname, "..", ".clasprc.json"))) {
        // preloginで退避させたファイルをもとに戻す
        fs.copyFileSync(path.join(__dirname, "..", ".clasprc.json"), path.join(HOME_DIRECTORY, ".clasprc.json"));
        fs.unlinkSync(path.join(__dirname, "..", ".clasprc.json"));
        console.info("Now, we move old .clasprc.json file, which is copied in prelogin to your home directory.");
    }
};

main();