# getframe

```octave
function frame = getframe (h = [], rect = [])
```

@deftypefn  {} {@var{frame} =} getframe ()
@deftypefnx {} {@var{frame} =} getframe (@var{hax})
@deftypefnx {} {@var{frame} =} getframe (@var{hfig})
@deftypefnx {} {@var{frame} =} getframe (@dots{}, @var{rect})

Capture a figure or axes as a movie frame structure.

Without an argument, capture the current axes excluding ticklabels, title,
and x/y/zlabels.  The returned structure @var{frame} has a field
@code{cdata}, which contains the actual image data in the form of an
@nospell{NxMx3} (RGB) uint8 matrix in physical screen pixels, and a field
@code{colormap} which is provided for @sc{matlab} compatibility but is
always empty.

If the first argument @var{hax} is an axes handle, then capture this axes,
rather than the current axes returned by @code{gca}.

If the first argument @var{hfig} is a figure handle then the entire
corresponding figure canvas is captured.

Finally, if a second argument @var{rect} is provided it must be a
four-element vector ([left bottom width height]) defining the region inside
the figure to be captured.  Regardless of the figure @qcode{"units"}
property, @var{rect} must be defined in @strong{pixels}.

@seealso{im2frame, frame2im, movie}
@end deftypefn
