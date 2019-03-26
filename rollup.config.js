import commonjs from "rollup-plugin-commonjs";
import uglify from "rollup-plugin-uglify-es";
import pkg from "./package.json";

const BUNDLE_NAME = "FastestValidator";

const bundles = [
	// UMD Dev
	{
		input: "index.js",
		output: {
			file: "dist/index.js",
			format: "umd",
			name: BUNDLE_NAME,
			sourcemap: true
		},
		plugins: [
			commonjs()
		]
	}
];

export default bundles;
