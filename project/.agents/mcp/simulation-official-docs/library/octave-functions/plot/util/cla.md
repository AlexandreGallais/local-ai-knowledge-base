# cla

```octave
function cla (hax, do_reset = false)
```

@deftypefn  {} {} cla
@deftypefnx {} {} cla reset
@deftypefnx {} {} cla (@var{hax})
@deftypefnx {} {} cla (@var{hax}, "reset")
Clear the current or specified (@var{hax}) axes object.

@code{cla} operates by deleting child graphic objects with visible
handles (@code{HandleVisibility} = @qcode{"on"}).  This typically clears the
axes of any visual objects, but leaves in place axes limits, tick marks and
labels, camera view, etc.  In addition, the automatic coloring and styling
of lines is reset by changing the axes properties @code{ColorOrderIndex},
@code{LinestyleOrderIndex} to 1.

If the optional argument @qcode{"reset"} is specified, delete all child
objects, including those with hidden handles, and reset all axes properties
to their defaults.  However, the following properties are not reset:
@code{Position}, @code{Units}.

If the first argument @var{hax} is an axes handle, then operate on
this axes rather than the current axes returned by @code{gca}.
@seealso{clf, delete, reset}
@end deftypefn
