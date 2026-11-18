# text

```octave
function h = text (varargin)
```

@deftypefn  {} {} text (@var{x}, @var{y}, @var{string})
@deftypefnx {} {} text (@var{x}, @var{y}, @var{z}, @var{string})
@deftypefnx {} {} text (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} text (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} text (@dots{})
Create a text object with text @var{string} at position @var{x}, @var{y},
(@var{z}) on the current axes.

Multiple locations can be specified if @var{x}, @var{y}, (@var{z}) are
vectors.  Multiple strings can be specified with a character matrix or
a cell array of strings.

Optional property/value pairs may be used to control the appearance of the
text.

If the first argument @var{hax} is an axes handle, then add text to this
axes, rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a vector of graphics handles to the
created text objects.

Example 1 : multi-line text via 3 different methods

@example
@group
text (0.5, 0.8, @{"Line 1", "Line 2"@})
text (0.5, 0.6, ["Line 1"; "Line 2"])
text (0.5, 0.4, "Line 1\nLine 2")
@end group
@end example

Example 2 : text at multiple locations

@example
@group
text ([0.2, 0.2], [0.8, 0.6], "Same text at two locations")
text ([0.4, 0.4], [0.8, 0.6], @{"Point 1 Text", "Point 2 text"@})
text ([0.6, 0.6], [0.8, 0.6], @{@{"Point 1 Line 1", "Point 1 Line 2@},
                               "Point 2 text"@})
@end group
@end example

Example 2 : adjust appearance using text properties

@example
@group
ht = text (0.5, 0.5, "Hello World", "fontsize", 20);
set (ht, "color", "red");
@end group
@end example

Programming Notes: The full list of properties is documented at
@ref{Text Properties}.

Any numeric entries in a cell array will be converted to text using
@code{sprintf ("%g")}.  For more precise control of the appearance convert
any numeric entries to strings using @code{num2str}, @code{sprintf}, etc.,
before calling @code{text}.
@seealso{gtext, title, xlabel, ylabel, zlabel}
@end deftypefn
