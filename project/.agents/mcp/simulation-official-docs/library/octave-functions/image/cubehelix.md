# cubehelix

```octave
function map = cubehelix (n, start = 0.5, rots = -1.5, hue = 1, gamma = 1)
```

@deftypefn  {} {@var{map} =} cubehelix ()
@deftypefnx {} {@var{map} =} cubehelix (@var{n})
@deftypefnx {} {@var{map} =} cubehelix (@var{n}, @var{start}, @var{rots}, @var{hue}, @var{gamma})
Create cubehelix colormap.

This colormap varies from black to white going though blue, green, and red
tones while maintaining a monotonically increasing perception of intensity.
This is achieved by traversing a color cube from black to white through
a helix, hence the name cubehelix, while taking into account the perceived
brightness of each channel according to the NTSC specifications from 1953.

@example
rgbplot (cubehelix (256))
@end example

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.

Reference: @nospell{D.A Green},
"A @nospell{colour} scheme for the display of astronomical intensity
images", @cite{Bulletin of the Astronomical Society of India}, 39,
@w{p.@: 289}, 2011.

@seealso{colormap}
@end deftypefn
