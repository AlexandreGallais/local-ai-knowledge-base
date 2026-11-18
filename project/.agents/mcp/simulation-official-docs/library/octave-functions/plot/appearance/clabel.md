# clabel

```octave
function hlabels = clabel (c, varargin)
```

@deftypefn  {} {} clabel (@var{c}, @var{h})
@deftypefnx {} {} clabel (@var{c}, @var{h}, @var{v})
@deftypefnx {} {} clabel (@var{c}, @var{h}, "manual")
@deftypefnx {} {} clabel (@var{c})
@deftypefnx {} {} clabel (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {@var{hlabels} =} clabel (@dots{})
Add labels to the contours of a contour plot.

The contour levels are specified by the contour matrix @var{c} which is
returned by @code{contour}, @code{contourc}, @code{contourf}, and
@code{contour3}.  Contour labels are rotated to match the local line
orientation and centered on the line.  The position of labels along the
contour line is chosen randomly.

If the argument @var{h} is a handle to a contour group object, then label
this plot rather than the one in the current axes returned by @code{gca}.

By default, all contours are labeled.  However, the contours to label can be
specified by the vector @var{v}.  If the @qcode{"manual"} argument is
given then the contours to label can be selected with the mouse.

Additional property/value pairs that are valid properties of text objects
can be given and are passed to the underlying text objects.  Moreover,
the contour group property @qcode{"LabelSpacing"} is available which
determines the spacing between labels on a contour to be specified.  The
default is 144 points, or 2 inches.

The optional return value @var{hlabels} is a vector of graphics handles to
the text objects representing each label.
The @qcode{"userdata"} property of the text objects contains the numerical
value of the contour label.

The full list of text object properties is documented at
@ref{Text Properties}.

@example
@group
[c, h] = contour (peaks (), -4 : 6);
clabel (c, h, -4:2:6, "fontsize", 12);
@end group
@end example

@seealso{contour, contourf, contour3, meshc, surfc, text}
@end deftypefn
