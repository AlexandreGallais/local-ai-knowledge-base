# dither

```octave
function X = dither (RGB, map, Qm = 5, Qe = 8)
```

@deftypefn  {} {@var{X} =} dither (@var{RGB}, @var{map})
@deftypefnx {} {@var{X} =} dither (@var{RGB}, @var{map}, @var{Qm}, @var{Qe})
@deftypefnx {} {@var{BW} =} dither (@var{I})
Quantize an image using dithering to increase the apparent color resolution.

@code{@var{X} = dither (@var{RGB},@var{map})} creates an indexed image
approximation.  It uses the color provided in the colormap, and uses
dithering to increase apparent color resolution.  The
@nospell{Floyd-Steinberg} error
filter is:
@tex
$$
\left[\matrix{   & x & 7\cr
               3 & 5 & 1}\right]/16
$$
@end tex
@ifnottex

@example
@group
     x    7/16
3/16 5/16 1/16
@end group
@end example

@end ifnottex
It uses a raster scan and no weight renormalization at boundaries.
The default values are used: @var{Qm}=5 and @var{Qe}=8.

@var{RGB} is a MxNx3 array with values in @code{[0, 1]} (double) or
@code{[0, 255]} (uint8).

@var{map} is Cx3 matrix holding RGB triplets in @code{[0, 1]} (double).

@var{Qm} is the number of quantization bits per axis for inverse colormap
(default: 5).

@var{Qe} is the number of quantization bits for error diffusion (default: 8,
max 16).

@var{X} is a MxN indexed image (uint8 if c@leq{}256, else uint16) for the
colormap @var{map} provided.

@var{Qm} is the number of quantization bits along each color axis for the
inverse colormap.  @var{Qm} determines the resolution of this grid along
each color axis (R, G, B).  @var{Qm} defines the precision of the color
space discretization used to map input RGB values to those colors
available in the colormap.  @var{Qe} is the number of quantization bits
for the color space error calculations in the @nospell{Floyd-Steinberg}
error diffusion algorithm.  It controls the precision of the error values
that are calculated and propagated during dithering.  If @var{Qe} <
@var{Qm}, the error diffusion process may lose precision.  Therefore
dithering cannot be performed, and the function returns an undithered
indexed image.

@code{@var{BW} = dither (@var{I})} converts the grayscale input image
@var{I} into binary applying dithering in the process.  The output image
@var{BW} is a black and white image where dithering creates the illusion
of shades of gray.

References:

@itemize
@item
@nospell{R. W. Floyd and L. Steinberg}, "An Adaptive Algorithm for Spatial
Gray Scale", @cite{International Symposium Digest of Technical Papers},
Society for Information Displays, @w{p.@: 36}, 1975.

@item
@nospell{R. Ulichney}, @cite{Digital Halftoning}, The MIT Press, 1987.
@end itemize

@seealso{rgb2ind, gray2ind}
@end deftypefn
