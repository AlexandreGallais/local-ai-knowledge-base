# tand

```octave
function y = tand (x)
```

@deftypefn {} {@var{y} =} tand (@var{x})
Compute the tangent for each element of @var{x} in degrees.

Returns zero for elements where @code{@var{x}/180} is an integer and
@code{Inf} for elements where @code{(@var{x}-90)/180} is an integer.
@seealso{atand, tan}
@end deftypefn
