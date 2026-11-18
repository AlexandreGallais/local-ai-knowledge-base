# runlength

```octave
function [count, value] = runlength (x)
```

@deftypefn  {} {count =} runlength (@var{x})
@deftypefnx {} {[count, value] =} runlength (@var{x})
Find the lengths of all sequences of common values.

@var{count} is a vector with the lengths of each repeated value.

The optional output @var{value} contains the value that was repeated in
the sequence.

@example
@group
runlength ([2, 2, 0, 4, 4, 4, 0, 1, 1, 1, 1])
@xresult{}   2   1   3   1   4
@end group
@end example
@seealso{run_count}
@end deftypefn
