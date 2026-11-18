# mustBeNegative

```octave
function mustBeNegative (x)
```

@deftypefn {} {} mustBeNegative (@var{x})

Require that input @var{x} is negative.

Raise an error if any element of the input @var{x} is not negative, as
determined by @code{@var{x} < 0}.

@seealso{mustBeNonnegative}
@end deftypefn
