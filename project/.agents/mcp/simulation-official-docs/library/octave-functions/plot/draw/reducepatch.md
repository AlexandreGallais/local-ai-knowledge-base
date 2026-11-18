# reducepatch

```octave
function varargout = reducepatch (varargin)
```

@deftypefn  {} {@var{reduced_fv} =} reducepatch (@var{fv})
@deftypefnx {} {@var{reduced_fv} =} reducepatch (@var{faces}, @var{vertices})
@deftypefnx {} {@var{reduced_fv} =} reducepatch (@var{patch_handle})
@deftypefnx {} {} reducepatch (@var{patch_handle})
@deftypefnx {} {@var{reduced_fv} =} reducepatch (@dots{}, @var{reduction_factor})
@deftypefnx {} {@var{reduced_fv} =} reducepatch (@dots{}, "fast")
@deftypefnx {} {@var{reduced_fv} =} reducepatch (@dots{}, "verbose")
@deftypefnx {} {[@var{reduced_faces}, @var{reduces_vertices}] =} reducepatch (@dots{})

Reduce the number of faces and vertices in a patch object while retaining
the overall shape of the patch.

The input patch can be represented by a structure @var{fv} with the
fields @code{faces} and @code{vertices}, by two matrices @var{faces} and
@var{vertices} (see, e.g., the result of @code{isosurface}), or by a
handle to a patch object @var{patch_handle}
(@pxref{XREFpatch,,@code{patch}}).

The number of faces and vertices in the patch is reduced by iteratively
collapsing the shortest edge of the patch to its midpoint (as discussed,
e.g., here:
@url{https://libigl.github.io/libigl/tutorial/tutorial.html#meshdecimation}).

Currently, only patches consisting of triangles are supported.  The
resulting patch also consists only of triangles.

If @code{reducepatch} is called with a handle to a valid patch
@var{patch_handle}, and without any output arguments, then the given
patch is updated immediately.

If the @var{reduction_factor} is omitted, the resulting structure
@var{reduced_fv} includes approximately 50% of the faces of the original
patch.  If @var{reduction_factor} is a fraction between 0 (excluded) and 1
(excluded), a patch with approximately the corresponding fraction of faces
is determined.
If @var{reduction_factor} is an integer greater than or equal to 1, the
resulting patch has approximately @var{reduction_factor} faces.  Depending
on the geometry of the patch, the resulting number of faces can differ from
the given value of @var{reduction_factor}.  This is especially true when
many shared vertices are detected.

For the reduction, it is necessary that vertices of touching faces are
shared.  Shared vertices are detected automatically.  This detection can be
skipped by passing the optional string argument @qcode{"fast"}.

With the optional string arguments @qcode{"verbose"}, additional status
messages are printed to the command window.

Any string input arguments must be passed after all other arguments.

If called with one output argument, the reduced faces and vertices are
returned in a structure @var{reduced_fv} with the fields @code{faces} and
@code{vertices} (see the one output option of @code{isosurface}).

If called with two output arguments, the reduced faces and vertices are
returned in two separate matrices @var{reduced_faces} and
@var{reduced_vertices}.

@seealso{isosurface, isonormals, reducevolume, patch}
@end deftypefn
