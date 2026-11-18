# clf

```octave
function h = clf (varargin)
```

@deftypefn  {} {} clf
@deftypefnx {} {} clf reset
@deftypefnx {} {} clf (@var{hfig})
@deftypefnx {} {} clf (@var{hfig}, "reset")
@deftypefnx {} {@var{h} =} clf (@dots{})
Clear the current figure window.

@code{clf} operates by deleting child graphics objects with visible
handles (HandleVisibility = @qcode{"on"}).

If the optional argument @qcode{"reset"} is specified, delete all child
objects including those with hidden handles and reset all figure
properties to their defaults.  However, the following properties are not
reset: Position, Units, PaperPosition, PaperUnits.

If the first argument @var{hfig} is a figure handle, then operate on
this figure rather than the current figure returned by @code{gcf}.

The optional return value @var{h} is the graphics handle of the figure
window that was cleared.
@seealso{cla, close, delete, reset}
@end deftypefn
