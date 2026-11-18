# zlabel

```octave
function h = zlabel (varargin)
```

@deftypefn  {} {} zlabel (@var{string})
@deftypefnx {} {} zlabel (@var{string}, @var{property}, @var{val}, @dots{})
@deftypefnx {} {} zlabel (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} zlabel (@dots{})
Specify the string used to label the z-axis of the current axis.

An optional list of @var{property}/@var{value} pairs can be used to change
the properties of the created text label.

The full list of text object properties is documented at
@ref{Text Properties}.

If the first argument @var{hax} is an axes handle, then operate on
this axes rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created text
object.
@seealso{xlabel, ylabel, datetick, title, text}
@end deftypefn
