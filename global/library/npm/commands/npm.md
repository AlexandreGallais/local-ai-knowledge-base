---
title: "npm"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm

### Version

@VERSION@

### Description

npm is the package manager for the Node JavaScript platform.
It puts modules in place so that node can find them, and manages dependency conflicts intelligently.

It is extremely configurable to support a variety of use cases.
Most commonly, you use it to publish, discover, install, and develop node programs.

Run `npm help` to get a list of available commands.

### Important

npm comes preconfigured to use npm's public registry at https://registry.npmjs.org by default.
Use of the npm public registry is subject to terms of use available at https://docs.npmjs.com/policies/terms.

You can configure npm to use any compatible registry you like, and even run your own registry.
Use of someone else's registry is governed by their terms of use.

### Introduction

You probably got npm because you want to install stuff.

The very first thing you will most likely want to run in any node program is `npm install` to install its dependencies.

You can also run `npm install blerg` to install the latest version of "blerg".  Check out `npm install` for more info.
It can do a lot of stuff.

Use the `npm search` command to show everything that's available in the public registry.
Use `npm ls` to show everything you've installed.

### Dependencies

If a package lists a dependency using a git URL, npm will install that dependency using the `git` command and will generate an error if it is not installed.

If one of the packages npm tries to install is a native node module and requires compiling of C++ Code, npm will use node-gyp for that task.
For a Unix system, node-gyp needs Python, make and a buildchain like GCC. On Windows, Python and Microsoft Visual Studio C++ are needed.
For more information visit the node-gyp repository and the node-gyp Wiki.

### Directories

See `folders` to learn about where npm puts stuff.

In particular, npm has two modes of operation:

* local mode:
  npm installs packages into the current project directory, which defaults to the current working directory.
  Packages install to `./node_modules`, and bins to `./node_modules/.bin`.
* global mode:
  npm installs packages into the install prefix at `$NPM_CONFIG_PREFIX/lib/node_modules` and bins to `$NPM_CONFIG_PREFIX/bin`.

Local mode is the default.
Use `-g` or `--global` on any command to run in global mode instead.

### Developer Usage

If you're using npm to develop and publish your code, check out the following help topics:

* json:
  Make a package.json file.
  See `package.json`.
* link:
  Links your current working code into Node's path, so that you don't have to reinstall every time you make a change.
  Use `npm link` to do this.
* install:
  It's a good idea to install things if you don't need the symbolic link.
  Especially, installing other peoples code from the registry is done via `npm install`
* login:
  Log in to the registry and store credentials.
  When you do this, npm will store credentials in the user config file.
* publish:
  Use the `npm publish` command to upload your code to the registry.

#### Configuration

npm is extremely configurable.
It reads its configuration options from 5 places.

* Command line switches:
  Set a config with `--key val`.
  All keys take a value, even if they are booleans (the config parser doesn't know what the options are at the time of parsing).
  If you do not provide a value (`--key`) then the option is set to boolean `true`.
* Environment Variables:
  Set any config by prefixing the name in an environment variable with `NPM_CONFIG_`.
  For example, `export NPM_CONFIG_KEY=val`.
* User Configs:
  The file at `$HOME/.npmrc` is an ini-formatted list of configs.
  If present, it is parsed.
  If the `userconfig` option is set in the cli or env, that file will be used instead.
* Global Configs:
  The file found at `./etc/npmrc` (relative to the global prefix will be parsed if it is found.
  See `npm prefix` for more info on the global prefix.
  If the `globalconfig` option is set in the cli, env, or user config, then that file is parsed instead.
* Defaults:
  npm's default configuration options are defined in `lib/utils/config/definitions.js`.
  These must not be changed.

See `config` for much, much, more information.

### Contributions

Patches welcome!

If you would like to help, but don't know what to work on, read the contributing guidelines and check the issues list.

### Bugs

When you find issues, please report them:
<https://github.com/npm/cli/issues>

Please be sure to follow the template and bug reporting guidelines.

### Feature Requests

Discuss new feature ideas on our discussion forum:

* <https://github.com/orgs/community/discussions/categories/npm>

Or suggest formal RFC proposals:

* <https://github.com/npm/rfcs>

### See Also

* npm help
* package.json
* npmrc
* npm config
* npm install
* npm prefix
* npm publish
