# pkg

```octave
function [local_packages, global_packages] = pkg (varargin)
```

@deftypefn  {} {} pkg @var{command}
@deftypefnx {} {} pkg @var{command} @var{pkg_name}
@deftypefnx {} {} pkg @var{command} @var{pkg_name1} @var{pkg_name2} @dots{}
@deftypefnx {} {} pkg @var{command} @var{option1} @dots{} @var{pkg_name1} @dots{}
@deftypefnx {} {[@var{out1}, @dots{}] =} pkg (@var{command}, @dots{})
Manage or query packages (groups of add-on functions) for Octave.

Depending on the value of @var{command} and on the number of requested
return arguments, @code{pkg} can be used to perform several tasks.
Possible values for @var{command} are:

@table @samp

@item search
Search for packages having the specified search terms in the Octave Packages
index.  This may require an internet connection and the cURL library.

@example
pkg search foo bar baz
@end example

@noindent
shows packages whose descriptions contain all the search terms.

Search terms are case-insensitive and can be regular expressions as well.
For example,

@example
pkg search "[aeiou]@{4,@}"
@end example

@noindent
shows all packages whose descriptions have four or more consecutive vowels.

The option @option{-all} as in

@example
pkg search -all
@end example

@noindent
shows @emph{all} packages available on the Octave Packages index (not only
those that can be installed with the @command{pkg} command).

By default, the Octave Packages index is downloaded only once per Octave
session in order to improve performance and to reduce the load on the index
server during repeated searches.  An update of the index can be enforced
with the option @option{-refresh}:

@example
pkg search -all -refresh foo
@end example

If an output variable is provided, as in

@example
mypackages = pkg ("search", "foo")
@end example

@noindent
then @code{pkg search} returns only those package names matching the search
term(s) @emph{and} which can be installed with @code{pkg install}.

@item install
Install named packages.  For example, each of the following commands:

@example
@group
pkg install pkgname
pkg install 'pkgname-1.0.0.tar.gz'
pkg install 'https://somewebsite.org/pkgname-1.0.0.tar.gz'
@end group
@end example

@noindent
might install the package @code{pkgname}.  The sequence for the resolution
of the arguments after @code{pkg install} is:

@enumerate
@item
If @code{pkgname} is a local file, Octave installs it.

@item
Otherwise, if @code{pkgname} resembles a URL, Octave downloads and
installs it.

@item
Otherwise, Octave queries the Octave Packages index online for a package
named @code{pkgname}, and if found, downloads and installs its latest
version.  If the Octave Packages index cannot be reached, a locally cached
version of the index might be used.  The Octave Packages index is only
downloaded once per Octave session (unless an index refresh is requested
with the option @option{-refresh}).
@end enumerate

Online access requires an internet connection and the cURL library.

@noindent
@emph{No support}: the GNU Octave community is not responsible for any
installed packages.  For support or for reporting bugs, you need to contact
the maintainers of the installed package directly (run @code{pkg describe}
on the package to get information).

The following options are accepted for @code{pkg install}:

@table @code
@item -nodeps
Disable dependency checking.  With this option it is possible to install a
package even when it depends on another package which is not installed on
the system.  @strong{Use this option with care.}

@item -local
A local installation (package available only to current user) is forced,
even if Octave is being run with administrative privileges.

@item -global
Force a global installation (package available to all users), even if
Octave is not being run with administrative privileges.  The user must have
write access to the global package store.

@item -verbose
Print the output of all commands as they are performed.

@item -refresh
Force an update of the cached package database from the online index.  By
default, Octave tries to download the Octave Packages index only once per
Octave session.  This option forces refreshing the index even if it was
already downloaded in the current Octave session.  The option
@option{-refresh} applies to @code{install}, @code{search}, and
@code{update} commands.

@item -forge
The option @option{-forge} forces an installation of a package from the
Octave Packages index.  It cannot be used to install packages from a URL or
a local file.  It implies @option{-refresh}.
@end table

If the package tarball contains a @file{configure} script, it is run during
the installation of the package.  If it contains a @file{Makefile}, the
command @command{make} is used by default.  It is possible to override the
default command with the environment variable @env{MAKE}.  Some Octave
packages might require GNU @command{make} which may be present under a
different name such as @command{gmake}.

@item update
Check installed Octave packages against the latest version on the Octave
Packages index and update any outdated items.  Updated packages are
installed either globally or locally depending on whether Octave is running
with elevated privileges.  This requires an internet connection and the cURL
library.

Options for the install command and the names of individual packages to be
checked for updates may be specified as a list following the update command.
If the option @option{-local} or @option{-global} is specified,
@code{pkg update} limits the update check to the local or global installed
packages, and installs updates in that same context.  For example,

Update all packages:

@example
pkg update
@end example

Update all local packages:

@example
pkg update -local
@end example

Update certain packages, ignore dependencies, max verbosity:

@example
pkg update -verbose -nodeps image signal geometry
@end example

@noindent
Updates for multiple packages are sorted alphabetically and not checked
for dependencies affected by installation order.  If a dependency order
related @code{pkg update} failure occurs, use @code{pkg update -nodeps} to
ignore dependencies, or @code{pkg install <package_name>} to update
individual packages manually.

@item uninstall
Uninstall named packages.  For example,

@example
pkg uninstall image
@end example

@noindent
removes the @code{image} package from the system.  If another installed
package depends on the @code{image} package an error is issued.  The package
removal can be forced by using the @option{-nodeps} option.

Depending on whether Octave is being run with administrative privileges
only global or local packages are removed by default.  See @option{-global}
or @option{-local} to override that default behavior.

@item load
Add named packages to the path.  After loading a package it is possible to
use the functions provided by the package.  For example,

@example
pkg load image
@end example

@noindent
adds the @code{image} package to the path.

Note: When loading a package, @code{pkg} automatically tries to load any
unloaded dependencies as well, unless the @option{-nodeps} flag has been
specified.  For example,

@example
pkg load signal
@end example

@noindent
adds the @code{signal} package and also tries to load its dependency: the
@code{control} package.  Be aware that use of the @option{-nodeps} option
can adversely affect package functionality.

@item unload
Remove named packages from the path.  After unloading a package it is no
longer possible to use the functions provided by the package.  Trying to
unload a package that other loaded packages still depend on causes an error;
no packages are unloaded in this case.  A package can be forcibly unloaded
with the @option{-nodeps} flag, at the risk of breaking dependent packages
that are still loaded.

@item list
Show the list of currently installed packages.  For example,

@example
pkg list
@end example

@noindent
will produce a short report with the package name, version, and installation
directory for each installed package.  Supply a package name to limit
reporting to a particular package.  For example:

@example
pkg list image
@end example

If a single return argument is requested then @code{pkg} returns a cell
array where each element is a structure with information on a single
package.

@example
installed_packages = pkg ("list")
@end example

If two output arguments are requested @code{pkg} splits the list of
installed packages into those which were installed by the current user
(local packages), and those which were installed by the system administrator
(global packages).

@example
[user_packages, system_packages] = pkg ("list")
@end example

The option @option{-forge} lists all packages available on the Octave
Packages index that can be installed with the @code{pkg} command.  This
requires an internet connection and the cURL library.  This also updates the
locally cached file of the Octave Packages index.  Calling

@example
octave_packages = pkg ("list", "-forge")
@end example

@noindent
is identical to calling

@example
octave_packages = pkg ("search", "-refresh", "-all")
@end example

@item describe
Show a short description of installed packages.  With the option
@qcode{"-verbose"} also list functions provided by the package.  For
example,

@example
pkg describe -verbose
@end example

@noindent
describes all installed packages and the functions they provide.

The result can be limited to a set of packages:

@example
@group
## describe control and signal packages
pkg describe control signal
@end group
@end example

If one output is requested a cell of structure containing the
description and list of functions of each package is returned as
output rather than printed on screen:

@example
desc = pkg ("describe", "secs1d", "image")
@end example

@noindent
If any of the requested packages is not installed, @code{pkg} returns an
error, unless a second output is requested:

@example
[desc, flag] = pkg ("describe", "secs1d", "image")
@end example

@noindent
@var{flag} takes one of the values @qcode{"Not installed"},
@qcode{"Loaded"}, or @qcode{"Not loaded"} for each of the named packages.

@item prefix
Set the installation prefix directory.  For example,

@example
pkg prefix ~/my_octave_packages
@end example

@noindent
sets the installation prefix to @file{~/my_octave_packages}.

Packages are installed in this directory.

Giving an output argument returns the current installation prefix.
For example:

@example
pfx = pkg ("prefix")
@end example

The location in which to install the architecture dependent files can be
independently specified with an additional argument.  For example:

@example
pkg prefix ~/my_octave_packages ~/my_arch_dep_pkgs
@end example

@item local_list
Set the file in which to look for information on locally installed
packages.  Locally installed packages are those that are typically available
only to the current user.  For example:

@example
pkg local_list ~/.octave_packages
@end example

Get the current value of local_list with

@example
pkg local_list
@end example

@item global_list
Set the file in which to look for information on globally installed
packages.  Globally installed packages are those that are typically
available to all users.  For example:

@smallexample
pkg global_list /usr/share/octave/site/api-v59/octave_packages
@end smallexample

Get the current value of global_list with

@example
pkg global_list
@end example

@item build
Build a binary form of a package or packages.  The binary file produced
is itself an Octave package that can be installed normally with @code{pkg}.
For example:

@example
pkg build builddir image-1.0.0.tar.gz @dots{}
@end example

@noindent
where @code{builddir} is a directory where the binary packages are built.
The options @option{-verbose} and @option{-nodeps} are respected, while
all other options are ignored.

@item rebuild
Rebuild the package database from the installed global and local packages.
This can be used in cases where the package database has been corrupted.

@item test
Perform the built-in self tests contained in all functions provided by
the named packages.  For example:

@example
pkg test image
@end example

@end table
@seealso{ver, news}
@end deftypefn
