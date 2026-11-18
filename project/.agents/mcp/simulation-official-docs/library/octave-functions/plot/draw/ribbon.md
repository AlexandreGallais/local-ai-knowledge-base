# ribbon

```octave
function h = ribbon (varargin)
```

@deftypefn  {} {} ribbon (@var{y})
@deftypefnx {} {} ribbon (@var{x}, @var{y})
@deftypefnx {} {} ribbon (@var{x}, @var{y}, @var{width})
@deftypefnx {} {} ribbon (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} ribbon (@dots{})
Draw a ribbon plot for the columns of @var{y} vs.@: @var{x}.

If @var{x} is omitted, a vector containing the row numbers is assumed
(@code{1:rows (Y)}).  Alternatively, @var{x} can also be a vector with
same number of elements as rows of @var{y} in which case the same
@var{x} is used for each column of @var{y}.

The optional parameter @var{width} specifies the width of a single ribbon
(default is 0.75).

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a vector of graphics handles to
the surface objects representing each ribbon.
@seealso{surface, waterfall}
@end deftypefn
