# subplot

```octave
function hax = subplot (varargin)
```

@deftypefn  {} {} subplot (@var{rows}, @var{cols}, @var{index})
@deftypefnx {} {} subplot (@var{rows}, @var{cols}, @var{index}, @var{hax})
@deftypefnx {} {} subplot (@var{rcn})
@deftypefnx {} {} subplot (@var{hax})
@deftypefnx {} {} subplot (@dots{}, "align")
@deftypefnx {} {} subplot (@dots{}, "replace")
@deftypefnx {} {} subplot ("position", @var{pos})
@deftypefnx {} {} subplot (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {@var{hax} =} subplot (@dots{})
Set up a plot grid with @var{rows} by @var{cols} subwindows and set the
current axes for plotting (@code{gca}) to the location given by @var{index}.

If an axes handle @var{hax} is provided after the (@var{rows}, @var{cols},
@var{index}) arguments, the corresponding axes is turned into a
subplot.

If only one numeric argument is supplied, then it must be a three digit
value specifying the number of rows in digit 1, the number of columns in
digit 2, and the plot index in digit 3.

The plot index runs row-wise; First, all columns in a row are numbered
and then the next row is filled.

For example, a plot with 2x3 grid will have plot indices running as follows:
@tex
\vskip 10pt
\hfil\vbox{\offinterlineskip\hrule
\halign{\vrule#&&\qquad\hfil#\hfil\qquad\vrule\cr
height13pt&1&2&3\cr height12pt&&&\cr\noalign{\hrule}
height13pt&4&5&6\cr height12pt&&&\cr\noalign{\hrule}}}
\hfil
\vskip 10pt
@end tex
@ifnottex

@example
@group
+-----+-----+-----+
|  1  |  2  |  3  |
+-----+-----+-----+
|  4  |  5  |  6  |
+-----+-----+-----+
@end group
@end example

@end ifnottex

@var{index} may also be a vector.  In this case, the new axes will enclose
the grid locations specified.  The first demo illustrates this:

@example
demo ("subplot", 1)
@end example

The index of the subplot to make active may also be specified by its axes
handle, @var{hax}, returned from a previous @code{subplot} command.

If the option @qcode{"align"} is given then the plot boxes of the subwindows
will align, but this may leave no room for axes tick marks or labels.

If the option @qcode{"replace"} is given then the subplot axes will be
reset, rather than just switching the current axes for plotting to the
requested subplot.

The @qcode{"position"} property can be used to exactly position the subplot
axes within the current figure.  The option @var{pos} is a 4-element vector
[x, y, width, height] that determines the location and size of the axes.
The values in @var{pos} are normalized in the range [0,1].

Any property/value pairs are passed directly to the underlying axes object.
The full list of properties is documented at @ref{Axes Properties}.

Any previously existing axes that would be (partly) covered by the newly
created axes are deleted.

If the output @var{hax} is requested, subplot returns the axes handle for
the subplot.  This is useful for modifying the properties of a subplot
using @code{set}.

Under some circumstances, @code{subplot} might not be able to identify axes
that it could re-use and might replace them.  If @code{subplot} axes
should be referenced repeatedly, consider creating and storing their axes
handles beforehand instead of calling @code{subplot} repeatedly for the same
position.

Example:

@example
@group
x = 1:10;
y = rand (16, 10);
for i_plot = 1:4
  hax(i_plot) = subplot (2, 2, i_plot);
  hold (hax(i_plot), "on");
  grid (hax(i_plot), "on");
endfor
for i_loop = 1:2
  for i_plot = 1:4
    iy = (i_loop - 1)*4 + i_plot;
    plotyy (hax(i_plot), x,y(iy,:), x,y(iy+1,:));
  endfor
 endfor
@end group
@end example

@seealso{axes, plot, gca, set}
@end deftypefn
