# image

```octave
function h = image (varargin)
```

@deftypefn  {} {} image (@var{img})
@deftypefnx {} {} image (@var{x}, @var{y}, @var{img})
@deftypefnx {} {} image ("CData", @var{img})
@deftypefnx {} {} image ("XData", @var{x}, "YData", @var{y}, "CData", @var{img})
@deftypefnx {} {} image (@dots{}, @var{prop}, @var{val})
@deftypefnx {} {} image (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} image (@dots{})
Display a matrix as an image.

@var{img} may be a 2-D matrix where each element is an index into the
current colormap.  For floating point data, the value 1 chooses the first
color in the colormap.  For integer data, the value 0 chooses the first
color in the colormap.

Or @var{img} may be a 3-D matrix where the third dimension is an RGB triplet
specifying the color.  If the image data is floating point then the data
must be in the range [0, 1].  If the image data is of integer type (uint8 or
uint16) then the data must be in the range [0, INTMAX].

@var{x} and @var{y} are optional 1-element (@code{[min]}) or 2-element
vectors (@w{@code{[min, max]}}) which specify the coordinate(s) of the
@emph{center} of a corner pixel.  If unspecified, the default minimum value
is 1 and the maximum is the length of @var{img} along the specific
dimension.  If a range is specified as @w{@code{[max, min]}}@ then the image
will be reversed along that axis.  For convenience, @var{x} and @var{y} may
be specified as vectors, however, only the first and last elements will be
used to determine the axis limits.

Multiple property/value pairs may be specified for the image object, but
they must appear in pairs.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the image.

Implementation Note: The origin (0, 0) for images is located in the upper
left.  For ordinary plots, the origin is located in the lower left.  Octave
handles this inversion by plotting the data normally, and then reversing the
direction of the y-axis by setting the @code{ydir} property to
@qcode{"reverse"}.  This has implications whenever an image and an ordinary
plot need to be overlaid.  The recommended solution is to display the image
and then plot the reversed ydata using, for example, @code{flipud (ydata)}.

Calling Forms: The @code{image} function can be called in two forms:
High-Level and Low-Level.  When invoked with normal options, the High-Level
form is used which first calls @code{newplot} to prepare the graphic figure
and axes.  When the only inputs to @code{image} are property/value pairs
the Low-Level form is used which creates a new instance of an image object
and inserts it in the current axes (as if @code{hold on} was in effect).

Graphic Properties: The full list of properties is documented at
@ref{Image Properties}.
@seealso{imshow, imagesc, colormap}
@end deftypefn
