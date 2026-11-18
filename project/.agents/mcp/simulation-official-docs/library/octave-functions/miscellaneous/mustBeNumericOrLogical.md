# mustBeNumericOrLogical

```octave
function mustBeNumericOrLogical (x)
```

@deftypefn {} {} mustBeNumericOrLogical (@var{x})

Require that input @var{x} is numeric or logical.

Raise an error if the input @var{x} is not numeric or logical, as
determined by @code{isnumeric (@var{x}) || islogical (@var{x})}.

@seealso{mustBeNumeric, isnumeric, islogical}
@end deftypefn
