# rgb2ind

```octave
function [x, map] = rgb2ind (R, G, B)
```

@deftypefn  {} {[@var{x}, @var{map}] =} rgb2ind (@var{rgb})
@deftypefnx {} {[@var{x}, @var{map}] =} rgb2ind (@var{R}, @var{G}, @var{B})
Convert an image in red-green-blue (RGB) color space to an indexed image.

The input image @var{rgb} can be specified as a single matrix of size
@nospell{MxNx3}, or as three separate variables, @var{R}, @var{G}, and
@var{B}, its three color channels, red, green, and blue.

It outputs an indexed image @var{x} and a colormap @var{map} to interpret
an image exactly the same as the input.  No dithering or other form of color
quantization is performed.  The output class of the indexed image @var{x}
can be uint8, uint16 or double, whichever is required to specify the
number of unique colors in the image (which will be equal to the number
of rows in @var{map}) in order.

Multi-dimensional indexed images (of size @nospell{MxNx3xK}) are also
supported, both via a single input (@var{rgb}) or its three color channels
as separate variables.

@seealso{ind2rgb, rgb2hsv, rgb2gray}
@end deftypefn
