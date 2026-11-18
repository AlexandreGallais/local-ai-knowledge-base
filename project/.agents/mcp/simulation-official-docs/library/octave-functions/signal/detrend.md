# detrend

```octave
function y = detrend (x, p = 1)
```

@deftypefn {} {@var{y} =} detrend (@var{x}, @var{p})
If @var{x} is a vector, @code{detrend (@var{x}, @var{p})} removes the
best fit of a polynomial of order @var{p} from the data @var{x}.

If @var{x} is a matrix, @code{detrend (@var{x}, @var{p})} does the same
for each column in @var{x}.

The second argument @var{p} is optional.  If it is not specified, a value of
1 is assumed.  This corresponds to removing a linear trend.

The order of the polynomial can also be given as a string, in which case
@var{p} must be either @qcode{"constant"} (corresponds to @code{@var{p}=0})
or @qcode{"linear"} (corresponds to @code{@var{p}=1}).
@seealso{polyfit}
@end deftypefn
