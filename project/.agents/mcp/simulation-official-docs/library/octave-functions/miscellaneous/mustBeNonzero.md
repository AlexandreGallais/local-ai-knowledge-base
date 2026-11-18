# mustBeNonzero

```octave
function mustBeNonzero (x)
```

@deftypefn {} {} mustBeNonzero (@var{x})

Require that input @var{x} is not zero.

Raise an error if any element of the input @var{x} is zero, as determined
by @code{@var{x} == 0}.

@seealso{mustBeNonnegative, mustBePositive}
@end deftypefn
