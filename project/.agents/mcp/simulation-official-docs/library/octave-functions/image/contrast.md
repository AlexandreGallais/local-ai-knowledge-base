# contrast

```octave
function cmap = contrast (x, n)
```

@deftypefn  {} {@var{cmap} =} contrast (@var{x})
@deftypefnx {} {@var{cmap} =} contrast (@var{x}, @var{n})
Return a gray colormap that maximizes the contrast in an image.

The returned colormap will have @var{n} rows.  If @var{n} is not defined
then the size of the current colormap is used.
@seealso{colormap, brighten}
@end deftypefn
