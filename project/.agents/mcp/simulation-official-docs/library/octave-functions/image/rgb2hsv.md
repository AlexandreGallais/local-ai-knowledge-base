# rgb2hsv

```octave
function hsv = rgb2hsv (rgb)
```

@deftypefn  {} {@var{hsv_map} =} rgb2hsv (@var{rgb_map})
@deftypefnx {} {@var{hsv_img} =} rgb2hsv (@var{rgb_img})
Transform a colormap or image from RGB to HSV color space.

A color in the RGB space consists of red, green, and blue intensities.

A color in HSV space is represented by hue, saturation and value
(brightness) levels in a cylindrical coordinate system.  Hue is the
azimuth and describes the dominant color.  Saturation is the radial
distance and gives the amount of hue mixed into the color.  Value is
the height and is the amount of light in the color.

Output class and size will be the same as input.

@seealso{hsv2rgb, rgb2ind, rgb2gray}
@end deftypefn
