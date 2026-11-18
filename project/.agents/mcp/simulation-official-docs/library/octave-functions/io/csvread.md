# csvread

```octave
function x = csvread (filename, varargin)
```

@deftypefn  {} {@var{x} =} csvread (@var{filename})
@deftypefnx {} {@var{x} =} csvread (@var{filename}, @var{dlm_opt1}, @dots{})
Read the comma-separated-value (CSV) file @var{filename} into the matrix
@var{x}.

Note: only CSV files containing numeric data can be read.

This function is equivalent to

@example
@var{x} = dlmread (@var{filename}, "," , @var{dlm_opt1}, @dots{})
@end example

Any optional arguments are passed directly to @code{dlmread}
(@pxref{XREFdlmread,,@code{dlmread}}).
@seealso{dlmread, textscan, csvwrite, dlmwrite}
@end deftypefn
