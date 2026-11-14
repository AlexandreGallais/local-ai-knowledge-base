---
title: "site --- Site-specific configuration hook (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/site.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# site --- Site-specific configuration hook (part 2 of 2)

## Module contents

### `PREFIXES`

A list of prefixes for site-packages directories.

### `ENABLE_USER_SITE`

Flag showing the status of the user site-packages directory.  `True` means
that it is enabled and was added to `sys.path`.  `False` means that it
was disabled by user request (with `-s` or
`PYTHONNOUSERSITE`).  `None` means it was disabled for security
reasons (mismatch between user or group id and effective id) or by an
administrator.

### `USER_SITE`

Path to the user site-packages for the running Python.  Can be `None` if
`getusersitepackages()` hasn't been called yet.  Default value is
`Y}[t]/site-packages` for UNIX and non-framework
macOS builds, `Y}/lib/python/site-packages` for macOS
framework builds, and `{%APPDATA%}\Python\Python{XY}\site-packages`
on Windows.  The optional "t" indicates the free-threaded build.  This
directory is a site directory, which means that `.pth` files in it
will be processed.

### `USER_BASE`

Path to the base directory for the user site-packages.  Can be `None` if
`getuserbase()` hasn't been called yet.  Default value is
`local` for UNIX and macOS non-framework builds,
`Y}` for macOS framework builds, and
`{%APPDATA%}\Python` for Windows.  This value is used to
compute the installation directories for scripts, data files, Python modules,
etc. for the user installation scheme.
See also `PYTHONUSERBASE`.

### `main()`

Adds all the standard site-specific directories to the module search
path.  This function is called automatically when this module is imported,
unless the Python interpreter was started with the `-S` flag.

> *Changed in version 3.3.*
> This function used to be called unconditionally.

### `makepath(*paths)`

Join *paths* with `os.path.join()`, attempt to make the result
absolute with `os.path.abspath()`, and return a 2-tuple containing
the absolute path and its case-normalized form as produced by
`os.path.normcase()`.  If `os.path.abspath()` raises
`OSError`, the joined path is used unchanged for the
case-normalization step.

The second element of the returned tuple is the form used throughout the
`site` module to compare paths on case-insensitive file systems, and
is what populates the `known_paths` sets that prevent duplicate
`sys.path` entries in various APIs within this module.

### class `StartupState(known_paths=None)`

Instances of this class accumulate interpreter startup configuration data
from one or more site directories.  They are the preferred interface for
batching the processing of `.pth` and `.start` files across
multiple site directories, so that every `sys.path` extension is
visible before any startup code runs.

The optional *known_paths* argument is a set of case-normalized paths
(which can be produced by `makepath()`) used to prevent duplicate
`sys.path` entries.  When `None` (the default), the set is built
from the current `sys.path`.  `main()` implicitly uses an
instance of this class.

Typical use:

```python
state = site.StartupState()
for sitedir in site_dirs:
    state.addsitedir(sitedir)
state.process()
```

> *Added in version 3.15.*

### `addsitedir(sitedir)`

Read the `.pth` and `.start` files in *sitedir* and
record their `sys.path` extensions, deprecated `.pth`
`import` lines, and `.start` entry points on this state.
The recorded data is not applied until `process()` is called.

### `addusersitepackages()`

Add the per-user site-packages directory, if enabled and if it exists.
The directory's startup data is accumulated for later processing by
`process()`.

### `addsitepackages(prefixes=None)`

Add global site-packages directories, computed from *prefixes* or from
the global `PREFIXES` when *prefixes* is `None`.  Each
directory's startup data is accumulated for later processing by
`process()`.

### `process()`

Apply the accumulated state by first adding the path extensions to
`sys.path`, then executing the `.start` file entry points
and `.pth` file `import` lines (:ref:`deprecated
<site-pth-files>`).

This method is not idempotent and must not be called more than once
on the same instance.  Doing so will apply the accumulated state
more than once, re-running entry points and `import` lines.

### `addsitedir(sitedir, known_paths=None)`

Add a directory to sys.path and parse the `.pth` and `.start`
files found in that directory.  Typically used in `sitecustomize` or
`usercustomize` (see above).

The *known_paths* argument is an optional set of case-normalized paths
used to prevent duplicate `sys.path` entries.  When `None` (the
default), the set is built from the current `sys.path`.

For batched processing across multiple site directories, build a
`StartupState` explicitly and call `StartupState.addsitedir()`
on it; that defers `.pth` and `.start` processing until a
single `StartupState.process()` call, ensuring every `sys.path`
extension is visible before any startup code runs.

> *Changed in version 3.15.*
> Also processes `.start` files.  See site-start-files.

### `getsitepackages(prefixes=None)`

Return a list containing all global site-packages directories.

For each directory given in *prefixes* (or `PREFIXES` if *prefixes*
is `None`), this function will compute its site-packages subdirectory
depending on the system environment, and will return a list of full paths,
which are not checked for existence.

> *Added in version 3.2.*

> *Changed in version 3.3.*
> Added the optional *prefixes* parameter.

### `getuserbase()`

Return the path of the user base directory, `USER_BASE`.  If it is not
initialized yet, this function will also set it, respecting
`PYTHONUSERBASE`.

> *Added in version 3.2.*

### `getusersitepackages()`

Return the path of the user-specific site-packages directory,
`USER_SITE`.  If it is not initialized yet, this function will also set
it, respecting `USER_BASE`.  To determine if the user-specific
site-packages was added to `sys.path` `ENABLE_USER_SITE` should be
used.

> *Added in version 3.2.*

## Command-line interface

site

The `site` module also provides a way to get the user directories from the
command line:

```shell-session
$ python -m site --user-site
/home/user/.local/lib/python3.11/site-packages
```

If it is called without arguments, it will print the contents of
`sys.path` on the standard output, followed by the value of
`USER_BASE` and whether the directory exists, then the same thing for
`USER_SITE`, and finally the value of `ENABLE_USER_SITE`.

### option `--user-base`

Print the path to the user base directory.

### option `--user-site`

Print the path to the user site-packages directory.

If both options are given, user base and user site will be printed (always in
this order), separated by `os.pathsep`.

If any option is given, the script will exit with one of these values: `0` if
the user site-packages directory is enabled, `1` if it was disabled by the
user, `2` if it is disabled for security reasons or by an administrator, and a
value greater than 2 if there is an error.

> **See also:** - PEP 370 -- Per user site-packages directory
> - PEP 829 -- Startup entry points and the deprecation of import lines in `.pth` files
> - sys-path-init -- The initialization of `sys.path`.
