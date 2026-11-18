# mustBeNonNan

```octave
function mustBeNonNan (x)
```

@deftypefn {} {} mustBeNonNan (@var{x})

Require that input @var{x} is non-@code{NaN}.

Raise an error if any element of the input @var{x} is @code{NaN}, as
determined by @code{isnan (@var{x})}.

@seealso{mustBeFinite, mustBeNonempty, isnan}
@end deftypefn
