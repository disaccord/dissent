# dissent

A way of creating a hash for a function that won't change if variable names change. This is useful for discord client mods & mappings.

To use;
```sh
npm install @disaccord/dissent
```

The API really has one function you care about;
```js
import fs from "fs"
import { hash } from "@disaccord/dissent"

const testFunction = fs.readFileSync("./modulefun22-22.js")

const hash = hash(testModule)

console.log("Function Hash: " + hash)
```