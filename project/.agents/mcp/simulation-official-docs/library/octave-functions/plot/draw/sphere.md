# sphere

```octave
function [x, y, z] = sphere (varargin)
```

@deftypefn  {} {} sphere ()
@deftypefnx {} {} sphere (@var{n})
@deftypefnx {} {} sphere (@var{hax}, @dots{})
@deftypefnx {} {[@var{x}, @var{y}, @var{z}] =} sphere (@dots{})
Plot a 3-D unit sphere.

The optional input @var{n} determines the number of faces around the
circumference of the sphere.  The default value is 20.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

If outputs are requested @code{sphere} returns three matrices in
@code{meshgrid} format such that @code{surf (@var{x}, @var{y}, @var{z})}
generates a unit sphere.

Example:

@example
@group
[x, y, z] = sphere (40);
surf (3*x, 3*y, 3*z);
axis equal;
title ("sphere of radius 3");
@end group
@end example
@seealso{cylinder, ellipsoid, rectangle}
@end deftypefn
