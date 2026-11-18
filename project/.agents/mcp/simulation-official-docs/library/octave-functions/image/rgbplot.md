# rgbplot

```octave
function h = rgbplot (cmap, style = "profile")
```

@deftypefn  {} {} rgbplot (@var{cmap})
@deftypefnx {} {} rgbplot (@var{cmap}, @var{style})
@deftypefnx {} {@var{h} =} rgbplot (@dots{})
Plot the components of a colormap.

Two different @var{style}s are available for displaying the @var{cmap}:

@table @asis
@item profile (default)
Plot the RGB line profile of the colormap for each of the channels (red,
green and blue) with the plot lines colored appropriately.  Each line
represents the intensity of an RGB component across the colormap.

@item composite
Draw the colormap across the X-axis so that the actual index colors are
visible rather than the individual color components.

@end table

The optional return value @var{h} is a graphics handle to the created plot.

Run @code{demo rgbplot} to see an example of @code{rgbplot} and each style
option.
@seealso{colormap}
@end deftypefn
