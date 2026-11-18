# ind2rgb

```octave
function [R, G, B] = ind2rgb (x, map)
```

@deftypefn  {} {@var{rgb} =} ind2rgb (@var{x}, @var{map})
@deftypefnx {} {[@var{R}, @var{G}, @var{B}] =} ind2rgb (@var{x}, @var{map})
Convert an indexed image to red, green, and blue color components.

The image @var{x} must be an indexed image which will be converted using the
colormap @var{map}.  Pixels in @var{x} that are outside the colormap are
@strong{clipped} to the range of @var{map}.

Multi-dimensional indexed images (of size @nospell{MxNx1xK}) are also
supported.

The output may be a single RGB image (@nospell{MxNx3} matrix where M and N
are the original image @var{x} dimensions, one for each of the red, green
and blue channels).  Alternatively, the individual red, green, and blue
color matrices of size @nospell{MxN} may be returned.

Programming Note: Index values in @var{x} outside of the number of colors
in @var{map} are clipped to the range of @var{map}.  For example, negative
indices are clipped to the first color while large values, including
exceptional values such as @code{NaN} and @code{Inf}, are clipped to the
last color.
@seealso{rgb2ind, ind2gray, hsv2rgb}
@end deftypefn
