# findall

```octave
function h = findall (varargin)
```

@deftypefn  {} {@var{h} =} findall ()
@deftypefnx {} {@var{h} =} findall (@var{prop_name}, @var{prop_value}, @dots{})
@deftypefnx {} {@var{h} =} findall (@var{prop_name}, @var{prop_value}, "-@var{logical_op}", @var{prop_name}, @var{prop_value})
@deftypefnx {} {@var{h} =} findall ("-property", @var{prop_name})
@deftypefnx {} {@var{h} =} findall ("-regexp", @var{prop_name}, @var{pattern})
@deftypefnx {} {@var{h} =} findall (@var{hlist}, @dots{})
@deftypefnx {} {@var{h} =} findall (@var{hlist}, "flat", @dots{})
@deftypefnx {} {@var{h} =} findall (@var{hlist}, "-depth", @var{d}, @dots{})
Find graphics object, including hidden ones, with specified properties.

The return value @var{h} is a list of handles to the found graphic objects.

@code{findall} performs the same search as @code{findobj}, but it
includes hidden objects (HandleVisibility = @qcode{"off"}).  For full
documentation, @pxref{XREFfindobj,,@code{findobj}}.
@seealso{findobj, allchild, get, set}
@end deftypefn
