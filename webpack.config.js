import path from "path";
import webpack from "webpack";
import fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";

const __dirname = path.resolve();

const devConfig = {
    entry: "./src/entry.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules|test|dist/g,
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        /*...fs.readdirSync("./test").map((file) => {
            console.log(file)
            if (file.endsWith(".html")) {
                return new HtmlWebpackPlugin({
                    filename: file,
                    template: `./test/${file}`,
                });
            }
        }),*/
    ],
    optimization: {
        minimize: false
    },
    devtool: "eval-source-map",
};

export default (env, argv) => {
    if (argv.mode === "production") {
        return {
            entry: "./src/entry.ts",
            module: {
                rules: [{
                    test: /\.ts$/,
                    exclude: /node_modules|test/g,
                    use: [{
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    }]
                }]
            },
            resolve: {
                extensions: [".ts", ".js"],
            },
            output: {
                filename: "bundle.min.js",
                path: path.resolve(__dirname, "dist"),
            },
            plugins: [
                /*new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: false{
                            drop_console: false,
                            drop_debugger: true,
                            //pure_funcs: ["console.log"],
                        },
                    },
                }),*/
            ],
            optimization: {
                minimize: false
            }
        };
    } else return devConfig;
};