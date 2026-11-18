# nthargout

```octave
function arg = nthargout (n, varargin)
```

@deftypefn  {} {@var{arg} =} nthargout (@var{n}, @var{fcn}, @dots{})
@deftypefnx {} {@var{arg} =} nthargout (@var{n}, @var{ntot}, @var{fcn}, @dots{})
Return the @var{n}th output argument of the function specified by the
function handle or string @var{fcn}.

Any additional arguments are passed directly to @var{fcn}.  The total
number of arguments to call @var{fcn} with can be passed in @var{ntot}; by
default @var{ntot} is @var{n}.  The input @var{n} can also be a vector of
indices of the output, in which case the output will be a cell array of the
requested output arguments.

The intended use of @code{nthargout} is to avoid intermediate variables.
For example, when finding the indices of the maximum entry of a matrix, the
following two compositions of @code{nthargout}

@example
@group
@var{m} = magic (5);
cell2mat (nthargout ([1, 2], @@ind2sub, size (@var{m}),
                     nthargout (2, @@max, @var{m}(:))))
@xresult{} 5   3
@end group
@end example

@noindent
are completely equivalent to the following lines:

@example
@group
@var{m} = magic (5);
[~, idx] = max (@var{M}(:));
[i, j] = ind2sub (size (@var{m}), idx);
[i, j]
@xresult{} 5   3
@end group
@end example

It can also be helpful to have all output arguments collected in a single
cell array as the following code demonstrates:

@example
@var{USV} = nthargout ([1:3], @@svd, hilb (5));
@end example

Programming Note: Equivalent functionality to the @code{nthargout} function
is frequently possible by using the character @samp{~} in code to ignore
outputs.  This functionality is implemented by the Octave interpreter and
is even more efficient than using this function.

Equivalent Code:

@example
@group
idx = nthargout (2, @@max, rand (100, 1));
@equiv{}
[~, idx] = max (rand (100, 1));
@end group
@end example

@seealso{nargin, nargout, varargin, varargout, isargout}
@end deftypefn
