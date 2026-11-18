# polar

```octave
function h = polar (varargin)
```

@deftypefn  {} {} polar (@var{theta}, @var{rho})
@deftypefnx {} {} polar (@var{theta}, @var{rho}, @var{fmt})
@deftypefnx {} {} polar (@var{cplx})
@deftypefnx {} {} polar (@var{cplx}, @var{fmt})
@deftypefnx {} {} polar (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} polar (@dots{})
Create a 2-D plot from polar coordinates @var{theta} and @var{rho}.

The input @var{theta} is assumed to be radians and is converted to degrees
for plotting.  If you have degrees then you must convert
(@pxref{XREFcart2pol,,@code{cart2pol}}) to radians before passing the
data to this function.

If a single complex input @var{cplx} is given then the real part is used
for @var{theta} and the imaginary part is used for @var{rho}.

The optional argument @var{fmt} specifies the line format in the same way
as @code{plot}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created plot.

Implementation Note: The polar axis is drawn using line and text objects
encapsulated in an hggroup.  The hggroup properties are linked to the
original axes object such that altering an appearance property, for example
@code{fontname}, will update the polar axis.  Two new properties are
added to the original axes--@code{rtick}, @code{ttick}--which replace
@code{xtick}, @code{ytick}.  The first is a list of tick locations in the
radial (rho) direction; The second is a list of tick locations in the
angular (theta) direction specified in degrees, i.e., in the range 0--359.
@seealso{rose, compass, plot, cart2pol}
@end deftypefn
