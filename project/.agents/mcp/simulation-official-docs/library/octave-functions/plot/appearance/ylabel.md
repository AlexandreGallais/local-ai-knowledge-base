# ylabel

```octave
function h = ylabel (varargin)
```

@deftypefn  {} {} ylabel (@var{string})
@deftypefnx {} {} ylabel (@var{string}, @var{property}, @var{val}, @dots{})
@deftypefnx {} {} ylabel (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} ylabel (@dots{})
Specify the string used to label the y-axis of the current axis.

If @var{hax} is specified then label the axis defined by @var{hax}.

An optional list of @var{property}/@var{value} pairs can be used to change
the properties of the created text label.

The full list of text object properties is documented at
@ref{Text Properties}.

If the first argument @var{hax} is an axes handle, then operate on
this axes rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created text
object.
@seealso{xlabel, zlabel, datetick, title, text}
@end deftypefn
