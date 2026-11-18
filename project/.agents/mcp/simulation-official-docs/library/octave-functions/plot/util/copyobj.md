# copyobj

```octave
function hnew = copyobj (horig, hparent = 0)
```

@deftypefn  {} {@var{hnew} =} copyobj (@var{horig})
@deftypefnx {} {@var{hnew} =} copyobj (@var{horig}, @var{hparent})
Construct a copy of the graphic objects associated with the handles
@var{horig} and return new handles @var{hnew} to the new objects.

If a parent handle @var{hparent} (root, figure, axes, or hggroup) is
specified, the copied object will be created as a child of @var{hparent}.

If @var{horig} is a vector of handles, and @var{hparent} is a scalar,
then each handle in the vector @var{hnew} has its @qcode{"Parent"} property
set to @var{hparent}.  Conversely, if @var{horig} is a scalar and
@var{hparent} a vector, then each parent object will receive a copy of
@var{horig}.  If @var{horig} and @var{hparent} are both vectors with the
same number of elements then @code{@var{hnew}(i)} will have parent
@code{@var{hparent}(i)}.
@seealso{struct2hdl, hdl2struct, findobj}
@end deftypefn
