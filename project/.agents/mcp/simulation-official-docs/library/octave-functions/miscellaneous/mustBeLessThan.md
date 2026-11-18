# mustBeLessThan

```octave
function mustBeLessThan (x, c)
```

@deftypefn {} {} mustBeLessThan (@var{x}, @var{c})

Require that input @var{x} is less than @var{c}.

Raise an error if any element of the input @var{x} is not less than
@var{c}, as determined by @code{@var{x} < @var{c}}.

@seealso{mustBeLessThanOrEqual, mustBeGreaterThan, lt}
@end deftypefn
