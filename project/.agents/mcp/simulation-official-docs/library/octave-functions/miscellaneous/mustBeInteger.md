# mustBeInteger

```octave
function mustBeInteger (x)
```

@deftypefn {} {} mustBeInteger (@var{x})

Require that input @var{x} is integer-valued (but not necessarily
integer-typed).

Raise an error if any element of the input @var{x} is not a finite,
real, integer-valued numeric value, as determined by various checks.

@seealso{mustBeNumeric}
@end deftypefn
