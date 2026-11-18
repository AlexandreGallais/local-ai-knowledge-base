# mustBeFinite

```octave
function mustBeFinite (x)
```

@deftypefn {} {} mustBeFinite (@var{x})

Require that input @var{x} is finite.

Raise an error if any element of the input @var{x} is not finite, as
determined by @code{isfinite (x)}.

@seealso{mustBeNonNan, isfinite}
@end deftypefn
