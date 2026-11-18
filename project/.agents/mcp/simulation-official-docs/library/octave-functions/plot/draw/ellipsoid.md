# ellipsoid

```octave
function [x, y, z] = ellipsoid (varargin)
```

@deftypefn  {} {} ellipsoid (@var{xc}, @var{yc}, @var{zc}, @var{xr}, @var{yr}, @var{zr})
@deftypefnx {} {} ellipsoid (@dots{}, @var{n})
@deftypefnx {} {} ellipsoid (@var{hax}, @dots{})
@deftypefnx {} {[@var{x}, @var{y}, @var{z}] =} ellipsoid (@dots{})
Plot a 3-D ellipsoid.

The inputs @var{xc}, @var{yc}, @var{zc} specify the center of the ellipsoid.
The inputs @var{xr}, @var{yr}, @var{zr} specify the semi-major axis lengths.

The optional input @var{n} determines the number of faces around the
circumference of the cylinder.  The default value is 20.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

If outputs are requested @code{ellipsoid} returns three matrices in
@code{meshgrid} format, such that @code{surf (@var{x}, @var{y}, @var{z})}
generates the ellipsoid.
@seealso{cylinder, rectangle, sphere}
@end deftypefn
