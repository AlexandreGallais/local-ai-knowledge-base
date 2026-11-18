# gcf

```octave
function h = gcf ()
```

@deftypefn {} {@var{h} =} gcf ()
Return a handle to the current figure.

The current figure is the default target for graphics output.  If multiple
figures exist, @code{gcf} returns the last created figure or the last figure
that was clicked on with the mouse.

If a current figure does not exist, create one and return its handle.  The
handle may then be used to examine or set properties of the figure.  For
example,

@example
@group
fplot (@@sin, [-10, 10]);
fig = gcf ();
set (fig, "numbertitle", "off", "name", "sin plot")
@end group
@end example

@noindent
plots a sine wave, finds the handle of the current figure, and then
renames the figure window to describe the contents.

Note: To find the current figure without creating a new one if it does not
exist, query the @qcode{"CurrentFigure"} property of the root graphics
object.

@example
get (groot, "currentfigure");
@end example

@seealso{gca, gco, gcbf, gcbo, get, set}
@end deftypefn
