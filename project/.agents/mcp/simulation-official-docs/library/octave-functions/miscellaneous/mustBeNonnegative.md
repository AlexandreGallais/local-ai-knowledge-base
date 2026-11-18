# mustBeNonnegative

```octave
function mustBeNonnegative (x)
```

@deftypefn {} {} mustBeNonnegative (@var{x})

Require that input @var{x} is not negative.

Raise an error if any element of the input @var{x} is negative, as
determined by @code{@var{x} >= 0}.

@seealso{mustBeNonzero, mustBePositive}
@end deftypefn
