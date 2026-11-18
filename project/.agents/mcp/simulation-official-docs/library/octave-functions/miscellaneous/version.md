# version

```octave
function [v, d] = version (feature)
```

@deftypefn  {} {@var{v} =} version ()
@deftypefnx {} {[@var{v}, @var{d}] =} version ()
@deftypefnx {} {@var{v} =} version (@var{feature})
Get version information for Octave.

If called without input argument, the first return value @var{v} gives the
version number of Octave as a string.  The second return value @var{d} holds
the release date as a string.

The following options can be passed for @var{feature}:

@table @asis
@item @qcode{"-date"}
for the release date of the running build,

@item @qcode{"-description"}
for a description of the release (always an empty string),

@item @qcode{"-release"}
for the name of the running build (always an empty string),

@item @qcode{"-java"}
for version information of the Java @nospell{VM},

@item @qcode{"-fftw"}
for version information for the linked @sc{fftw},

@item @qcode{"-blas"}
for version information for the linked @sc{blas},

@item @qcode{"-lapack"}
for version information for the linked @sc{lapack}.

@item @qcode{"-hgid"}
the mercurial ID of the sources used to build Octave.
@end table

The information returned for the @qcode{"-blas"} and @qcode{"-lapack"}
options might be unreliable.  It might report which library was linked in
when Octave was built instead of which library is currently used.

The variant with no input and output argument is an alias for the function
@w{@env{OCTAVE_VERSION}}@ provided for compatibility.
@seealso{OCTAVE_VERSION, ver}
@end deftypefn
