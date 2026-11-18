# rgb2gray

```octave
function I = rgb2gray (rgb)
```

@deftypefn  {} {@var{I} =} rgb2gray (@var{rgb_img})
@deftypefnx {} {@var{gray_map} =} rgb2gray (@var{rgb_map})
Transform an image or colormap from red-green-blue (RGB) color space to
a grayscale intensity image.

The input may be of class uint8, int8, uint16, int16, single, or double.
The output is of the same class as the input.

Implementation Note:
The grayscale intensity is calculated as

@example
@group
@var{I} = 0.298936*@var{R} + 0.587043*@var{G} + 0.114021*@var{B}
@end group
@end example

@noindent
which corresponds to the luminance channel when RGB is translated to
@nospell{YIQ} as documented in @url{https://en.wikipedia.org/wiki/YIQ}.
@seealso{rgb2hsv, rgb2ind}
@end deftypefn
