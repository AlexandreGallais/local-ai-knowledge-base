# cylinder

```octave
function [x, y, z] = cylinder (varargin)
```

@deftypefn  {} {} cylinder
@deftypefnx {} {} cylinder (@var{r})
@deftypefnx {} {} cylinder (@var{r}, @var{n})
@deftypefnx {} {} cylinder (@var{hax}, @dots{})
@deftypefnx {} {[@var{x}, @var{y}, @var{z}] =} cylinder (@dots{})
Plot a 3-D unit cylinder.

The optional input @var{r} is a vector specifying the radius along the
unit z-axis.  The default is [1 1] indicating radius 1 at @code{Z == 0}
and at @code{Z == 1}.

The optional input @var{n} determines the number of faces around the
circumference of the cylinder.  The default value is 20.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

If outputs are requested @code{cylinder} returns three matrices in
@code{meshgrid} format, such that @code{surf (@var{x}, @var{y}, @var{z})}
generates a unit cylinder.

Example:

@example
@group
[x, y, z] = cylinder (10:-1:0, 50);
surf (x, y, z);
title ("a cone");
@end group
@end example
@seealso{ellipsoid, rectangle, sphere}
@end deftypefn
