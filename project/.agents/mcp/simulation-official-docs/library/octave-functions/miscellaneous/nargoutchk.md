# nargoutchk

```octave
function msg = nargoutchk (minargs, maxargs, nargs, outtype)
```

@deftypefn  {} {} nargoutchk (@var{minargs}, @var{maxargs})
@deftypefnx {} {@var{msgstr} =} nargoutchk (@var{minargs}, @var{maxargs}, @var{nargs})
@deftypefnx {} {@var{msgstr} =} nargoutchk (@var{minargs}, @var{maxargs}, @var{nargs}, "string")
@deftypefnx {} {@var{msgstruct} =} nargoutchk (@var{minargs}, @var{maxargs}, @var{nargs}, "struct")
Check for correct number of output arguments.

In the first form, return an error if the number of arguments is not between
@var{minargs} and @var{maxargs}.  Otherwise, do nothing.  Note that this
function evaluates the value of @code{nargout} on the caller so its value
must have not been tampered with.

Both @var{minargs} and @var{maxargs} must be numeric scalars.  Zero, Inf,
and negative are all valid, and they can have the same value.

For backwards compatibility, the other forms return an appropriate error
message string (or structure) if the number of outputs requested is
invalid.

This is useful for checking to that the number of output arguments supplied
to a function is within an acceptable range.
@seealso{narginchk, error, nargout, nargin}
@end deftypefn
