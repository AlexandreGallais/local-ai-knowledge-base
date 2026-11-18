# imread

```octave
function [img, varargout] = imread (filename, varargin)
```

@deftypefn  {} {[@var{img}, @var{map}, @var{alpha}] =} imread (@var{filename})
@deftypefnx {} {[@dots{}] =} imread (@var{url})
@deftypefnx {} {[@dots{}] =} imread (@dots{}, @var{ext})
@deftypefnx {} {[@dots{}] =} imread (@dots{}, @var{idx})
@deftypefnx {} {[@dots{}] =} imread (@dots{}, @var{param1}, @var{value1}, @dots{})
Read images from various file formats.

Read an image as a matrix from the file @var{filename} or from the online
resource @var{url}.  If neither is given, but @var{ext} was specified, look
for a file with the extension @var{ext}.

The size and class of the output depends on the format of the image.  A
color image is returned as an @nospell{MxNx3} matrix.  Grayscale and
black-and-white images are of size @nospell{MxN}@.  Multipage images will
have an additional 4th dimension.

The bit depth of the image determines the class of the output:
@qcode{"uint8"}, @qcode{"uint16"}, or @qcode{"single"} for grayscale and
color, and @qcode{"logical"} for black-and-white.  Note that indexed images
always return the indexes for a colormap, independent of whether @var{map}
is a requested output.  To obtain the actual RGB image, use @code{ind2rgb}.
When more than one indexed image is being read, @var{map} is obtained from
the first.  In some rare cases this may be incorrect and @code{imfinfo} can
be used to obtain the colormap of each image.

See the Octave manual for more information in representing images.
(@pxref{Representing Images})

Some file formats, such as TIFF and GIF, are able to store multiple images
in a single file.  @var{idx} can be a scalar or vector specifying the
index of the images to read.  By default, Octave will read only the first
page.

Depending on the file format, it is possible to configure the reading of
images with @var{parameter}, @var{value} pairs.  The following options are
supported:

@table @asis
@item @qcode{"Frames"} or @qcode{"Index"}
This is an alternative method to specify @var{idx}.  When specifying it
in this way, its value can also be the string @qcode{"all"}.

@item @qcode{"Info"}
This option exists for @sc{matlab} compatibility, but has no effect.  For
maximum performance when reading multiple images from a single file, use
the @qcode{"Index"} option.

@item @qcode{"PixelRegion"}
Controls the image region that is read.  The value must be a cell array with
two arrays of 3 elements @code{@{[@var{rows}], [@var{cols}]@}}.  The
elements in the array are the start, increment, and end pixel to be read.
If the increment value is omitted it defaults to 1.  For example, the
following are all equivalent:

@format
@group
@code{imread (filename, "PixelRegion", @{[200 600], [300 700]@})}
@code{imread (filename, "PixelRegion", @{[200 1 600], [300 1 700]@})}
@code{imread (filename)(200:600, 300:700)}
@end group
@end format

@end table

@seealso{imwrite, imfinfo, imformats}
@end deftypefn
