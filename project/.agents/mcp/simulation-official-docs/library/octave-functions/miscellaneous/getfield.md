# getfield

```octave
function val = getfield (s, varargin)
```

@deftypefn  {} {@var{val} =} getfield (@var{s}, @var{field})
@deftypefnx {} {@var{val} =} getfield (@var{s}, @var{sidx1}, @var{field1}, @var{fidx1}, @dots{})
Get the value of the field named @var{field} from a structure or nested
structure @var{s}.

If @var{s} is a structure array then @var{sidx} selects an element of the
structure array, @var{field} specifies the field name of the selected
element, and @var{fidx} selects which element of the field (in the case of
an array or cell array).  For a more complete description of the syntax,
@pxref{XREFsetfield,,@code{setfield}}.

@seealso{setfield, rmfield, orderfields, isfield, fieldnames, isstruct,
struct}
@end deftypefn
