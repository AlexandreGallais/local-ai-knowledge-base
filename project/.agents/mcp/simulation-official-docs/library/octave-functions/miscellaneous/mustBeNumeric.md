# mustBeNumeric

```octave
function mustBeNumeric (x)
```

@deftypefn {} {} mustBeNumeric (@var{x})

Require that input @var{x} is numeric.

Raise an error if the input @var{x} is not numeric, as determined by
@code{isnumeric (@var{x})}.

@seealso{mustBeNumericOrLogical, isnumeric}
@end deftypefn
