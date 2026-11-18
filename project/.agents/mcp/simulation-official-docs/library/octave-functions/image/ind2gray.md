# ind2gray

```octave
function I = ind2gray (x, map)
```

@deftypefn {} {@var{I} =} ind2gray (@var{x}, @var{map})
Convert a color indexed image to a grayscale intensity image.

The image @var{x} must be an indexed image which will be converted using the
colormap @var{map}.  Pixels in @var{x} that are outside the colormap are
@strong{clipped} to the range of @var{map}.

The output @var{I} is of the same class as the input @var{x} and may be
one of @code{uint8}, @code{uint16}, @code{single}, or @code{double}.

Programming Notes: There are several ways of converting colors to
grayscale intensities.  This functions uses the luminance value obtained
from @code{rgb2gray} which is @code{I = 0.299*R + 0.587*G + 0.114*B}.
Other possibilities include the value component from @code{rgb2hsv} or
using a single color channel from @code{ind2rgb}.

Index values in @var{x} outside of the number of colors in @var{map} are
clipped to the range of @var{map}.  For example, negative indices are
clipped to the first color while large values, including exceptional values
such as @code{NaN} and @code{Inf}, are clipped to the last color.

@seealso{gray2ind, ind2rgb}
@end deftypefn
