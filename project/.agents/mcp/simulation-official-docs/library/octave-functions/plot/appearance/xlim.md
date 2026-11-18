# xlim

```octave
function xlimits = xlim (varargin)
```

@deftypefn  {} {@var{xlimits} =} xlim ()
@deftypefnx {} {@var{xmode} =} xlim ("mode")
@deftypefnx {} {@var{xmethod} =} xlim ("method")
@deftypefnx {} {} xlim ([@var{x_lo} @var{x_hi}])
@deftypefnx {} {} xlim ("mode")
@deftypefnx {} {} xlim ("method")
@deftypefnx {} {} xlim (@var{hax}, @dots{})
Query or set the limits of the x-axis for the current plot.

Called without arguments @code{xlim} returns the x-axis limits of the
current plot.

With the input query @qcode{"mode"}, return the current x-limit calculation
mode which is either @qcode{"auto"} or @qcode{"manual"}.

With the input query @qcode{"method"}, return the current x-limit
calculation method which is either @qcode{"tickaligned"}, @qcode{"tight"},
or @qcode{"padded"}.

If passed a 2-element vector [@var{x_lo} @var{x_hi}], the limits of the
x-axis are set to these values and the mode is set to @qcode{"manual"}.
The special values -Inf and Inf can be used to indicate that either
the lower axis limit or upper axis limit should be automatically calculated.

The current limit calculation @qcode{"mode"} may be one of

@table @asis
@item @qcode{"auto"} (default)
Automatically calculate limits based on the plot data and the currently
specified limit calculation method.

@item @qcode{"manual"}
Fix axis limits at current values.
@end table

The current limit calculation method may be one of

@table @asis
@item @qcode{"tickaligned"} (default)
Calculate limits that encompass all of the data and extend outwards to the
nearest tick mark.

@item @qcode{"tight"}
Calculate limits that exactly fit the data range.

@item @qcode{"padded"}
Calculate limits that leave a margin around the data of approximately 7% of
the data range.
@end table

If the first argument @var{hax} is an axes handle, then operate on
this axes rather than the current axes returned by @code{gca}.

Programming Note: The @code{xlim} function operates by modifying the
@qcode{"xlim"}, @qcode{"xlimmode"}, and @qcode{"xlimitmethod"} properties of
an axes object.  These properties can be directly inspected and altered with
@code{get}/@code{set}.
@seealso{ylim, zlim, axis, set, get, gca}
@end deftypefn
