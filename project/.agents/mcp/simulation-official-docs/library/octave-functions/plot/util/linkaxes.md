# linkaxes

```octave
function linkaxes (hax, optstr = "xy")
```

@deftypefn  {} {} linkaxes (@var{hax})
@deftypefnx {} {} linkaxes (@var{hax}, @var{optstr})
Link the axis limits of 2-D plots such that a change in one is propagated
to the others.

The axes handles to be linked are passed as the first argument @var{hax}.

The optional second argument is a string which defines which axis limits
will be linked.  The possible values for @var{optstr} are:

@table @asis
@item @qcode{"x"}
Link x-axes

@item @qcode{"y"}
Link y-axes

@item @qcode{"xy"} (default)
Link both axes

@item @qcode{"off"}
Turn off linking
@end table

If unspecified the default is to link both X and Y axes.

When linking, the limits from the first axes in @var{hax} are applied to the
other axes in the list.  Subsequent changes to any one of the axes will be
propagated to the others.

@seealso{linkprop, addproperty}
@end deftypefn
