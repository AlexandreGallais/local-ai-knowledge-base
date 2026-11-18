# mustBeGreaterThan

```octave
function mustBeGreaterThan (x, c)
```

@deftypefn {} {} mustBeGreaterThan (@var{x}, @var{c})

Require that input @var{x} is greater than @var{c}.

Raise an error if any element of the input @var{x} is not greater than
@var{c}, as determined by @code{@var{x} > @var{c}}.

@seealso{mustBeGreaterThanOrEqual, mustBeLessThan, gt}
@end deftypefn
