# isequaln

```octave
function tf = isequaln (x, varargin)
```

@deftypefn {} {@var{tf} =} isequaln (@var{x1}, @var{x2}, @dots{})
Return true if all of @var{x1}, @var{x2}, @dots{} are equal under the
additional assumption that NaN == NaN (no comparison of NaN placeholders
in dataset).
@seealso{isequal}
@end deftypefn
