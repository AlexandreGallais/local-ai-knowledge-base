# daspect

```octave
function daratio = daspect (varargin)
```

@deftypefn  {} {@var{data_aspect_ratio} =} daspect ()
@deftypefnx {} {} daspect (@var{data_aspect_ratio})
@deftypefnx {} {} daspect (@var{mode})
@deftypefnx {} {@var{data_aspect_ratio_mode} =} daspect ("mode")
@deftypefnx {} {} daspect (@var{hax}, @dots{})
Query or set the data aspect ratio of the current axes.

The aspect ratio is a normalized 3-element vector representing the span of
the x, y, and z-axis limits.

@code{daspect (@var{mode})}

Set the data aspect ratio mode of the current axes.  @var{mode} is
either @qcode{"auto"} or @qcode{"manual"}.

@code{daspect (@qcode{"mode"})}

Return the data aspect ratio mode of the current axes.

@code{daspect (@var{hax}, @dots{})}

Operate on the axes in handle @var{hax} instead of the current axes.

@seealso{axis, pbaspect, xlim, ylim, zlim}
@end deftypefn
