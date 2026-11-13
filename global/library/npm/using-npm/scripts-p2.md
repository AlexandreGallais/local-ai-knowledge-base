---
title: "Scripts (part 2 of 2)"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/using-npm/scripts.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# Scripts (part 2 of 2)

### Best Practices

* Don't exit with a non-zero error code unless you *really* mean it.
  If the failure is minor or only will prevent some optional features, then it's better to just print a warning and exit successfully.
* Try not to use scripts to do what npm can do for you.
Read through `package.json` to see all the things that you can specify and enable by simply describing your package appropriately.
In general, this will lead to a more robust and consistent state.
* Inspect the env to determine where to put things.
For instance, if the `NPM_CONFIG_BINROOT` environment variable is set to `/home/user/bin`, then don't try to install executables into `/usr/local/bin`.
The user probably set it up that way for a reason.
* Don't prefix your script commands with "sudo".  If root permissions are required for some reason, then it'll fail with that error, and the user will sudo the npm command in question.
* Don't use `install`.
Use a `.gyp` file for compilation, and `prepare` for anything else.
You should almost never have to explicitly set a preinstall or install script.
If you are doing this, please consider if there is another option.
The only valid use of `install` or `preinstall` scripts is for compilation which must be done on the target architecture.

### See Also

* npm run
* package.json
* npm developers
* npm install
