# isonormals

```octave
function vn = isonormals (varargin)
```

@deftypefn  {} {@var{vn} =} isonormals (@var{val}, @var{vert})
@deftypefnx {} {@var{vn} =} isonormals (@var{val}, @var{hp})
@deftypefnx {} {@var{vn} =} isonormals (@var{x}, @var{y}, @var{z}, @var{val}, @var{vert})
@deftypefnx {} {@var{vn} =} isonormals (@var{x}, @var{y}, @var{z}, @var{val}, @var{hp})
@deftypefnx {} {@var{vn} =} isonormals (@dots{}, "negate")
@deftypefnx {} {} isonormals (@var{val}, @var{hp})
@deftypefnx {} {} isonormals (@var{x}, @var{y}, @var{z}, @var{val}, @var{hp})
@deftypefnx {} {} isonormals (@dots{}, "negate")

Calculate normals to an isosurface.

The vertex normals @var{vn} are calculated from the gradient of the
3-dimensional array @var{val} (size: lxmxn) containing the data for an
isosurface geometry.  The normals point towards smaller values in @var{val}.

If called with one output argument @var{vn}, and the second input argument
@var{vert} holds the vertices of an isosurface, then the normals @var{vn}
are calculated at the vertices @var{vert} on a grid given by
@code{[x, y, z] = meshgrid (1:l, 1:m, 1:n)}.  The output argument
@var{vn} has the same size as @var{vert} and can be used to set the
@qcode{"VertexNormals"} property of the corresponding patch.

If called with additional input arguments @var{x}, @var{y}, and @var{z},
which are 3-dimensional arrays with the same size as @var{val},
then the volume data is taken at these points.  Instead of the vertex data
@var{vert}, a patch handle @var{hp} can be passed to the function.

If the last input argument is the string @qcode{"negate"}, compute the
reverse vector normals of an isosurface geometry (i.e., pointed towards
larger values in @var{val}).

If no output argument is given, the property @qcode{"VertexNormals"} of
the patch associated with the patch handle @var{hp} is changed directly.

@seealso{isosurface, isocolors, smooth3}
@end deftypefn
