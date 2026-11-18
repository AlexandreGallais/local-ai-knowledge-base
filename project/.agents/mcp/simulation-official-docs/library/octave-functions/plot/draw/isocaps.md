# isocaps

```octave
function varargout = isocaps (varargin)
```

@deftypefn  {} {@var{fvc} =} isocaps (@var{v}, @var{isoval})
@deftypefnx {} {@var{fvc} =} isocaps (@var{v})
@deftypefnx {} {@var{fvc} =} isocaps (@var{x}, @var{y}, @var{z}, @var{v}, @var{isoval})
@deftypefnx {} {@var{fvc} =} isocaps (@var{x}, @var{y}, @var{z}, @var{v})
@deftypefnx {} {@var{fvc} =} isocaps (@dots{}, @var{which_caps})
@deftypefnx {} {@var{fvc} =} isocaps (@dots{}, @var{which_plane})
@deftypefnx {} {@var{fvc} =} isocaps (@dots{}, @qcode{"verbose"})
@deftypefnx {} {[@var{faces}, @var{vertices}, @var{fvcdata}] =} isocaps (@dots{})
@deftypefnx {} {} isocaps (@dots{})

Create end-caps for isosurfaces of 3-D data.

This function places caps at the open ends of isosurfaces.

The input argument @var{v} is a three-dimensional array that contains data
sampled over a volume.

The input @var{isoval} is a scalar that specifies the value for the
isosurface.  If @var{isoval} is omitted or empty, a @nospell{"good"} value
for an isosurface is determined from @var{v}.

When called with a single output argument, @code{isocaps} returns a
structure array @var{fvc} with the fields: @code{faces}, @code{vertices},
and @code{facevertexcdata}.  The results are computed at the points
@code{[@var{x}, @var{y}, @var{z}] = meshgrid (1:l, 1:m, 1:n)} where
@code{[l, m, n] = size (@var{v})}.  The output @var{fvc} can be used
directly as input to the @code{patch} function.

If called with additional input arguments @var{x}, @var{y}, and @var{z}
that are three-dimensional arrays with the same size as @var{v} or
vectors with lengths corresponding to the dimensions of @var{v}, then the
volume data is taken at the specified points.  If @var{x}, @var{y}, or
@var{z} are empty, the grid corresponds to the indices (@code{1:n}) in
the respective direction (@pxref{XREFmeshgrid,,@code{meshgrid}}).

The optional parameter @var{which_caps} can have one of the following
string values which defines how the data will be enclosed:

@table @asis
@item @qcode{"above"}, @qcode{"a"} (default)
for end-caps that enclose the data above @var{isoval}.

@item @qcode{"below"}, @qcode{"b"}
for end-caps that enclose the data below @var{isoval}.
@end table

The optional parameter @var{which_plane} can have one of the following
string values to define which end-cap should be drawn:

@table @asis
@item @qcode{"all"} (default)
for all of the end-caps.

@item @qcode{"xmin"}
for end-caps at the lower x-plane of the data.

@item @qcode{"xmax"}
for end-caps at the upper x-plane of the data.

@item @qcode{"ymin"}
for end-caps at the lower y-plane of the data.

@item @qcode{"ymax"}
for end-caps at the upper y-plane of the data.

@item @qcode{"zmin"}
for end-caps at the lower z-plane of the data.

@item @qcode{"zmax"}
for end-caps at the upper z-plane of the data.
@end table

The string input argument @qcode{"verbose"} is supported for @sc{matlab}
compatibility, but has no effect.

If called with two or three output arguments, the data for faces
@var{faces}, vertices @var{vertices}, and the color data
@var{facevertexcdata} are returned in separate arrays instead of a single
structure.

If called with no output argument, the end-caps are drawn directly in the
current figure with the @code{patch} command.

@seealso{isosurface, isonormals, patch}
@end deftypefn
