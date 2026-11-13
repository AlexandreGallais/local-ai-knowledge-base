# practices index

One sheet per lint rule that the format pass cannot fix and that models often break. Open a sheet with the rule tool of the practices server.

- [One exported function per file](local--single-exported-function.md): A library file exports one function and nothing else at run time.
- [The file name is the function name](local--filename-matches-export.md): A file that exports the function "clampAngle" is named "clamp-angle.ts".
- [The copyright comment comes first](local--copyright-header.md): Every library file starts with the copyright comment of .agents/profile.json.
- [No class in a pure function library](local--no-class.md): A pure function library holds functions only: no class, no "this".
- [Pass the date as a parameter](local--no-clock.md): "new Date()" reads the clock: a pure function takes the date as a parameter.
- [A union of string literals, not an enum](local--no-enum.md): Write "type State = 'on' | 'off'", never "enum State".
- [Import only the packages of package.json](local--no-undeclared-import.md): Every imported package is in package.json; never one the project does not have.
- [Never change a parameter: build a new value](functional--immutable-data.md): In a pure function, "list.push(x)" changes the caller's list; return "[...list, x]".
- [Wait for every promise](typescript-eslint--no-floating-promises.md): A promise that nobody awaits loses its errors: await it, or return it.
- [Compare, never test a value as true or false](typescript-eslint--strict-boolean-expressions.md): Write "if (name !== '')" or "if (count > 0)", never "if (name)" or "if (count)".
- [No "!" after a value that may be missing](typescript-eslint--no-non-null-assertion.md): "list[0]!" hides a missing value; give a default with "??" or check it first.
- [Every exported function has an example](jsdoc--require-example.md): The JSDoc of an exported function ends with "@example" and a call with its result.
- [A store lists features, or is a small store](local--store-lists-features.md): A composed store lists only features of sub-domains; a small store without sub-domain keeps its blocks in one file; never both. At most 15 features in a store, 10 in a signalStoreFeature.
- [No Angular Material, no CDK](no-restricted-imports.md): The team writes its own components: never import @angular/material nor @angular/cdk.
- [output(), not @Output() and EventEmitter](angular-eslint--prefer-output-emitter-ref.md): Declare an output with "readonly changed = output<string>()".
- [A click on a button, never on a div](angular-eslint--template--click-events-have-key-events.md): Put (click) on a <button type="button">: a click on a <div> or <li> cannot be reached with the keyboard.
