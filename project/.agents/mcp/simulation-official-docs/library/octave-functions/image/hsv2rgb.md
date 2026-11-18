# hsv2rgb

```octave
function rgb = hsv2rgb (hsv)
```

@deftypefn  {} {@var{rgb_map} =} hsv2rgb (@var{hsv_map})
@deftypefnx {} {@var{rgb_img} =} hsv2rgb (@var{hsv_img})
Transform a colormap or image from HSV to RGB color space.

A color in HSV space is represented by hue, saturation and value
(brightness) levels in a cylindrical coordinate system.  Hue is the
azimuth and describes the dominant color.  Saturation is the radial
distance and gives the amount of hue mixed into the color.  Value is
the height and is the amount of light in the color.

The input can be both a colormap or RGB image.  In the case of floating
point input, values are expected to be on the [0 1] range.  In the case
of hue (azimuth), since the value corresponds to an angle,
@code{mod (h, 1)} is used.

@example
@group
>> hsv2rgb ([0.5 1 1])
@xresult{} ans = 0 1 1

>> hsv2rgb ([2.5 1 1])
@xresult{} ans = 0 1 1

>> hsv2rgb ([3.5 1 1])
@xresult{} ans = 0 1 1
@end group
@end example

Output class and size will be the same as input.

@seealso{rgb2hsv, ind2rgb}
@end deftypefn
