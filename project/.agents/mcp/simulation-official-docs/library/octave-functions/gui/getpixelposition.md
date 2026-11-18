# getpixelposition

```octave
function pos = getpixelposition (h, rel_to_fig = false)
```

@deftypefn  {} {@var{pos} =} getpixelposition (@var{h})
@deftypefnx {} {@var{pos} =} getpixelposition (@var{h}, @var{rel_to_fig})
Return the position of a user interface component in pixel units.

The first argument @var{h} must be a handle to a valid graphics object of
type uibuttongroup, uicontrol, uipanel, uitable, axes, or figure.  For other
object types, the function returns zeros.

By default, the position is returned relative to the object's parent.
If the second argument @var{rel_to_fig} is logically true, the position
is computed relative to the enclosing figure object.

The return value @var{pos} is a 4-element vector with values
@code{[lower_left_X, lower_left_Y, width, height]}.

@seealso{get}
@end deftypefn
