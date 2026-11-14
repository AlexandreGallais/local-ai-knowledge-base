---
title: "venv --- Creation of virtual environments (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/venv.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# venv --- Creation of virtual environments (part 2 of 3)

## API

The high-level method described above makes use of a simple API which provides
mechanisms for third-party virtual environment creators to customize environment
creation according to their needs, the `EnvBuilder` class.

### class `EnvBuilder(system_site_packages=False, clear=False, \`

```python
symlinks=False, upgrade=False, with_pip=False, \
prompt=None, upgrade_deps=False, \
*, scm_ignore_files=frozenset())
```

The `EnvBuilder` class accepts the following keyword arguments on
instantiation:

- *system_site_packages* -- a boolean value indicating that the system Python
site-packages should be available to the environment (defaults to `False`).

- *clear* -- a boolean value which, if true, will delete the contents of
any existing target directory, before creating the environment.

- *symlinks* -- a boolean value indicating whether to attempt to symlink the
Python binary rather than copying.

- *upgrade* -- a boolean value which, if true, will upgrade an existing
environment with the running Python - for use when that Python has been
upgraded in-place (defaults to `False`).

- *with_pip* -- a boolean value which, if true, ensures pip is
installed in the virtual environment. This uses `ensurepip` with
the `--default-pip` option.

- *prompt* -- a string to be used after virtual environment is activated
(defaults to `None` which means directory name of the environment would
be used). If the special string `"."` is provided, the basename of the
current directory is used as the prompt.

- *upgrade_deps* -- Update the base venv modules to the latest on PyPI

- *scm_ignore_files* -- Create ignore files based for the specified source
control managers (SCM) in the iterable. Support is defined by having a
method named `create_{scm}_ignore_file`. The only value supported by
default is `"git"` via `create_git_ignore_file()`.

> *Changed in version 3.4.*
> Added the `with_pip` parameter

> *Changed in version 3.6.*
> Added the `prompt` parameter

> *Changed in version 3.9.*
> Added the `upgrade_deps` parameter

> *Changed in version 3.13.*
> Added the `scm_ignore_files` parameter

`EnvBuilder` may be used as a base class.

### `create(env_dir)`

Create a virtual environment by specifying the target directory
(absolute or relative to the current directory) which is to contain the
virtual environment.  The `create` method will either create the
environment in the specified directory, or raise an appropriate
exception.

The `create` method of the `EnvBuilder` class illustrates the
hooks available for subclass customization:

```
def create(self, env_dir):
    """
    Create a virtualized Python environment in a directory.
    env_dir is the target directory to create an environment in.
    """
    env_dir = os.path.abspath(env_dir)
    context = self.ensure_directories(env_dir)
    self.create_configuration(context)
    self.setup_python(context)
    self.setup_scripts(context)
    self.post_setup(context)
```

Each of the methods `ensure_directories()`,
`create_configuration()`, `setup_python()`,
`setup_scripts()` and `post_setup()` can be overridden.

### `ensure_directories(env_dir)`

Creates the environment directory and all necessary subdirectories that
don't already exist, and returns a context object.  This context object
is just a holder for attributes (such as paths) for use by the other
methods.  If the `EnvBuilder` is created with the arg
`clear=True`, contents of the environment directory will be cleared
and then all necessary subdirectories will be recreated.

The returned context object is a `types.SimpleNamespace` with the
following attributes:

- `env_dir` - The location of the virtual environment. Used for
`__VENV_DIR__` in activation scripts (see `install_scripts()`).

- `env_name` - The name of the virtual environment. Used for
`__VENV_NAME__` in activation scripts (see `install_scripts()`).

- `prompt` - The prompt to be used by the activation scripts. Used for
`__VENV_PROMPT__` in activation scripts (see `install_scripts()`).

- `executable` - The underlying Python executable used by the virtual
environment. This takes into account the case where a virtual environment
is created from another virtual environment.

- `inc_path` - The include path for the virtual environment.

- `lib_path` - The purelib path for the virtual environment.

- `platlib_path` - The platlib path for the virtual environment.

- `bin_path` - The script path for the virtual environment.

- `bin_name` - The name of the script path relative to the virtual
environment location. Used for `__VENV_BIN_NAME__` in activation
scripts (see `install_scripts()`).

- `env_exe` - The name of the Python interpreter in the virtual
environment. Used for `__VENV_PYTHON__` in activation scripts
(see `install_scripts()`).

- `env_exec_cmd` - The name of the Python interpreter, taking into
account filesystem redirections. This can be used to run Python in
the virtual environment.

> *Changed in version 3.11.*
> The *venv*
> sysconfig installation scheme
> is used to construct the paths of the created directories.

> *Changed in version 3.12.*
> The attribute `lib_path` was added to the context, and the context
> object was documented.

> *Changed in version 3.15.*
> The attribute `platlib_path` was added to the context.

### `create_configuration(context)`

Creates the `pyvenv.cfg` configuration file in the environment.

### `setup_python(context)`

Creates a copy or symlink to the Python executable in the environment.
On POSIX systems, if a specific executable `python3.x` was used,
symlinks to `python` and `python3` will be created pointing to that
executable, unless files with those names already exist.

### `setup_scripts(context)`

Installs activation scripts appropriate to the platform into the virtual
environment.

### `upgrade_dependencies(context)`

Upgrades the core venv dependency packages (currently pip)
in the environment. This is done by shelling out to the
`pip` executable in the environment.

> *Added in version 3.9.*

> *Changed in version 3.12.*
> setuptools is no longer a core venv dependency.

### `post_setup(context)`

A placeholder method which can be overridden in third party
implementations to pre-install packages in the virtual environment or
perform other post-creation steps.

### `install_scripts(context, path)`

This method can be
called from `setup_scripts()` or `post_setup()` in subclasses to
assist in installing custom scripts into the virtual environment.

*path* is the path to a directory that should contain subdirectories
`common`, `posix`, `nt`; each containing scripts destined for the
`bin` directory in the environment.  The contents of `common` and the
directory corresponding to `os.name` are copied after some text
replacement of placeholders:

- `__VENV_DIR__` is replaced with the absolute path of the environment
directory.

- `__VENV_NAME__` is replaced with the environment name (final path
segment of environment directory).

- `__VENV_PROMPT__` is replaced with the prompt (the environment
name surrounded by parentheses and with a following space)

- `__VENV_BIN_NAME__` is replaced with the name of the bin directory
(either `bin` or `Scripts`).

- `__VENV_PYTHON__` is replaced with the absolute path of the
environment's executable.

The directories are allowed to exist (for when an existing environment
is being upgraded).

### `create_git_ignore_file(context)`

Creates a `.gitignore` file within the virtual environment that causes
the entire directory to be ignored by the Git source control manager.

> *Added in version 3.13.*

> *Changed in version 3.7.2.*
> Windows now uses redirector scripts for `python[w].exe` instead of
> copying the actual binaries. In 3.7.2 only `setup_python()` does
> nothing unless running from a build in the source tree.

> *Changed in version 3.7.3.*
> Windows copies the redirector scripts as part of `setup_python()`
> instead of `setup_scripts()`. This was not the case in 3.7.2.
> When using symlinks, the original executables will be linked.

There is also a module-level convenience function:

### `create(env_dir, system_site_packages=False, clear=False, \`

```python
symlinks=False, with_pip=False, prompt=None, \
upgrade_deps=False, *, scm_ignore_files=frozenset())
```

Create an `EnvBuilder` with the given keyword arguments, and call its
`create()` method with the *env_dir* argument.

> *Added in version 3.3.*

> *Changed in version 3.4.*
> Added the *with_pip* parameter

> *Changed in version 3.6.*
> Added the *prompt* parameter

> *Changed in version 3.9.*
> Added the *upgrade_deps* parameter

> *Changed in version 3.13.*
> Added the *scm_ignore_files* parameter
