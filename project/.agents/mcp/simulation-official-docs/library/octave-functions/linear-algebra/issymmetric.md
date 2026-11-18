# issymmetric

```octave
function tf = issymmetric (A, skewopt = "nonskew", tol = 0)
```

@deftypefn  {} {@var{tf} =} issymmetric (@var{A})
@deftypefnx {} {@var{tf} =} issymmetric (@var{A}, @var{tol})
@deftypefnx {} {@var{tf} =} issymmetric (@var{A}, @qcode{"skew"})
@deftypefnx {} {@var{tf} =} issymmetric (@var{A}, @qcode{"skew"}, @var{tol})
Return true if @var{A} is a symmetric or skew-symmetric numeric matrix
within the tolerance specified by @var{tol}.

The default tolerance is zero (uses faster code).

The type of symmetry to check may be specified with the additional input
@qcode{"nonskew"} (default) for regular symmetry or @qcode{"skew"} for
skew-symmetry.

Background: A matrix is symmetric if the transpose of the matrix is equal
to the original matrix: @w{@tcode{@var{A} == @var{A}.'}}.  If a tolerance
is given then symmetry is determined by
@code{norm (@var{A} - @var{A}.', Inf) / norm (@var{A}, Inf) < @var{tol}}.

A matrix is skew-symmetric if the transpose of the matrix is equal to the
negative of the original matrix: @w{@tcode{@var{A} == -@var{A}.'}}.  If a
tolerance is given then skew-symmetry is determined by
@code{norm (@var{A} + @var{A}.', Inf) / norm (@var{A}, Inf) < @var{tol}}.
@seealso{ishermitian, isdefinite}
@end deftypefn
