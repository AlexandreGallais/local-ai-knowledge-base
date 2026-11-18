# nargchk

```octave
function msg = nargchk (minargs, maxargs, nargs, outtype = "string")
```

@deftypefn  {} {@var{msgstr} =} nargchk (@var{minargs}, @var{maxargs}, @var{nargs})
@deftypefnx {} {@var{msgstr} =} nargchk (@var{minargs}, @var{maxargs}, @var{nargs}, "string")
@deftypefnx {} {@var{msgstruct} =} nargchk (@var{minargs}, @var{maxargs}, @var{nargs}, "struct")
Return an appropriate error message string (or structure) if the number of
inputs requested is invalid.

This is useful for checking to see that the number of input arguments
supplied to a function is within an acceptable range.

@strong{Caution}: @code{nargchk} is scheduled for deprecation.  Use
@code{narginchk} in all new code.
@seealso{narginchk, nargoutchk, error, nargin, nargout}
@end deftypefn
