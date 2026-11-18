# shiftdim

```octave
function [y, ns]  = shiftdim (x, n)
```

@deftypefn  {} {@var{y} =} shiftdim (@var{x}, @var{n})
@deftypefnx {} {[@var{y}, @var{ns}] =} shiftdim (@var{x})
Shift the dimensions of @var{x} by @var{n}, where @var{n} must be
an integer scalar.

When @var{n} is positive, the dimensions of @var{x} are shifted to the left,
with the leading dimensions circulated to the end.  If @var{n} is negative,
then the dimensions of @var{x} are shifted to the right, with @var{n}
leading singleton dimensions added.

Called with a single argument, @code{shiftdim}, removes the leading
singleton dimensions, returning the number of dimensions removed in the
second output argument @var{ns}.

For example:

@example
@group
x = ones (1, 2, 3);
size (shiftdim (x, -1))
  @xresult{}   1   1   2   3
size (shiftdim (x, 1))
  @xresult{}   2   3
[b, ns] = shiftdim (x)
  @xresult{} b =
        1   1   1
        1   1   1
  @xresult{} ns = 1
@end group
@end example
@seealso{reshape, permute, ipermute, circshift, squeeze}
@end deftypefn
