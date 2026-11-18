# mex

```octave
function status = mex (varargin)
```

@deftypefn  {} {} mex [-options] file @dots{}
@deftypefnx {} {@code{status} =} mex (@dots{})
Compile source code written in C, C++, or Fortran, to a MEX file.

@var{status} is the return status of the @code{mkoctfile} function.

If the compilation fails, and the output argument is not requested,
an error is raised.  If the programmer requests @var{status}, however,
Octave will merely issue a warning and it is the programmer's responsibility
to verify the command was successful.

This is equivalent to @code{mkoctfile --mex [-options] file}.

@seealso{mkoctfile, mexext}
@end deftypefn
