# tensorprod

```octave
function C = tensorprod (A, B, varargin)
```

@deftypefn  {} {@var{C} =} tensorprod (@var{A}, @var{B}, @var{dimA}, @var{dimB})
@deftypefnx {} {@var{C} =} tensorprod (@var{A}, @var{B}, @var{dim})
@deftypefnx {} {@var{C} =} tensorprod (@var{A}, @var{B})
@deftypefnx {} {@var{C} =} tensorprod (@var{A}, @var{B}, "all")
@deftypefnx {} {@var{C} =} tensorprod (@var{A}, @var{B}, @dots{}, "NumDimensionsA", @var{value})
Compute the tensor product between numeric tensors @var{A} and @var{B}.

The dimensions of @var{A} and @var{B} that are contracted are defined by
@var{dimA} and @var{dimB}, respectively.  @var{dimA} and @var{dimB} are
scalars or equal length vectors that define the dimensions to match up.
The matched dimensions of @var{A} and @var{B} must have the same number of
elements.

When only @var{dim} is used, it is equivalent to
@code{@var{dimA} = @var{dimB} = @var{dim}}.

When no dimensions are specified, @code{@var{dimA} = @var{dimB} = []}.  This
computes the outer product between @var{A} and @var{B}.

Using the @qcode{"all"} option results in the inner product between @var{A}
and @var{B}.  This requires @code{size (@var{A}) == size (@var{B})}.

Use the property-value pair with the property name
@nospell{@qcode{"NumDimensionsA"}} when @var{A} has trailing singleton
dimensions that should be transferred to @var{C}.  The specified @var{value}
should be the total number of dimensions of @var{A}.

@sc{matlab} Compatibility: Octave does not currently support the
@qcode{"@var{property_name}=@var{value}"} syntax for the
@nospell{@qcode{"NumDimensionsA"}} parameter.

@seealso{kron, dot, mtimes}
@end deftypefn
