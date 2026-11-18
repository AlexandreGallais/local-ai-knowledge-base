# isbanded

```octave
function tf = isbanded (A, lower, upper)
```

@deftypefn {} {@var{tf} =} isbanded (@var{A}, @var{lower}, @var{upper})
Return true if @var{A} is a numeric matrix with entries confined between
@var{lower} diagonals below the main diagonal and @var{upper} diagonals
above the main diagonal.

@var{lower} and @var{upper} must be non-negative integers.
@seealso{isdiag, istril, istriu, bandwidth}
@end deftypefn
