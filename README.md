# fastest-validator-async
:zap::snail: A much slower version of the fastest JS validator library for NodeJS.

This is a fork of [fastest-validator](https://github.com/icebob/fastest-validator), and it provides support for async validation (but not compilation).  Thanks to the overhead of promises, this library is significantly slower than its sibling.  It's still pretty fast compared to most other validators, though.  

**Note:** All transpilation has been dropped.  This library will only work in Node ^7.2.0 and major browsers.  RIP IE11.

# How fast?
Not very fast! ~165k validations/sec (on Intel i7-6700, Node.JS: 9.2.0).  Compared to fastest-validator:
```
√ compile & validate*                               -50%
√ compile & validate with custom messages*          -40%
√ validate with pre-compiled schema*                -97%
√ validate with wrong obj*                          -80%
```

## Usage

### Simple method
Call the `validate` method with the `object` and the `schema`.
> If performance is important, you won't use this method (or this library, probably).

```js
let Validator = require("fastest-validator");

let v = new Validator();

async function main() {

    const schema = {
        id: { type: "number", positive: true, integer: true },
        name: { type: "string", min: 3, max: 255 },
        status: "boolean" // short-hand def
    };

    console.log(await v.validate({ id: 5, name: "John", status: true }, schema));
    // Returns: true

    console.log(await v.validate({ id: 5, name: "Al", status: true }, schema));
    /* Returns an array with errors:
        [
            {
                type: 'stringMin',
                expected: 3,
                actual: 2,
                field: 'name',
                message: 'The \'name\' field length must be greater than or equal to 3 characters long!'
            }
        ]
    */

}
main();
```

### Fast(ish) method
In this case, the first step is to compile the schema to a compiled "checker" function. After that, to validate your object, just call this "checker" function.
> This method is ~4x faster than the "simple method".

```js
let Validator = require("fastest-validator");

let v = new Validator();

async function main() {

    var schema = {
        id: { type: "number", positive: true, integer: true },
        name: { type: "string", min: 3, max: 255 },
        status: "boolean" // short-hand def
    };

    var check = v.compile(schema);

    console.log(await check({ id: 5, name: "John", status: true }));
    // Returns: true

    console.log(await check({ id: 2, name: "Adam" }));
    /* Returns an array with errors:
        [
            {
                type: 'required',
                field: 'status',
                message: 'The \'status\' field is required!'
            }
        ]
    */

}
main()
```

The rest of the API docs can be found at (https://github.com/icebob/fastest-validator/tree/v0.6.17)