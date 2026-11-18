# treeplot

```octave
function treeplot (tree, node_style = "ko", edge_style = "r")
```

@deftypefn  {} {} treeplot (@var{tree})
@deftypefnx {} {} treeplot (@var{tree}, @var{node_style}, @var{edge_style})
Produce a graph of tree or forest.

The first argument is a row vector of parent indices.

The optional parameters @var{node_style} and @var{edge_style} define the
output plot style.

The complexity of the algorithm is O(n) in terms of time and memory
requirements.
@seealso{etreeplot, gplot}
@end deftypefn
