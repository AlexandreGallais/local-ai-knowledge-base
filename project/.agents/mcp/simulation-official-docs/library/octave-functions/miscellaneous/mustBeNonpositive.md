# mustBeNonpositive

```octave
function mustBeNonpositive (x)
```

@deftypefn {} {} mustBeNonpositive (@var{x})

Require that input @var{x} is not positive.

Raise an error if any element of the input @var{x} is positive, as
determined by @code{@var{x} <= 0}.

@seealso{mustBeNegative, mustBeNonzero}
@end deftypefn
