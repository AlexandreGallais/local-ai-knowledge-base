# gca

```octave
function h = gca ()
```

@deftypefn {} {@var{h} =} gca ()
Return a handle to the current axes object.

The current axes is the default target for graphics output.  In the case
of a figure with multiple axes, @code{gca} returns the last created axes
or the last axes that was clicked on with the mouse.

If no current axes object exists, create one and return its handle.  The
handle may then be used to examine or set properties of the axes.  For
example,

@example
@group
ax = gca ();
set (ax, "position", [0.5, 0.5, 0.5, 0.5]);
@end group
@end example

@noindent
creates an empty axes object and then changes its location and size in the
figure window.

Note: To find the current axes without creating a new axes object if it
does not exist, query the @qcode{"CurrentAxes"} property of a figure.

@example
get (gcf, "currentaxes");
@end example
@seealso{gcf, gco, gcbf, gcbo, get, set}
@end deftypefn
