# patch

```octave
function h = patch (varargin)
```

@deftypefn  {} {} patch ()
@deftypefnx {} {} patch (@var{x}, @var{y}, @var{c})
@deftypefnx {} {} patch (@var{x}, @var{y}, @var{z}, @var{c})
@deftypefnx {} {} patch ("Faces", @var{faces}, "Vertices", @var{verts}, @dots{})
@deftypefnx {} {} patch (@dots{}, "@var{prop}", @var{val}, @dots{})
@deftypefnx {} {} patch (@dots{}, @var{propstruct}, @dots{})
@deftypefnx {} {} patch (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} patch (@dots{})
Create patch object in the current axes with vertices at locations
(@var{x}, @var{y}) and of color @var{c}.

If the vertices are matrices of size @nospell{MxN} then each polygon patch
has M vertices and a total of N polygons will be created.  If some polygons
do not have M vertices use NaN to represent "no vertex".  If the @var{z}
input is present then 3-D patches will be created.

The color argument @var{c} can take many forms.  To create polygons
which all share a single color use a string value (e.g., @qcode{"r"} for
red), a scalar value which is scaled by @code{clim} and indexed into the
current colormap, or a 3-element RGB vector with the precise TrueColor.

If @var{c} is a vector of length N then the ith polygon will have a color
determined by scaling entry @var{c}(i) according to @code{clim} and then
indexing into the current colormap.  More complicated coloring situations
require directly manipulating patch property/value pairs.

Instead of specifying polygons by matrices @var{x} and @var{y}, it is
possible to present a unique list of vertices and then a list of polygon
faces created from those vertices.  In this case the
@qcode{"Vertices"} matrix will be an @nospell{Nx2} (2-D patch) or
@nospell{Nx3} (3-D patch).  The @nospell{MxN} @qcode{"Faces"} matrix
describes M polygons having N vertices---each row describes a
single polygon and each column entry is an index into the
@qcode{"Vertices"} matrix to identify a vertex.  The patch object
can be created by directly passing the property/value pairs
@qcode{"Vertices"}/@var{verts}, @qcode{"Faces"}/@var{faces} as
inputs.

Instead of using property/value pairs, any property can be set by passing a
structure @var{propstruct} with the respective field names.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created patch
object.

Programming Notes:
@enumerate
@item
The full list of properties is documented at @ref{Patch Properties}.
Useful patch properties include: @qcode{"edgecolor"}, @qcode{"facecolor"},
@qcode{"faces"}, @qcode{"vertices"}, and @qcode{"facevertexcdata"}.

@item
Unexpected geometry results can occur from mixing x-y-z and
face-vertex forms of defining geometry.

@item
Unexpected patch color results can occur from using @qcode{"cdata"} color
definitions with face-vertex defined geometry or @qcode{"facevertexcdata"}
color definitions with x-y-z defined geometry.
@end enumerate
@seealso{fill, get, set}
@end deftypefn
