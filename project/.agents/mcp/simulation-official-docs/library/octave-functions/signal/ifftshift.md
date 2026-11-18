# ifftshift

```octave
function x = ifftshift (y, dim)
```

@deftypefn  {} {@var{x} =} ifftshift (@var{y})
@deftypefnx {} {@var{x} =} ifftshift (@var{y}, @var{dim})
Undo the action of the @code{fftshift} function.

For even length @var{x}, @code{fftshift} is its own inverse, but odd lengths
differ slightly.
@seealso{fftshift}
@end deftypefn
