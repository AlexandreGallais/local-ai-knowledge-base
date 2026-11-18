# bandwidth

```octave
function [lower, upper] = bandwidth (A, type)
```

@deftypefn  {} {@var{bw} =} bandwidth (@var{A}, @var{type})
@deftypefnx {} {[@var{lower}, @var{upper}] =} bandwidth (@var{A})
Compute the bandwidth of @var{A}.

The @var{type} argument is the string @qcode{"lower"} for the lower
bandwidth and @qcode{"upper"} for the upper bandwidth.  If no @var{type} is
specified return both the lower and upper bandwidth of @var{A}.

The lower/upper bandwidth of a matrix is the number of
subdiagonals/superdiagonals with nonzero entries.

@seealso{isbanded, isdiag, istril, istriu}
@end deftypefn
