# cmunique

```octave
function [Y, newmap] = cmunique (X, map)
```

@deftypefn  {} {[@var{Y}, @var{newmap}] =} cmunique (@var{X}, @var{map})
@deftypefnx {} {[@var{Y}, @var{newmap}] =} cmunique (@var{RGB})
@deftypefnx {} {[@var{Y}, @var{newmap}] =} cmunique (@var{I})
Convert an input image @var{X} to an output indexed image @var{Y} which uses
the smallest colormap possible @var{newmap}.

When the input is an indexed image (@var{X} with colormap @var{map}) the
output is a colormap @var{newmap} from which any repeated rows have been
eliminated.  The output image, @var{Y}, is the original input image with
the indices adjusted to match the new, possibly smaller, colormap.

When the input is an RGB image (an @nospell{MxNx3} array), the output
colormap will contain one entry for every unique color in the original
image.  In the worst case the new map could have as many rows as the
number of pixels in the original image.

When the input is a grayscale image @var{I}, the output colormap will
contain one entry for every unique intensity value in the original image.
In the worst case the new map could have as many rows as the number of
pixels in the original image.

Implementation Details:

@var{newmap} is always an Mx3 matrix, even if the input image is
an intensity grayscale image @var{I} (all three RGB planes are
assigned the same value).

The output image is of class uint8 if the size of the new colormap is
less than or equal to 256.  Otherwise, the output image is of class double.

@seealso{rgb2ind, gray2ind}
@end deftypefn
