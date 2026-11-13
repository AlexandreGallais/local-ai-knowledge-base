---
title: "package.json (part 1 of 3)"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/configuring-npm/package-json.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# package.json

### Description

This document is all you need to know about what's required in your package.json file.
It must be actual JSON, not just a JavaScript object literal.

A lot of the behavior described in this document is affected by the config settings described in `config`.

### name

If you plan to publish your package, the *most* important things in your package.json are the name and version fields as they will be required.
The name and version together form an identifier that is assumed to be completely unique.
Changes to the package should come along with changes to the version.
If you don't plan to publish your package, the name and version fields are optional.

The name is what your thing is called.

Some rules:

* The name must be less than or equal to 214 characters.
  This includes the scope for scoped packages.
* The names of scoped packages can begin with a dot or an underscore.
  This is not permitted without a scope.
* New packages must not have uppercase letters in the name.
* The name ends up being part of a URL, an argument on the command line, and a folder name.
  Therefore, the name can't contain any non-URL-safe characters.

Some tips:

* Don't use the same name as a core Node module.
* Don't put "js" or "node" in the name.
  It's assumed that it's js, since you're writing a package.json file, and you can specify the engine using the "engines" field.
  (See below.)
* The name will probably be passed as an argument to require(), so it should be something short, but also reasonably descriptive.
* You may want to check the npm registry to see if there's something by that name already, before you get too attached to it.
  <https://www.npmjs.com/>

A name can be optionally prefixed by a scope, e.g. `@npm/example`.
See `scope` for more detail.

### version

If you plan to publish your package, the *most* important things in your package.json are the name and version fields as they will be required.
The name and version together form an identifier that is assumed to be completely unique.
Changes to the package should come along with changes to the version.
If you don't plan to publish your package, the name and version fields are optional.

Version must be parseable by node-semver, which is bundled with npm as a dependency.
(`npm install semver` to use it yourself.)

### description

Put a description in it.
It's a string.
This helps people discover your package, as it's listed in `npm search`.

### keywords

Put keywords in it.
It's an array of strings.
This helps people discover your package as it's listed in `npm search`.

Example:

```json
"keywords": [
  "node",
  "javascript",
  "npm"
]
```

### homepage

The URL to the project homepage.

Example:

```json
"homepage": "https://github.com/npm/example#readme"
```

### bugs

The URL to your project's issue tracker and / or the email address to which issues should be reported.
These are helpful for people who encounter issues with your package.

It should look like this:

```json
{
  "bugs": {
    "url": "https://github.com/npm/example/issues",
    "email": "user@example.com"
  }
}
```

You can specify either one or both values.
If you want to provide only a URL, you can specify the value for "bugs" as a simple string instead of an object.

If a URL is provided, it will be used by the `npm bugs` command.

### license

You should specify a license for your package so that people know how they are permitted to use it, and any restrictions you're placing on it.

If you're using a common license such as BSD-2-Clause or MIT, add a current SPDX license identifier for the license you're using, like this:

```json
{
  "license" : "BSD-3-Clause"
}
```

You can check the full list of SPDX license IDs.
Ideally, you should pick one that is OSI approved.

If your package is licensed under multiple common licenses, use an SPDX license expression syntax version 2.0 string, like this:

```json
{
  "license" : "(ISC OR GPL-3.0)"
}
```
If you are using a license that hasn't been assigned an SPDX identifier, or if you are using a custom license, use a string value like this one:

```json
{
  "license" : "SEE LICENSE IN <filename>"
}
```
Then include a file named `<filename>` at the top level of the package.

Some old packages used license objects or a "licenses" property containing an array of license objects:

```json
// Not valid metadata
{
  "license" : {
    "type" : "ISC",
    "url" : "https://opensource.org/licenses/ISC"
  }
}

// Not valid metadata
{
  "licenses" : [
    {
      "type": "MIT",
      "url": "https://www.opensource.org/licenses/mit-license.php"
    },
    {
      "type": "Apache-2.0",
      "url": "https://opensource.org/licenses/apache2.0.php"
    }
  ]
}
```

Those styles are now deprecated.
Instead, use SPDX expressions, like this:

```json
{
  "license": "ISC"
}
```

```json
{
  "license": "(MIT OR Apache-2.0)"
}
```

Finally, if you do not wish to grant others the right to use a private or unpublished package under any terms:

```json
{
  "license": "UNLICENSED"
}
```

Consider also setting `"private": true` to prevent accidental publication.

### people fields: author, contributors

The "author" is one person.
"contributors" is an array of people.
A "person" is an object with a "name" field and optionally "url" and "email", like this:

```json
{
  "name" : "Barney Rubble",
  "email" : "user@example.com",
  "url" : "http://barnyrubble.npmjs.com/"
}
```

Or you can shorten that all into a single string, and npm will parse it for you:

```json
{
  "author": "Barney Rubble <user@example.com> (http://barnyrubble.npmjs.com/)"
}
```

Both email and url are optional either way.

npm also sets a top-level "maintainers" field with your npm user info.

### funding

You can specify an object containing a URL that provides up-to-date information about ways to help fund development of your package, a string URL, or an array of objects and string URLs:

```json
{
  "funding": {
    "type" : "individual",
    "url" : "http://npmjs.com/donate"
  }
}
```

```json
{
  "funding": {
    "type" : "patreon",
    "url" : "https://www.patreon.com/user"
  }
}
```

```json
{
  "funding": "http://npmjs.com/donate"
}
```

```json
{
  "funding": [
    {
      "type" : "individual",
      "url" : "http://npmjs.com/donate"
    },
    "http://npmjs.com/donate-also",
    {
      "type" : "patreon",
      "url" : "https://www.patreon.com/user"
    }
  ]
}
```

Users can use the `npm fund` subcommand to list the `funding` URLs of all dependencies of their project, direct and indirect.
A shortcut to visit each funding URL is also available when providing the project name such as:
`npm fund <projectname>` (when there are multiple URLs, the first one will be visited)

### files

The optional `files` field is an array of file patterns that describes the entries to be included when your package is installed as a dependency.
File patterns follow a similar syntax to `.gitignore`, but reversed: including a file, directory, or glob pattern (`*`, `**/*`, and such) will make it so that file is included in the tarball when it's packed.
Omitting the field will make it default to `["*"]`, which means it will include all files.

Some special files and directories are also included or excluded regardless of whether they exist in the `files` array (see below).

You can also provide a `.npmignore` file in the root of your package or in subdirectories, which will keep files from being included.
At the root of your package it will not override the "files" field, but in subdirectories it will.
The `.npmignore` file works just like a `.gitignore`.
If there is a `.gitignore` file, and `.npmignore` is missing, `.gitignore`'s contents will be used instead.

Certain files are always included, regardless of settings:

* `package.json`
* `README`
* `LICENSE` / `LICENCE`
* The file in the "main" field
* The file(s) in the "bin" field

`README` & `LICENSE` can have any case and extension.

Some files are always ignored by default:

* `*.orig`
* `.*.swp`
* `.DS_Store`
* `._*`
* `.git`
* `.hg`
* `.lock-wscript`
* `.npmrc`
* `.svn`
* `.wafpickle-N`
* `CVS`
* `config.gypi`
* `node_modules`
* `npm-debug.log`
* `package-lock.json`
* `pnpm-lock.yaml`
* `yarn.lock`
* `bun.lockb`

Most of these ignored files can be included specifically if included in the `files` globs.
Exceptions to this are:

* `.git`
* `.npmrc`
* `node_modules`
* `package-lock.json`
* `pnpm-lock.yaml`
* `yarn.lock`
* `bun.lockb`

These cannot be included.

### exports

The "exports" provides a modern alternative to "main" allowing multiple entry points to be defined, conditional entry resolution support between environments, and preventing any other entry points besides those defined in "exports". This encapsulation allows module authors to clearly define the public interface for their package.
For more details see the node.js documentation on package entry points

### main

The main field is a module ID that is the primary entry point to your program.
That is, if your package is named `foo`, and a user installs it, and then does `require("foo")`, then your main module's exports object will be returned.

This should be a module relative to the root of your package folder.

For most modules, it makes the most sense to have a main script and often not much else.

If `main` is not set, it defaults to `index.js` in the package's root folder.

### type

The `type` field defines how Node.js should interpret `.js` files in your package. This field is not used by npm.

See the Node.js documentation on the type field for more information.

### browser

If your module is meant to be used client-side the browser field should be used instead of the main field.
This is helpful to hint users that it might rely on primitives that aren't available in Node.js modules.
(e.g. `window`)

### bin

A lot of packages have one or more executable files that they'd like to install into the PATH. npm makes this pretty easy (in fact, it uses this feature to install the "npm" executable.)

To use this, supply a `bin` field in your package.json which is a map of command name to local file name.
When this package is installed globally, that file will be either linked inside the global bins directory or a cmd (Windows Command File) will be created which executes the specified file in the `bin` field, so it is available to run by `name` or `name.cmd` (on Windows PowerShell).
When this package is installed as a dependency in another package, the file will be linked where it will be available to that package either directly by `npm exec` or by name in other scripts when invoking them via `npm run`.

For example, myapp could have this:

```json
{
  "bin": {
    "myapp": "bin/cli.js"
  }
}
```

So, when you install myapp, in case of unix-like OS it'll create a symlink from the `cli.js` script to `/usr/local/bin/myapp` and in case of windows it will create a cmd file usually at `C:\Users\{Username}\AppData\Roaming\npm\myapp.cmd` which runs the `cli.js` script.

If you have a single executable, and its name should be the name of the package, then you can just supply it as a string.
For example:

```json
{
  "name": "my-program",
  "version": "1.2.5",
  "bin": "path/to/program"
}
```

would be the same as this:

```json
{
  "name": "my-program",
  "version": "1.2.5",
  "bin": {
    "my-program": "path/to/program"
  }
}
```

Please make sure that your file(s) referenced in `bin` starts with `#!/usr/bin/env node`; otherwise, the scripts are started without the node executable!

Note that you can also set the executable files using directories.bin.

See folders for more info on executables.

### man

> **Note:** As of npm v12, man pages are no longer registered with the system `man` program. This field is retained for backward compatibility with package metadata and tools that consume it, but `man <pkgname>` will not work after a global install. Use `npm help <pkgname>` instead where supported.

Specify either a single file or an array of filenames to include as man pages.

If only a single file is provided, then it corresponds to `man <pkgname>`, regardless of its actual filename.
For example:

```json
{
  "name": "foo",
  "version": "1.2.3",
  "description": "A packaged foo fooer for fooing foos",
  "main": "foo.js",
  "man": "./man/doc.1"
}
```

would associate the `./man/doc.1` file such that it is the target for `man foo`

If the filename doesn't start with the package name, then it's prefixed.
So, this:

```json
{
  "name": "foo",
  "version": "1.2.3",
  "description": "A packaged foo fooer for fooing foos",
  "main": "foo.js",
  "man": [
    "./man/foo.1",
    "./man/bar.1"
  ]
}
```

will correspond to `man foo` and `man foo-bar`.

Man files must end with a number, and optionally a `.gz` suffix if they are compressed.
The number dictates which man section the file belongs to.

```json
{
  "name": "foo",
  "version": "1.2.3",
  "description": "A packaged foo fooer for fooing foos",
  "main": "foo.js",
  "man": [
    "./man/foo.1",
    "./man/foo.2"
  ]
}
```

will create entries for `man foo` and `man 2 foo`

### directories

The CommonJS Packages spec details a few ways that you can indicate the structure of your package using a `directories` object.
If you look at npm's package.json, you'll see that it has directories for doc, lib, and man.

In the future, this information may be used in other creative ways.

#### directories.bin

If you specify a `bin` directory in `directories.bin`, all the files in that folder will be added.

Because of the way the `bin` directive works, specifying both a `bin` path and setting `directories.bin` is an error.
If you want to specify individual files, use `bin`, and for all the files in an existing `bin` directory, use `directories.bin`.

#### directories.man

A folder that is full of man pages.
Sugar to generate a "man" array by walking the folder. See the note on `man` above: as of npm v12, these are no longer installed into the system `man` path.
