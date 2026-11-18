# license

```octave
function [status, errmsg] = license (cmd, feature, toggle)
```

@deftypefn  {} {} license
@deftypefnx {} {} license inuse
@deftypefnx {} {} license inuse @var{feature}
@deftypefnx {} {} license ("inuse")
@deftypefnx {} {@var{license_struct} =} license ("inuse")
@deftypefnx {} {@var{license_struct} =} license ("inuse", @var{feature})
@deftypefnx {} {@var{status} =} license ("test", @var{feature})
@deftypefnx {} {@var{status} =} license ("checkout", @var{feature})
@deftypefnx {} {[@var{status}, @var{errmsg}] =} license ("checkout", @var{feature})
Get license information for Octave and Octave packages.

GNU Octave is free software distributed under the GNU General Public
License (GPL), and a license manager makes no sense.  This function is
provided only for @sc{matlab} compatibility.

When called with no extra input arguments, it returns the Octave license,
otherwise the first input defines the operation mode and must be one of
the following strings: @code{inuse}, @code{test}, and @code{checkout}.
The optional @var{feature} argument can either be @qcode{"octave"} (core)
or the name of an Octave package.

@table @asis
@item @qcode{"inuse"}
Print a list of loaded features, i.e., "octave" and the list of loaded
packages.  If an output is requested, it returns a struct array with
the fields @qcode{"feature"}, and @qcode{"user"}.

@item @qcode{"test"}
Return true if the specified @var{feature} is installed, false otherwise.

An optional third argument @qcode{"enable"} or @qcode{"disable"} is
accepted but ignored.

@item @qcode{"checkout"}
Return true if the specified @var{feature} is installed, false otherwise.
An optional second output will have an error message if a package is not
installed.

@end table

@seealso{pkg, ver, version}
@end deftypefn
