# colormap

```octave
function cmap = colormap (varargin)
```

@deftypefn  {} {@var{cmap} =} colormap ()
@deftypefnx {} {@var{cmap} =} colormap (@var{map})
@deftypefnx {} {@var{cmap} =} colormap (@qcode{"default"})
@deftypefnx {} {@var{cmap} =} colormap (@var{map_name})
@deftypefnx {} {@var{cmap} =} colormap (@var{hax}, @dots{})
@deftypefnx {} {@var{cmap} =} colormap (@var{hfig}, @dots{})
@deftypefnx {} {} colormap @var{map_name}
Query or set the current colormap.

With no input arguments, @code{colormap} returns the current colormap.  If
there is no current figure, a new figure will be opened and the default
colormap will be returned.

@code{colormap (@var{map})} sets the current colormap to @var{map}.  The
colormap should be an @var{n} row by 3 column matrix.  The columns
contain red, green, and blue intensities respectively.  All entries
must be between 0 and 1 inclusive.  The new colormap is returned.

@code{colormap (@qcode{"default"})} restores the default colormap (the
@code{viridis} map with 256 entries).  The default colormap is returned.

The map may also be specified by a string, @var{map_name}, which
is the name of a function that returns a colormap.

If the first argument @var{hax} is an axes handle, then the colormap for
the specified axes is queried or set.  If the first argument @var{hfig} is a
figure handle, then the colormap for the specified figure is queried or set.

For convenience, it is also possible to use this function with the
command form, @code{colormap @var{map_name}}.

The list of built-in colormaps is:

@c FIXME: It would be nice to display the actual colormap as an image
@c        in the PDF version of the documentation.
@multitable @columnfractions 0.15 .85
@headitem Map @tab Description
@item viridis @tab default
@item turbo @tab colormap traversing blue, cyan, green, yellow, red; modern replacement for jet.
@item jet @tab colormap traversing blue, cyan, green, yellow, red.
@item cubehelix @tab colormap traversing black, blue, green, red, white with increasing intensity.
@item hsv @tab cyclic colormap traversing Hue, Saturation, Value space.
@item rainbow @tab colormap traversing red, yellow, blue, green, violet.
@item ------------- @tab ---------------------------------------------------------------------------------------------
@item hot @tab colormap traversing black, red, orange, yellow, white.
@item cool @tab colormap traversing cyan, purple, magenta.
@item spring @tab colormap traversing magenta to yellow.
@item summer @tab colormap traversing green to yellow.
@item autumn @tab colormap traversing red, orange, yellow.
@item winter @tab colormap traversing blue to green.
@item ------------- @tab ---------------------------------------------------------------------------------------------
@item gray @tab colormap traversing black to white in shades of gray.
@item bone @tab colormap traversing black, gray-blue, white.
@item copper @tab colormap traversing black to light copper.
@item pink @tab colormap traversing black, gray-pink, white.
@item ocean @tab colormap traversing black, dark-blue, white.
@item ------------- @tab ---------------------------------------------------------------------------------------------
@item colorcube @tab equally spaced colors in RGB color space.
@item flag @tab cyclic 4-color map of red, white, blue, black.
@item lines @tab cyclic colormap with colors from axes @qcode{"ColorOrder"} property.
@item prism @tab cyclic 6-color map of red, orange, yellow, green, blue, violet.
@item ------------- @tab ---------------------------------------------------------------------------------------------
@item white @tab all white colormap (no colors).
@end multitable
@seealso{viridis, turbo, jet, cubehelix, hsv, rainbow, hot, cool, spring,
summer, autumn, winter, gray, bone, copper, pink, ocean, colorcube, flag,
lines, prism, white}
@end deftypefn
