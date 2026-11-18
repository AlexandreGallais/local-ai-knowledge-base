# orient

```octave
function orientation = orient (hfig, paporient)
```

@deftypefn  {} {} orient (@var{orientation})
@deftypefnx {} {} orient (@var{hfig}, @var{orientation})
@deftypefnx {} {@var{orientation} =} orient ()
@deftypefnx {} {@var{orientation} =} orient (@var{hfig})
Query or set the print orientation for figure @var{hfig}.

Valid values for @var{orientation} are @qcode{"portrait"},
@qcode{"landscape"}, and @qcode{"tall"}.

The @qcode{"landscape"} option changes the orientation so the plot width
is larger than the plot height.  The @qcode{"paperposition"} is also
modified so that the plot fills the page, while leaving a 0.25 inch border.

The @qcode{"tall"} option sets the orientation to @qcode{"portrait"} and
fills the page with the plot, while leaving a 0.25 inch border.

The @qcode{"portrait"} option (default) changes the orientation so the plot
height is larger than the plot width.  It also restores the default
@qcode{"paperposition"} property.

When called with no arguments, return the current print orientation.

If the argument @var{hfig} is omitted, then operate on the current figure
returned by @code{gcf}.
@seealso{print, saveas}
@end deftypefn
