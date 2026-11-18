# ver

```octave
function v = ver (package = "")
```

@deftypefn  {} {} ver
@deftypefnx {} {} ver Octave
@deftypefnx {} {} ver @var{package}
@deftypefnx {} {v =} ver (@dots{})

Display a header containing the current Octave version number, license
string, and operating system.  The header is followed by a list of installed
packages, versions, and installation directories.

Use the package name @var{package} or Octave to query a specific component.

When called with an output argument, return a vector of structures
describing Octave and each installed package.  Each structure includes the
following fields.

@table @code
@item Name
Package name.

@item Version
Version of the package.

@item Release
Release of the package (currently unused, defaults to @code{[]}).

@item Date
Date that the version was released.
@end table

@seealso{version, usejava, pkg}
@end deftypefn
