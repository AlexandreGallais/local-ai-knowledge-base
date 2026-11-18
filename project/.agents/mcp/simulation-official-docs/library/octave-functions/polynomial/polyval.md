# polyval

```octave
function [y, dy] = polyval (p, x, s = [], mu)
```

@deftypefn  {} {@var{y} =} polyval (@var{p}, @var{x})
@deftypefnx {} {@var{y} =} polyval (@var{p}, @var{x}, [], @var{mu})
@deftypefnx {} {[@var{y}, @var{dy}] =} polyval (@var{p}, @var{x}, @var{s})
@deftypefnx {} {[@var{y}, @var{dy}] =} polyval (@var{p}, @var{x}, @var{s}, @var{mu})

Evaluate the polynomial @var{p} at the specified values of @var{x}.

If @var{x} is a vector or matrix, the polynomial is evaluated for each of
the elements of @var{x}.

When @var{mu} is present, evaluate the polynomial for
@w{(@var{x} - @var{mu}(1)) / @var{mu}(2)}.

In addition to evaluating the polynomial, the second output represents the
prediction interval, @var{y} +/- @var{dy}, which contains at least 50% of
the future predictions.  To calculate the prediction interval, the
structured variable @var{s}, originating from @code{polyfit}, must be
supplied.

@seealso{polyvalm, polyaffine, polyfit, roots, poly}
@end deftypefn
