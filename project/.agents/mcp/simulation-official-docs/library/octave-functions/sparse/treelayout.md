# treelayout

```octave
function [x, y, h, s] = treelayout (tree, permutation)
```

@deftypefn  {} {[@var{x}, @var{y}] =} treelayout (@var{tree})
@deftypefnx {} {[@var{x}, @var{y}] =} treelayout (@var{tree}, @var{permutation})
@deftypefnx {} {[@var{x}, @var{y}, @var{h}, @var{s}] =} treelayout (@dots{})
treelayout lays out a tree or a forest.

The first argument @var{tree} is a vector of predecessors.

The optional parameter @var{permutation} is a postorder permutation.

The complexity of the algorithm is O(n) in terms of time and memory
requirements.
@seealso{etreeplot, gplot, treeplot}
@end deftypefn
