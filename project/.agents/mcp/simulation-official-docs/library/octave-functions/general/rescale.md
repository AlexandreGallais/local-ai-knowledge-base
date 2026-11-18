# rescale

```octave
function B = rescale (A, varargin)
```

@deftypefn  {} {@var{B} =} rescale (@var{A})
@deftypefnx {} {@var{B} =} rescale (@var{A}, @var{l}, @var{u})
@deftypefnx {} {@var{B} =} rescale (@dots{}, "inputmin", @var{inmin})
@deftypefnx {} {@var{B} =} rescale (@dots{}, "inputmax", @var{inmax})
Scale matrix elements to a specified range of values.

When called with a single matrix argument @var{A}, rescale elements to
occupy the interval [0, 1].

The optional inputs @code{[@var{l}, @var{u}]} will scale @var{A} to the
interval with lower bound @var{l} and upper bound @var{u}.

The optional input @qcode{"inputmin"} replaces all elements less than
the specified value @var{inmin} with @var{inmin}.  Similarly, the optional
input @qcode{"inputmax"} replaces all elements greater than the specified
value @var{inmax} with @var{inmax}.  If unspecified the minimum and maximum
are taken from the data itself (@w{@code{@var{inmin} = min (A(:))}}@ and
@w{@code{@var{inmax} = max (A(:))}}).

Programming Notes:
The applied formula is
@tex
$$B = l + {A - inmin \over inmax - inmin} \cdot (u - l)$$
@end tex
@ifnottex
@var{B} = @var{l} + ((@var{A} - @var{inmin}) ./ (@var{inmax} - @var{inmin}))
.* (@var{u} - @var{l})
@end ifnottex

The class of the output matrix @var{B} is single if the input @var{A} is
single, but otherwise is of class double for inputs which are of double,
integer, or logical type.

@seealso{bounds, min, max}
@end deftypefn
