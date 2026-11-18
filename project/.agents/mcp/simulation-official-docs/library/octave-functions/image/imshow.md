# imshow

```octave
function h = imshow (im, varargin)
```

@deftypefn  {} {} imshow (@var{im})
@deftypefnx {} {} imshow (@var{im}, @var{limits})
@deftypefnx {} {} imshow (@var{im}, @var{map})
@deftypefnx {} {} imshow (@var{rgb}, @dots{})
@deftypefnx {} {} imshow (@var{filename})
@deftypefnx {} {} imshow (@dots{}, @var{string_param1}, @var{value1}, @dots{})
@deftypefnx {} {@var{h} =} imshow (@dots{})
Display the image @var{im}, where @var{im} can be a 2-dimensional
(grayscale image) or a 3-dimensional (RGB image) matrix.

If @var{limits} is a 2-element vector @code{[@var{low}, @var{high}]}, the
image is shown using a display range between @var{low} and @var{high}.  If
an empty matrix is passed for @var{limits}, the display range is computed
as the range between the minimal and the maximal value in the image.

If @var{map} is a valid colormap, the image will be shown as an indexed
image using the supplied colormap.

If a filename is given instead of an image, the file will be read and shown.

If given, the parameter @var{string_param1} has value @var{value1}.
@var{string_param1} can be any of the following:

@table @asis
@item @qcode{"displayrange"}
@var{value1} is the display range as described above.

@item @qcode{"colormap"}
@var{value1} is the colormap to use when displaying an indexed image.

@item @qcode{"xdata"}
If @var{value1} is a 2-element vector, it must contain horizontal image
limits in the form [xfirst, xlast], where xfirst and xlast are the
abscissa of the centers of the corner pixels.  Otherwise @var{value1}
 must be a vector and only the first and last elements will be used
for xfirst and xlast respectively.

@item @qcode{"ydata"}
If @var{value1} is a 2-element vector, it must contain vertical image
limits in the form [yfirst, ylast], where yfirst and ylast are the ordinates
of the center of the corner pixels.  Otherwise @var{value1} must be a vector
and only the first and last elements will be used for yfirst and ylast
respectively.

@end table

The optional return value @var{h} is a graphics handle to the image.
@seealso{image, imagesc, colormap, gray2ind, rgb2ind}
@end deftypefn
