# imwrite

```octave
function imwrite (varargin)
```

@deftypefn  {} {} imwrite (@var{img}, @var{filename})
@deftypefnx {} {} imwrite (@var{img}, @var{filename}, @var{ext})
@deftypefnx {} {} imwrite (@var{img}, @var{map}, @var{filename})
@deftypefnx {} {} imwrite (@dots{}, @var{param1}, @var{val1}, @dots{})
Write images in various file formats.

The image @var{img} can be a binary, grayscale, RGB, or multi-dimensional
image.  The size and class of @var{img} should be the same as what should
be expected when reading it with @code{imread}: the 3rd and 4th dimensions
reserved for color space, and multiple pages respectively.  If it's an
indexed image, the colormap @var{map} must also be specified.

If @var{ext} is not supplied, the file extension of @var{filename} is used
to determine the format.  The actual supported formats are dependent on
options made during the build of Octave.  Use @code{imformats} to check
the support of the different image formats.

Depending on the file format, it is possible to configure the writing of
images with @var{param}, @var{val} pairs.  The following options are
supported:

@table @samp
@item Alpha
Alpha (transparency) channel for the image.  This must be a matrix with
same class, and number of rows and columns of @var{img}.  In case of a
multipage image, the size of the 4th dimension must also match and the third
dimension must be a singleton.  By default, image will be completely opaque.

@item Compression
Compression to use one the image.  Can be one of the following: "none"
(default), "bzip", "fax3", "fax4", "jpeg", "lzw", "rle", or "deflate".
Note that not all compression types are available for all image formats
in which it defaults to your @nospell{Magick} library.

@item DelayTime
For formats that accept animations (such as GIF), controls for how long a
frame is displayed until it moves to the next one.  The value must be scalar
(which will applied to all frames in @var{img}), or a vector of length
equal to the number of frames in @var{im}.  The value is in seconds, must
be between 0 and 655.35, and defaults to 0.5.

@item DisposalMethod
For formats that accept animations (such as GIF), controls what happens to
a frame before drawing the next one.  Its value can be one of the
following strings: "doNotSpecify" (default); "leaveInPlace"; "restoreBG";
and "restorePrevious", or a cell array of those string with length equal
to the number of frames in @var{img}.

@item LoopCount
For formats that accept animations (such as GIF), controls how many times
the sequence is repeated.  A value of Inf means an infinite loop (default),
a value of 0 or 1 that the sequence is played only once (loops zero times),
while a value of 2 or above loops that number of times (looping twice means
it plays the complete sequence 3 times).  This option is ignored when there
is only a single image at the end of writing the file.

@item Quality
Set the quality of the compression.  The value should be an integer
between 0 and 100, with larger values indicating higher visual quality and
lower compression.  Defaults to 75.

@item WriteMode
Some file formats, such as TIFF and GIF, are able to store multiple images
in a single file.  This option specifies if @var{img} should be appended
to the file (if it exists) or if a new file should be created for it
(possibly overwriting an existing file).  The value should be the string
@qcode{"Overwrite"} (default), or @qcode{"Append"}.

Despite this option, the most efficient method of writing a multipage
image is to pass a 4 dimensional @var{img} to @code{imwrite}, the same
matrix that could be expected when using @code{imread} with the option
@qcode{"Index"} set to @qcode{"all"}.

@end table

@seealso{imread, imfinfo, imformats}
@end deftypefn
