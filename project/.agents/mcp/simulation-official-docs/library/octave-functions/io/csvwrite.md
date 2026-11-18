# csvwrite

```octave
function csvwrite (filename, x, varargin)
```

@deftypefn  {} {} csvwrite (@var{filename}, @var{x})
@deftypefnx {} {} csvwrite (@var{filename}, @var{x}, @var{dlm_opt1}, @dots{})
Write the numeric matrix @var{x} to the file @var{filename} in
@w{comma-separated-value}@ (CSV) format.

This function is equivalent to

@example
dlmwrite (@var{filename}, @var{x}, ",", @var{dlm_opt1}, @dots{})
@end example

Any optional arguments are passed directly to @code{dlmwrite}
(@pxref{XREFdlmwrite,,@code{dlmwrite}}).
@seealso{csvread, dlmwrite, dlmread}
@end deftypefn
