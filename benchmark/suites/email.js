"use strict";

const Benchmarkify = require("benchmarkify");
const benchmark = new Benchmarkify("Fastest validator benchmark").printHeader();

let bench = benchmark.createSuite("Email validating methods");

const Validator = require("../../index");
const v = new Validator();

const obj = {
	email: "john.doe@company.space",
};

(function() {
	const schema = {
		email: { type: "email", mode: "precise" },
	};

	let check = v.compile(schema);

	bench.add("mode: 'precise'", async () => {
		let res = await check(obj);
		if (res !== true)
			throw new Error("Validation error!", res);
	});

})();

(function() {
	const schema = {
		email: { type: "email", mode: "basic" },
	};

	let check = v.compile(schema);

	bench.add("mode: 'basic'", async () => {
		let res = await check(obj);
		if (res !== true)
			throw new Error("Validation error!", res);
	});

})();


bench.run();