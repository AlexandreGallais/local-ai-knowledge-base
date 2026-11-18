# repelem

```octave
function retval = repelem (x, varargin)
```

@deftypefn  {} {@var{xxx} =} repelem (@var{x}, @var{R})
@deftypefnx {} {@var{xxx} =} repelem (@var{x}, @var{R_1}, @dots{}, @var{R_n})
Construct an array of repeated elements from @var{x} and repeat instructions
@var{R_1}, @enddots{}

@var{x} must be a scalar, vector, or N-dimensional array.

A repeat instruction @var{R_j} must either be a scalar or a vector.  If the
instruction is a scalar then each component of @var{x} in dimension @var{j}
is repeated @var{R_j} times.  If the instruction is a vector then it must
have the same number of elements as the corresponding dimension @var{j} of
@var{x}.  In this case, the @var{k}th component of dimension @var{j} is
repeated @code{@var{R_j}(@var{k})} times.

If @var{x} is a scalar or vector then @code{repelem} may be called with just
a single repeat instruction @var{R} and @code{repelem} will return a vector
with the same orientation as the input.

If @var{x} is a matrix then at least two @var{R_j}s must be specified.

Note: Using @code{repelem} with a vector @var{x} and a vector for @var{R_j}
is equivalent to Run Length Decoding.

Examples:

@example
@group
A = [1 2 3 4 5];
B = [2 1 0 1 2];
repelem (A, B)
  @xresult{}   1   1   2   4   5   5
@end group
@end example

@example
@group
A = magic (3)
  @xresult{} A =
       8   1   6
       3   5   7
       4   9   2
B1 = [1 2 3];
B2 = 2;
repelem (A, B1, B2)
  @xresult{}     8   8   1   1   6   6
         3   3   5   5   7   7
         3   3   5   5   7   7
         4   4   9   9   2   2
         4   4   9   9   2   2
         4   4   9   9   2   2
@end group
@end example

More @var{R_j} may be specified than the number of dimensions of @var{x}.
Any excess @var{R_j} must be scalars (because @var{x}'s size in those
dimensions is only 1), and @var{x} will be replicated in those dimensions
accordingly.

@example
@group
A = [1 2 3 4 5];
B1 = 2;
B2 = [2 1 3 0 2];
B3 = 3;
repelem (A, B1, B2, B3)
  @xresult{}    ans(:,:,1) =
           1   1   2   3   3   3   5   5
           1   1   2   3   3   3   5   5

        ans(:,:,2) =

           1   1   2   3   3   3   5   5
           1   1   2   3   3   3   5   5

        ans(:,:,3) =
           1   1   2   3   3   3   5   5
           1   1   2   3   3   3   5   5
@end group
@end example

@var{R_j} must be specified in order.  A placeholder of 1 may be used for
dimensions which do not need replication.

@example
@group
repelem ([-1, 0; 0, 1], 1, 2, 1, 2)
  @xresult{}  ans(:,:,1,1) =
        -1  -1   0   0
         0   0   1   1

      ans(:,:,1,2) =
        -1  -1   0   0
         0   0   1   1
@end group
@end example

If fewer @var{R_j} are given than the number of dimensions in @var{x},
@code{repelem} will assume @var{R_j} is 1 for those dimensions.

@example
A = cat (3, [-1 0; 0 1], [-1 0; 0 1])
  @xresult{}  ans(:,:,1) =
        -1   0
         0   1

      ans(:,:,2) =
        -1   0
         0   1

repelem (A,2,3)
  @xresult{}  ans(:,:,1) =
        -1  -1  -1   0   0   0
        -1  -1  -1   0   0   0
         0   0   0   1   1   1
         0   0   0   1   1   1

      ans(:,:,2) =
        -1  -1  -1   0   0   0
        -1  -1  -1   0   0   0
         0   0   0   1   1   1
         0   0   0   1   1   1
@end example

@code{repelem} preserves the class of @var{x}, and works with strings,
cell arrays, NA, and NAN inputs.  If any @var{R_j} is 0 the output will
be an empty array.

@example
@group
repelem ("Octave", 2, 3)
  @xresult{}    OOOccctttaaavvveee
        OOOccctttaaavvveee

repelem ([1 2 3; 1 2 3], 2, 0)
  @xresult{}    [](4x0)
@end group
@end example

@seealso{cat, kron, repmat}
@end deftypefn
