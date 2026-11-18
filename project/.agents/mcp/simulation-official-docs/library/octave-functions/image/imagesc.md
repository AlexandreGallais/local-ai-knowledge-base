# imagesc

```octave
function h = imagesc (varargin)
```

@deftypefn  {} {} imagesc (@var{img})
@deftypefnx {} {} imagesc (@var{x}, @var{y}, @var{img})
@deftypefnx {} {} imagesc (@dots{}, @var{climits})
@deftypefnx {} {} imagesc (@dots{}, "@var{prop}", @var{val}, @dots{})
@deftypefnx {} {} imagesc ("@var{prop1}", @var{val1}, @dots{})
@deftypefnx {} {} imagesc (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} imagesc (@dots{})
Display a scaled version of the matrix @var{img} as a color image.

The colormap is scaled so that the entries of the matrix occupy the entire
colormap.  If @code{@var{climits} = [@var{lo}, @var{hi}]} is given, then
that range is set to the @qcode{"clim"} of the current axes.

@var{x} and @var{y} are optional 2-element vectors, @w{@code{[min, max]}},
which specify the coordinates of the centers of the corner pixels.
If a range is specified as @w{@code{[max, min]}}@ then the image will be
reversed along that axis.  For convenience, @var{x} and @var{y} may be
specified as N-element vectors matching the length of the data in @var{img}.
However, only the first and last elements will be used to determine
the image limits.

The optional return value @var{h} is a graphics handle to the image.

Calling Forms: The @code{imagesc} function can be called in two forms:
High-Level and Low-Level.  When invoked with normal options, the High-Level
form is used which first calls @code{newplot} to prepare the graphic figure
and axes.  When the only inputs to @code{image} are property/value pairs
the Low-Level form is used which creates a new instance of an image object
and inserts it in the current axes.  The full list of properties is
documented at @ref{Image Properties}.

@seealso{image, imshow, clim}
@end deftypefn
