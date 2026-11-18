# annotation

```octave
function h = annotation (varargin)
```

@deftypefn  {} {} annotation (@var{type})
@deftypefnx {} {} annotation ("line", @var{x}, @var{y})
@deftypefnx {} {} annotation ("arrow", @var{x}, @var{y})
@deftypefnx {} {} annotation ("doublearrow", @var{x}, @var{y})
@deftypefnx {} {} annotation ("textarrow", @var{x}, @var{y})
@deftypefnx {} {} annotation ("textbox", @var{pos})
@deftypefnx {} {} annotation ("rectangle", @var{pos})
@deftypefnx {} {} annotation ("ellipse", @var{pos})
@deftypefnx {} {} annotation (@dots{}, @var{prop}, @var{val})
@deftypefnx {} {} annotation (@var{hf}, @dots{})
@deftypefnx {} {@var{h} =} annotation (@dots{})
Draw annotations to emphasize parts of a figure.

You may build a default annotation by specifying only the @var{type}
of the annotation.

Otherwise you can select the type of annotation and then set its position
using either @var{x} and @var{y} coordinates for line-based annotations or a
position vector @var{pos} for others.  In either case, coordinates are
interpreted using the @qcode{"units"} property of the annotation object.
The default is @qcode{"normalized"}, which means the lower left hand corner
of the figure has coordinates @samp{[0 0]} and the upper right hand corner
@samp{[1 1]}.

If the first argument @var{hf} is a figure handle, then plot into this
figure, rather than the current figure returned by @code{gcf}.

Further arguments can be provided in the form of @var{prop}/@var{val} pairs
to customize the annotation appearance.

The optional return value @var{h} is a graphics handle to the created
annotation object.  This can be used with the @code{set} function to
customize an existing annotation object.

All annotation objects share two properties:

@itemize
@item @qcode{"units"}: the units in which coordinates are interpreted.@*
Its value may be one of @qcode{"centimeters"} | @qcode{"characters"} |
@qcode{"inches"} | @qcode{"@{normalized@}"} | @qcode{"pixels"} |
@qcode{"points"}.

@item @qcode{"position"}: a four-element vector [x0 y0 width height].@*
The vector specifies the coordinates (x0,y0) of the origin of the annotation
object, its width, and its height.  The width and height may be negative,
depending on the orientation of the object.

@end itemize

Valid annotation types and their specific properties are described
below:

@table @asis
@item @qcode{"line"}
Constructs a line.  @var{x} and @var{y} must be two-element vectors
specifying the x and y coordinates of the two ends of the line.

The line can be customized using @qcode{"linewidth"}, @qcode{"linestyle"},
and @qcode{"color"} properties the same way as for @code{line} objects.

@item @qcode{"arrow"}
Construct an arrow.  The second point in vectors @var{x} and @var{y}
specifies the arrowhead coordinates.

Besides line properties, the arrowhead can be customized using
@qcode{"headlength"}, @qcode{"headwidth"}, and @qcode{"headstyle"}
properties.  Supported values for @qcode{"headstyle"} property are:
[@qcode{"diamond"} | @qcode{"ellipse"} | @qcode{"plain"} |
@qcode{"rectangle"} | @qcode{"vback1"} | @qcode{"@{vback2@}"} |
@qcode{"vback3"}]

@item @qcode{"doublearrow"}
Construct a double arrow.  Vectors @var{x} and @var{y} specify the
arrowhead coordinates.

The line and the arrowhead can be customized as for arrow annotations, but
some property names are duplicated:
@qcode{"head1length"}/@qcode{"head2length"},
@qcode{"head1width"}/@qcode{"head2width"}, etc.  The index 1 marks the
properties of the arrowhead at the first point in @var{x} and @var{y}
coordinates.

@item @qcode{"textarrow"}
Construct an arrow with a text label at the opposite end from the arrowhead.

Use the @qcode{"string"} property to change the text string.
The line and the arrowhead can be customized as for arrow annotations, and
the text can be customized using the same properties as @code{text} graphics
objects.  Note, however, that some text property names are prefixed with
"text" to distinguish them from arrow properties:
@qcode{"textbackgroundcolor"}, @qcode{"textcolor"},
@qcode{"textedgecolor"}, @qcode{"textlinewidth"},
@qcode{"textmargin"}, @qcode{"textrotation"}.

@item @qcode{"textbox"}
Construct a box with text inside.  @var{pos} specifies the
@qcode{"position"} property of the annotation.

Use the @qcode{"string"} property to change the text string.
You may use @qcode{"backgroundcolor"}, @qcode{"edgecolor"},
@qcode{"linestyle"}, and @qcode{"linewidth"} properties to customize
the box background color and edge appearance.  A limited set of @code{text}
objects properties are also available; Besides @qcode{"font@dots{}"}
properties, you may also use @qcode{"horizontalalignment"} and
@qcode{"verticalalignment"} to position the text inside the box.

Finally, the @qcode{"fitboxtotext"} property controls the actual extent of
the box.  If @qcode{"on"} (the default) the box limits are fitted to the
text extent.

@item @qcode{"rectangle"}
Construct a rectangle.  @var{pos} specifies the @qcode{"position"} property
of the annotation.

You may use @qcode{"facecolor"}, @qcode{"color"}, @qcode{"linestyle"}, and
@qcode{"linewidth"} properties to customize the rectangle background color
and edge appearance.

@item @qcode{"ellipse"}
Construct an ellipse.  @var{pos} specifies the @qcode{"position"} property
of the annotation.

See @qcode{"rectangle"} annotations for customization.
@end table

@seealso{xlabel, ylabel, zlabel, title, text, gtext, legend, colorbar}
@end deftypefn
