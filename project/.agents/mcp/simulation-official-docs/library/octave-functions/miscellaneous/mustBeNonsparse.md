# mustBeNonsparse

```octave
function mustBeNonsparse (x)
```

@deftypefn {} {} mustBeNonsparse (@var{x})

Require that input @var{x} is not sparse.

Raise an error if the input @var{x} is sparse, as determined by
@code{issparse (@var{x})}.

@seealso{issparse}
@end deftypefn
