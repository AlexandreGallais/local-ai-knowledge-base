# legend

```octave
function [hleg, hleg_obj, hplot, labels] = legend (varargin)
```

@deftypefn  {} {} legend ()
@deftypefnx {} {} legend @var{command}
@deftypefnx {} {} legend (@var{str1}, @var{str2}, @dots{})
@deftypefnx {} {} legend (@var{charmat})
@deftypefnx {} {} legend (@{@var{cellstr}@})
@deftypefnx {} {} legend (@dots{}, @var{property}, @var{value}, @dots{})
@deftypefnx {} {} legend (@var{hobjs}, @dots{})
@deftypefnx {} {} legend ("@var{command}")
@deftypefnx {} {} legend (@var{hax}, @dots{})
@deftypefnx {} {} legend (@var{hleg}, @dots{})
@deftypefnx {} {@var{hleg} =} legend (@dots{})

Display a legend for the current axes using the specified strings as labels.

Legend entries may be specified as individual character string arguments,
a character array, or a cell array of character strings.  When label names
might be confused with legend properties, or @var{command} arguments,
the labels should be protected by specifying them as a cell array of
strings.

If the first argument @var{hax} is an axes handle, then add a legend to this
axes, rather than the current axes returned by @code{gca}.

If the first argument @var{hleg} is a legend handle, then operate on this
legend rather than the legend of the current axes.

Legend labels are associated with the axes' children; The first label is
assigned to the first object that was plotted in the axes, the second label
to the next object plotted, etc.  To label specific data objects, without
labeling all objects, provide their graphic handles in the input
@var{hobjs}.

The following customizations are available using @var{command}:

@table @asis
@item @qcode{"show"}
  Show legend on the plot

@item @qcode{"hide"}
  Hide legend on the plot

@item @qcode{"toggle"}
  Toggle between @qcode{"hide"} and @qcode{"show"}

@item @qcode{"boxon"}
  Show a box around legend (default)

@item @qcode{"boxoff"}
  Hide the box around legend

@item @qcode{"right"}
  Place label text to the right of the keys (default)

@item @qcode{"left"}
  Place label text to the left of the keys

@item @qcode{"off"}
  Delete the legend object
@end table

The @code{legend} function creates a graphics object which has various
properties that can be manipulated with @code{get}/@code{set}.
Alternatively, properties can be set directly when calling @code{legend} by
including @var{property}/@var{value} pairs.  If using this calling form, the
labels must be specified as a cell array of strings.  Graphics object
properties are documented in detail at @ref{Graphics Object Properties}.

Following is a subset of supported legend properties:
@c The following table is obtained by copying the output of
@c genpropdoc ("legend", "", {"autoupdate", "box", "location", "numcolumns", "orientation", "string", "textcolor"})

@table @asis

@item @code{autoupdate}: @qcode{"off"} | @{@qcode{"on"}@}
Control whether the number of legend items is updated automatically when
objects are added to (or deleted from) the peer axes.  For example:

@example
@group
## Create a single plot with its legend.
figure ();
plot (1:10);
legend ("Slope 1");
## Add another plot and specify its displayname so that
## the legend is correctly updated.
hold on;
plot ((1:10) * 2, "displayname", "Slope 2");
## Stop automatic updates for further plots.
legend ("autoupdate", "off");
plot ((1:10) * 3);
@end group
@end example

@item @code{box}: @qcode{"off"} | @{@qcode{"on"}@}
Control whether the legend has a surrounding box.

@item @code{location}: @qcode{"best"} | @qcode{"bestoutside"} |
@qcode{"east"} | @qcode{"eastoutside"} | @qcode{"none"} | @qcode{"north"} |
@{@qcode{"northeast"}@} | @qcode{"northeastoutside"} |
@qcode{"northoutside"} | @qcode{"northwest"}| @qcode{"northwestoutside"} |
@qcode{"south"} | @qcode{"southeast"} | @qcode{"southeastoutside"} |
@qcode{"southoutside"} | @qcode{"southwest"} | @qcode{"southwestoutside"} |
@qcode{"west"} | @qcode{"westoutside"}
Control the location of the legend.

@item @code{numcolumns}: scalar interger, def. @code{1}
Control the number of columns used in the layout of the legend items.
For example:

@example
@group
figure ();
plot (rand (30));
legend ("numcolumns", 3);
@end group
@end example

Setting @code{numcolumns} also forces the @code{numcolumnsmode} property
to be set to @qcode{"manual"}.

@item @code{orientation}: @qcode{"horizontal"} | @{@qcode{"vertical"}@}
Control whether the legend items are arranged vertically (column-wise) or
horizontally (row-wise).

@item @code{string}: string | cell array of strings
List of labels for the legend items.  For example:

@example
@group
figure ();
plot (rand (20));
## Let legend choose names automatically
hl = legend ();
## Selectively change some names
str = get (hl, "string");
str(1:5:end) = "Garbage";
set (hl, "string", str);
@end group
@end example

@item @code{textcolor}: colorspec, def. @code{[0   0   0]}
Control the color of the text strings for legend item.

@end table

The full list of supported legend specific properties can be found at
@ref{Legend Properties}.

A legend is implemented as an additional axes object with the @code{tag}
property set to @qcode{"legend"}.  Properties of the legend object may be
manipulated directly by using @code{set}.

The optional output value @var{hleg} is a handle to the legend object.

Implementation Note: The legend label text is either provided in the call to
@code{legend} or is taken from the @code{DisplayName} property of the
graphics objects.  Only data objects, such as line, patch, and surface, have
this property whereas axes, figures, etc.@: do not so they are never present
in a legend.  If no labels or @code{DisplayName} properties are available,
then the label text is simply @qcode{"data1"}, @qcode{"data2"}, @dots{},
@nospell{@qcode{"dataN"}}.

The legend @code{FontSize} property is initially set to 90% of the axes
@code{FontSize} to which it is attached.  Use @code{set} to override this
if necessary.
@end deftypefn
