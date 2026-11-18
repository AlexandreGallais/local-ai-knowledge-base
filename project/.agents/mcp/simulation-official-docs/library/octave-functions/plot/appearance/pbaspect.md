# pbaspect

```octave
function pbratio = pbaspect (varargin)
```

@deftypefn  {} {@var{plot_box_aspect_ratio} =} pbaspect ( )
@deftypefnx {} {} pbaspect (@var{plot_box_aspect_ratio})
@deftypefnx {} {} pbaspect (@var{mode})
@deftypefnx {} {@var{plot_box_aspect_ratio_mode} =} pbaspect ("mode")
@deftypefnx {} {} pbaspect (@var{hax}, @dots{})

Query or set the plot box aspect ratio of the current axes.

The aspect ratio is a normalized 3-element vector representing the rendered
lengths of the x, y, and z axes.

@code{pbaspect(@var{mode})}

Set the plot box aspect ratio mode of the current axes.  @var{mode} is
either @qcode{"auto"} or @qcode{"manual"}.

@code{pbaspect ("mode")}

Return the plot box aspect ratio mode of the current axes.

@code{pbaspect (@var{hax}, @dots{})}

Operate on the axes in handle @var{hax} instead of the current axes.

@seealso{axis, daspect, xlim, ylim, zlim}
@end deftypefn
