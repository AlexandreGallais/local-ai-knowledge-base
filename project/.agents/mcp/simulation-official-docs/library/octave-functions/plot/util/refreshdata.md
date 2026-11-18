# refreshdata

```octave
function refreshdata (h, workspace)
```

@deftypefn  {} {} refreshdata ()
@deftypefnx {} {} refreshdata (@var{h})
@deftypefnx {} {} refreshdata (@var{h}, @var{workspace})
Evaluate any @samp{datasource} properties of the current figure and update
the plot if the corresponding data has changed.

If the first argument @var{h} is a list of graphics handles to figure, axes,
or graphic objects with a DataSource property, then operate on these objects
rather than the current figure returned by @code{gcf}.

The optional second argument @var{workspace} can take the following values:

@table @asis
@item @qcode{"base"}
Evaluate the datasource properties in the base workspace.  (default).

@item @qcode{"caller"}
Evaluate the datasource properties in the workspace of the function
that called @code{refreshdata}.
@end table

An example of the use of @code{refreshdata} is:

@example
@group
x = 0:0.1:10;
y = sin (x);
plot (x, y, "ydatasource", "y");
for i = 1 : 100
  pause (0.1);
  y = sin (x + 0.1*i);
  refreshdata ();
endfor
@end group
@end example

Programming Note: For performance, specify @var{h} as the actual object(s)
to be updated.  If no object is supplied then Octave must search through
all graphic objects of the current figure and determine which ones have
DataSource properties that are not empty.
@end deftypefn
