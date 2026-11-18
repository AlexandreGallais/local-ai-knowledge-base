# narginchk

```octave
function narginchk (minargs, maxargs)
```

@deftypefn {} {} narginchk (@var{minargs}, @var{maxargs})
Check for correct number of input arguments.

Generate an error message if the number of arguments in the calling function
is outside the range @var{minargs} and @var{maxargs}.  Otherwise, do
nothing.

Both @var{minargs} and @var{maxargs} must be scalar numeric values.  Zero,
Inf, and negative values are all allowed, and @var{minargs} and
@var{maxargs} may be equal.

Note that this function evaluates @code{nargin} on the caller.

@seealso{nargoutchk, error, nargout, nargin}
@end deftypefn
