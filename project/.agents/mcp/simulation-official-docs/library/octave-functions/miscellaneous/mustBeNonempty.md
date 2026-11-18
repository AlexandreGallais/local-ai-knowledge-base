# mustBeNonempty

```octave
function mustBeNonempty (x)
```

@deftypefn {} {} mustBeNonempty (@var{x})

Require that input @var{x} is nonempty.

Raise an error if the input @var{x} is empty, as determined by
@code{isempty (@var{x})}.

@seealso{mustBeMember, mustBeNonzero, isempty}
@end deftypefn
