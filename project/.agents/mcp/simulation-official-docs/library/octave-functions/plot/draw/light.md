# light

```octave
function h = light (varargin)
```

@deftypefn  {} {} light ()
@deftypefnx {} {} light (@dots{}, "@var{prop}", @var{val}, @dots{})
@deftypefnx {} {} light (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} light (@dots{})
Create a light object in the current axes or for axes @var{hax}.

When a light object is present in an axes object, and the properties
@qcode{"EdgeLighting"} or @qcode{"FaceLighting"} of a @code{patch} or
@code{surface} object are set to a value other than @qcode{"none"}, these
objects are drawn with lighting effects.  Supported values for Lighting
properties are @qcode{"none"} (no lighting effects), @qcode{"flat"} (faceted
look of the objects), and @qcode{"gouraud"} (linear interpolation of the
lighting effects between the vertices).  If the lighting mode is set to
@qcode{"flat"}, the @qcode{"FaceNormals"} property is used for lighting.
For @qcode{"gouraud"}, the @qcode{"VertexNormals"} property is used.

Up to eight light objects are supported per axes.  (Implementation
dependent)

Lighting is only supported for OpenGL graphic toolkits (i.e., @qcode{"fltk"}
and @qcode{"qt"}).

A light object has the following properties which alter the appearance of
the plot.

@table @asis
@item @qcode{"Color":} The color of the light can be passed as an
RGB-vector (e.g., @code{[1 0 0]} for red) or as a string (e.g., @qcode{"r"}
for red).  The default color is white (@code{[1 1 1]}).

@item @qcode{"Position":} The direction from which the light emanates as a
1x3-vector.  The default direction is @code{[1 0 1]}.

@item @qcode{"Style":} This string defines whether the light emanates from a
light source at infinite distance (@qcode{"infinite"}) or from a local point
source (@qcode{"local"}).  The default is @qcode{"infinite"}.
@end table

If the first argument @var{hax} is an axes handle, then add the light object
to this axes, rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created light
object.

Programming Note: The full list of properties is documented at
@ref{Light Properties}.
@seealso{lighting, material, patch, surface}
@end deftypefn
