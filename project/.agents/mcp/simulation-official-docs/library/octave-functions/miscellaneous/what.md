# what

```octave
function w = what (dir)
```

@deftypefn  {} {} what
@deftypefnx {} {} what @var{dir}
@deftypefnx {} {w =} what (@var{dir})
List the Octave specific files in directory @var{dir}.

If @var{dir} is not specified then the current directory is used.

If a return argument is requested, the files found are returned in the
structure @var{w}.  The structure contains the following fields:

@table @asis
@item path
Full path to directory @var{dir}

@item m
Cell array of m-files

@item mat
Cell array of mat files

@item mex
Cell array of mex files

@item oct
Cell array of oct files

@item mdl
Cell array of mdl files

@item slx
Cell array of slx files

@item p
Cell array of p-files

@item classes
Cell array of class directories (@file{@@@var{classname}/})

@item packages
Cell array of package directories (@file{+@var{pkgname}/})
@end table

Compatibility Note: Octave does not support mdl, slx, and p files.
@code{what} will always return an empty list for these categories.
@seealso{which, ls, exist}
@end deftypefn
