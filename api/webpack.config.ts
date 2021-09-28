import * as webpack from "webpack";
import * as path from "path";
import GasPlugin from "gas-webpack-plugin";

export const config: webpack.Configuration = {
    entry: path.join(__dirname, "src", "entrypoint.ts"),
    output: {
        filename:  "bundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            }
        ]
    },
    plugins: [
        new GasPlugin()
    ]
}

export default config;