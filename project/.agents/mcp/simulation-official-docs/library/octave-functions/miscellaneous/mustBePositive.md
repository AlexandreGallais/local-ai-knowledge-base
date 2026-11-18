# mustBePositive

```octave
function mustBePositive (x)
```

@deftypefn {} {} mustBePositive (@var{x})

Require that input @var{x} is positive.

Raise an error if any element of the input @var{x} is not positive, as
determined by @code{@var{x} > 0}.

@seealso{mustBeNonnegative, mustBeNonzero}
@end deftypefn
