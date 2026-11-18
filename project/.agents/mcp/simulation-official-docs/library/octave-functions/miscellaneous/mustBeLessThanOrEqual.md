# mustBeLessThanOrEqual

```octave
function mustBeLessThanOrEqual (x, c)
```

@deftypefn {} {} mustBeLessThanOrEqual (@var{x}, @var{c})

Require that input is less than or equal to a given value.

Raise an error if any element of the input @var{x} is not less than
or equal to @var{c}, as determined by @code{@var{x} <= @var{c}}.

@seealso{mustBeLessThan, mustBeGreaterThanOrEqual, le}
@end deftypefn
