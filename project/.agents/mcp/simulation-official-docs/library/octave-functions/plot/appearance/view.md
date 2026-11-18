# view

```octave
function [azimuth, elevation] = view (varargin)
```

@deftypefn  {} {} view (@var{azimuth}, @var{elevation})
@deftypefnx {} {} view ([@var{azimuth} @var{elevation}])
@deftypefnx {} {} view ([@var{x} @var{y} @var{z}])
@deftypefnx {} {} view (2)
@deftypefnx {} {} view (3)
@deftypefnx {} {} view (@var{hax}, @dots{})
@deftypefnx {} {[@var{azimuth}, @var{elevation}] =} view ()
Query or set the viewpoint for the current axes.

The parameters @var{azimuth} and @var{elevation} can be given as two
arguments or as 2-element vector.  The viewpoint can also be specified with
Cartesian coordinates @var{x}, @var{y}, and @var{z}.

The call @code{view (2)} sets the viewpoint to
@w{@var{azimuth} = 0}@ and @w{@var{elevation} = 90}, which is the default
for 2-D graphs.

The call @code{view (3)} sets the viewpoint to
@w{@var{azimuth} = -37.5}@ and @w{@var{elevation} = 30}, which is the
default for 3-D graphs.

If the first argument @var{hax} is an axes handle, then operate on
this axes rather than the current axes returned by @code{gca}.

If no inputs are given, return the current @var{azimuth} and
@var{elevation}.
@end deftypefn
