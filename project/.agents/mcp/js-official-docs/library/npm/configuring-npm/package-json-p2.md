---
title: "package.json (part 2 of 3)"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/configuring-npm/package-json.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# package.json (part 2 of 3)

### repository

Specify the place where your code lives.
This is helpful for people who want to contribute.
If the git repo is on GitHub, then the `npm repo` command will be able to find you.

Do it like this:

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/npm/cli.git"
  }
}
```

The URL should be a publicly available (perhaps read-only) URL that can be handed directly to a VCS program without any modification.
It should not be a URL to an html project page that you put in your browser.
It's for computers.

For GitHub, GitHub gist, Bitbucket, or GitLab repositories you can use the same shortcut syntax you use for `npm install`:

```json
{
  "repository": "npm/example",

  "repository": "github:npm/example",

  "repository": "gist:11081aaa281",

  "repository": "bitbucket:user/repo",

  "repository": "gitlab:user/repo"
}
```

**Note on normalization:** When you publish a package, npm normalizes the `repository` field to the full object format with a `url` property. If you use a shorthand format (like `"npm/example"`), you'll see a warning during `npm publish` indicating that the field was auto-corrected. While the shorthand format currently works, it's recommended to use the full object format in your `package.json` to avoid warnings and ensure future compatibility:

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/npm/example.git"
  }
}
```

You can run `npm pkg fix` to automatically convert shorthand formats to the normalized object format.

If the `package.json` for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives:

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/npm/cli.git",
    "directory": "workspaces/libnpmpublish"
  }
}
```

### scripts

The "scripts" property is a dictionary containing script commands that are run at various times in the lifecycle of your package.
The key is the lifecycle event, and the value is the command to run at that point.

See `scripts` to find out more about writing package scripts.

### gypfile

If you have a binding.gyp file in the root of your package and you have not defined your own `install` or `preinstall` scripts, npm will default to building your module using node-gyp.

To prevent npm from automatically building your module with node-gyp, set `gypfile` to `false`:

```json
{
  "gypfile": false
}
```

This is useful for packages that include native addons but want to handle the build process differently, or packages that have a binding.gyp file but should not be built as a native addon.

### config

A "config" object can be used to set configuration parameters used in package scripts that persist across upgrades.
For instance, if a package had the following:

```json
{
  "name": "foo",
  "config": {
    "port": "8080"
  }
}
```

It could also have a "start" script that referenced the `npm_package_config_port` environment variable.

### dependencies

Dependencies are specified in a simple object that maps a package name to a version range.
The version range is a string which has one or more space-separated descriptors.
Dependencies can also be identified with a tarball or git URL.

**Please do not put test harnesses or transpilers or other "development" time tools in your `dependencies` object.**
See `devDependencies`, below.

See semver for more details about specifying version ranges.

* `version` Must match `version` exactly
* `>version` Must be greater than `version`
* `>=version` etc
* `<version`
* `<=version`
* `~version` "Approximately equivalent to version"  See semver
* `^version` "Compatible with version"  See semver
* `1.2.x` 1.2.0, 1.2.1, etc., but not 1.3.0
* `http://...` See 'URLs as Dependencies' below
* `*` Matches any version
* `""` (just an empty string) Same as `*`
* `version1 - version2` Same as `>=version1 <=version2`.
* `range1 || range2` Passes if either range1 or range2 are satisfied.
* `git...` See 'Git URLs as Dependencies' below
* `user/repo` See 'GitHub URLs' below
* `tag` A specific version tagged and published as `tag`  See `npm dist-tag`
* `path/path/path` See Local Paths below
* `npm:@scope/pkg@version` Custom alias for a package See `package-spec`

For example, these are all valid:

```json
{
  "dependencies": {
    "foo": "1.0.0 - 2.9999.9999",
    "bar": ">=1.0.2 <2.1.2",
    "baz": ">1.0.2 <=2.3.4",
    "boo": "2.0.1",
    "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
    "asd": "http://npmjs.com/example.tar.gz",
    "til": "~1.2",
    "elf": "~1.2.3",
    "two": "2.x",
    "thr": "3.3.x",
    "lat": "latest",
    "dyl": "file:../dyl",
    "kpg": "npm:user@example.com"
  }
}
```

#### URLs as Dependencies

You may specify a tarball URL in place of a version range.

This tarball will be downloaded and installed locally to your package at install time.

#### Git URLs as Dependencies

Git URLs are of the form:

```bash
<protocol>://[<user>[:<example-password>@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]
```

`<protocol>` is one of `git`, `git+ssh`, `git+http`, `git+https`, or `git+file`.

If `#<commit-ish>` is provided, it will be used to clone exactly that commit.
If the commit-ish has the format `#semver:<semver>`, `<semver>` can be any valid semver range or exact version, and npm will look for any tags or refs matching that range in the remote repository, much as it would for a registry dependency.
If neither `#<commit-ish>` or `#semver:<semver>` is specified, then the default branch is used.

Examples:

```bash
git+ssh://user@example.com:npm/cli.git#v1.0.27
git+ssh://user@example.com:npm/cli#semver:^5.0
git+https://user@example.com/npm/cli.git
git://github.com/npm/cli.git#v1.0.27
```

When installing from a `git` repository, the presence of certain fields in the `package.json` will cause npm to believe it needs to perform a build.
To do so your repository will be cloned into a temporary directory, all of its deps installed, relevant scripts run, and the resulting directory packed and installed.

This flow will occur if your git dependency uses `workspaces`, or if any of the following scripts are present:

* `build`
* `prepare`
* `prepack`
* `preinstall`
* `install`
* `postinstall`

If your git repository includes pre-built artifacts, you will likely want to make sure that none of the above scripts are defined, or your dependency will be rebuilt for every installation.

#### GitHub URLs

As of version 1.1.65, you can refer to GitHub URLs as just "foo":
"user/foo-project".  Just as with git URLs, a `commit-ish` suffix can be included.
For example:

```json
{
  "name": "foo",
  "version": "0.0.0",
  "dependencies": {
    "express": "expressjs/express",
    "mocha": "mochajs/mocha#4727d357ea",
    "module": "npm/example-github-repo#feature\/branch"
  }
}
```

#### Local Paths

As of version 2.0.0 you can provide a path to a local directory that contains a package.
Local paths can be saved using `npm install -S` or `npm install --save`, using any of these forms:

```bash
../foo/bar
~/foo/bar
./foo/bar
/foo/bar
```

in which case they will be normalized to a relative path and added to your `package.json`.
For example:

```json
{
  "name": "baz",
  "dependencies": {
    "bar": "file:../foo/bar"
  }
}
```

This feature is helpful for local offline development and creating tests that require npm installing where you don't want to hit an external server, but should not be used when publishing your package to the public registry.

*note*: Packages linked by local path will not have their own dependencies installed when `npm install` is run.
You must run `npm install` from inside the local path itself.

### devDependencies

If someone is planning on downloading and using your module in their program, then they probably don't want or need to download and build the external test or documentation framework that you use.

In this case, it's best to map these additional items in a `devDependencies` object.

These things will be installed when doing `npm link` or `npm install` from the root of a package, and can be managed like any other npm configuration param.
See `config` for more on the topic.

For build steps that are not platform-specific, such as compiling CoffeeScript or other languages to JavaScript, use the `prepare` script to do this, and make the required package a devDependency.

For example:

```json
{
  "name": "@npm/ethopia-waza",
  "description": "a delightfully fruity coffee varietal",
  "version": "1.2.3",
  "devDependencies": {
    "coffee-script": "~1.6.3"
  },
  "scripts": {
    "prepare": "coffee -o lib/ -c src/waza.coffee"
  },
  "main": "lib/waza.js"
}
```

The `prepare` script will be run before publishing, so that users can consume the functionality without requiring them to compile it themselves.
In dev mode (ie, locally running `npm install`), it'll run this script as well, so that you can test it easily.

### peerDependencies

In some cases, you want to express the compatibility of your package with a host tool or library, while not necessarily doing a `require` of this host.
This is usually referred to as a *plugin*. Notably, your module may be exposing a specific interface, expected and specified by the host documentation.

For example:

```json
{
  "name": "@npm/tea-latte",
  "version": "1.3.5",
  "peerDependencies": {
    "@npm/tea": "2.x"
  }
}
```

This ensures your package `@npm/tea-latte` can be installed *along* with the second major version of the host package `@npm/tea` only.
`npm install tea-latte` could possibly yield the following dependency graph:

```bash
├── @npm/user@example.com
└── @npm/user@example.com
```

In npm versions 3 through 6, `peerDependencies` were not automatically installed, and would raise a warning if an invalid version of the peer dependency was found in the tree.
As of npm v7, peerDependencies _are_ installed by default.

Trying to install another plugin with a conflicting requirement may cause an error if the tree cannot be resolved correctly.
For this reason, make sure your plugin requirement is as broad as possible, and not to lock it down to specific patch versions.

Assuming the host complies with semver, only changes in the host package's major version will break your plugin.
Thus, if you've worked with every 1.x version of the host package, use `"^1.0"` or `"1.x"` to express this.
If you depend on features introduced in 1.5.2, use `"^1.5.2"`.

### peerDependenciesMeta

The `peerDependenciesMeta` field serves to provide npm more information on how your peer dependencies are to be used.
Specifically, it allows peer dependencies to be marked as optional.
Npm will not automatically install optional peer dependencies.
This allows you to integrate and interact with a variety of host packages without requiring all of them to be installed.

For example:

```json
{
  "name": "@npm/tea-latte",
  "version": "1.3.5",
  "peerDependencies": {
    "@npm/tea": "2.x",
    "@npm/soy-milk": "1.2"
  },
  "peerDependenciesMeta": {
    "@npm/soy-milk": {
      "optional": true
    }
  }
}
```

### bundleDependencies

This defines an array of package names that will be bundled when publishing the package.

In cases where you need to preserve npm packages locally or have them available through a single file download, you can bundle the packages in a tarball file by specifying the package names in the `bundleDependencies` array and executing `npm pack`.

For example:

If we define a package.json like this:

```json
{
  "name": "@npm/awesome-web-framework",
  "version": "1.0.0",
  "bundleDependencies": [
    "@npm/renderized",
    "@npm/super-streams"
  ]
}
```

we can obtain `@npm/awesome-web-framework-1.0.0.tgz` file by running `npm pack`.
This file contains the dependencies `@npm/renderized` and `@npm/super-streams` which can be installed in a new project by executing `npm install awesome-web-framework-1.0.0.tgz`.
Note that the package names do not include any versions, as that information is specified in `dependencies`.

If this is spelled `"bundledDependencies"`, then that is also honored.

Alternatively, `"bundleDependencies"` can be defined as a boolean value.
A value of `true` will bundle all dependencies, a value of `false` will bundle none.

### optionalDependencies

If a dependency can be used, but you would like npm to proceed if it cannot be found or fails to install, then you may put it in the `optionalDependencies` object.
This is a map of package name to version or URL, just like the `dependencies` object.
The difference is that build failures do not cause installation to fail.
Running `npm install --omit=optional` will prevent these dependencies from being installed.

For example:

```json
{
  "optionalDependencies": {
    "@npm/foo": "^1.0.0"
  }
}
```

It is still your program's responsibility to handle the lack of the dependency.
For example, something like this:

```js
try {
  var foo = require('@npm/foo')
  var fooVersion = require('@npm/foo/package.json').version
} catch (er) {
  foo = null
}
if ( notGoodFooVersion(fooVersion) ) {
  foo = null
}

// .. then later in your program ..

if (foo) {
  foo.doFooThings()
}
```

Entries in `optionalDependencies` will override entries of the same name in `dependencies`, so it's usually best to only put in one place.
