# sombrero

```octave
function [x, y, z] = sombrero (n = 41)
```

@deftypefn  {} {} sombrero ()
@deftypefnx {} {} sombrero (@var{n})
@deftypefnx {} {@var{z} =} sombrero (@dots{})
@deftypefnx {} {[@var{x}, @var{y}, @var{z}] =} sombrero (@dots{})
Plot the familiar 3-D sombrero function.

The function plotted is
@tex
$$z = { \rm{sin} (\sqrt {(x^2 + y^2)}) \over \sqrt {(x^2 + y^2)} }$$
@end tex
@ifnottex

@example
z = sin (sqrt (x^2 + y^2)) / (sqrt (x^2 + y^2))
@end example

@end ifnottex
Called without a return argument, @code{sombrero} plots the surface of the
above function over the meshgrid [-8,8] using @code{surf}.

If @var{n} is a scalar the plot is made with @var{n} grid lines.
The default value for @var{n} is 41.

When called with output arguments, return the data for the function
evaluated over the meshgrid.  This can subsequently be plotted with
@code{surf (@var{x}, @var{y}, @var{z})}.

@seealso{peaks, meshgrid, mesh, surf}
@end deftypefn
