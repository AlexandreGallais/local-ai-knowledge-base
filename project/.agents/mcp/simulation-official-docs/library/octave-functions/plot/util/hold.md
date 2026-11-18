# hold

```octave
function hold (varargin)
```

@deftypefn  {} {} hold
@deftypefnx {} {} hold on
@deftypefnx {} {} hold off
@deftypefnx {} {} hold (@var{hax}, @dots{})
Toggle or set the @qcode{"hold"} state of the plotting engine which
determines whether new graphic objects are added to the plot or replace
the existing objects.

@table @code
@item hold on
Retain plot data and settings so that subsequent plot commands are displayed
on a single graph.  Line color and line style are advanced for each new plot
added.

@item hold all (deprecated)
Equivalent to @code{hold on}.

@item hold off
Restore default graphics settings which clear the graph and reset axes
properties before each new plot command.  (default).

@item hold
Toggle the current hold state.
@end table

When given the additional argument @var{hax}, the hold state is modified
for this axes rather than the current axes returned by @code{gca}.

To query the current hold state use the @code{ishold} function.
@seealso{ishold, cla, clf, newplot}
@end deftypefn
