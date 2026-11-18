# mustBeGreaterThanOrEqual

```octave
function mustBeGreaterThanOrEqual (x, c)
```

@deftypefn {} {} mustBeGreaterThanOrEqual (@var{x}, @var{c})

Require that input @var{x} is greater than or equal to @var{c}.

Raise an error if any element of the input @var{x} is not greater than
or equal to @var{c}, as determined by @code{@var{x} >= @var{c}}.

@seealso{mustBeGreaterThan, mustBeLessThanOrEqual, ge}
@end deftypefn
