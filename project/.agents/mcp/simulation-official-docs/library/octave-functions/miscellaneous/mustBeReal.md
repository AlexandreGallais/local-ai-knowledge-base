# mustBeReal

```octave
function mustBeReal (x)
```

@deftypefn {} {} mustBeReal (@var{x})

Require that input @var{x} is real.

Raise an error if the input @var{x} is not real, as determined by
@code{isreal (@var{x})}.

@seealso{mustBeFinite, mustBeNonNan, isreal}
@end deftypefn
