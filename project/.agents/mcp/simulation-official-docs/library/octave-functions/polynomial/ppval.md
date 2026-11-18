# ppval

```octave
function yi = ppval (pp, xi)
```

@deftypefn {} {@var{yi} =} ppval (@var{pp}, @var{xi})
Evaluate the piecewise polynomial structure @var{pp} at the points @var{xi}.

If @var{pp} describes a scalar polynomial function, the result is an array
of the same shape as @var{xi}.  Otherwise, the size of the result is
@code{[pp.dim, length(@var{xi})]} if @var{xi} is a vector, or
@code{[pp.dim, size(@var{xi})]} if it is a multi-dimensional array.
@seealso{mkpp, unmkpp, spline, pchip}
@end deftypefn
