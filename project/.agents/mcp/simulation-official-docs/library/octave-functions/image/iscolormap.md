# iscolormap

```octave
function tf = iscolormap (cmap)
```

@deftypefn {} {@var{tf} =} iscolormap (@var{cmap})
Return true if @var{cmap} is a colormap.

A colormap is a real matrix, of class single or double, with 3 columns.
Each row represents a single color.  The 3 columns contain red, green,
and blue intensities respectively.

All values in a colormap should be in the range [0, 1], but this is not
enforced.  Each function must decide what to do for values outside this
range.

@seealso{colormap, rgbplot}
@end deftypefn
