# accumarray

```octave
function A = accumarray (subs, vals, sz = [], fcn = [], fillval = [], issparse = [])
```

@deftypefn  {} {@var{A} =} accumarray (@var{subs}, @var{vals})
@deftypefnx {} {@var{A} =} accumarray (@var{subs}, @var{vals}, @var{sz})
@deftypefnx {} {@var{A} =} accumarray (@var{subs}, @var{vals}, @var{sz}, @var{fcn})
@deftypefnx {} {@var{A} =} accumarray (@var{subs}, @var{vals}, @var{sz}, @var{fcn}, @var{fillval})
@deftypefnx {} {@var{A} =} accumarray (@var{subs}, @var{vals}, @var{sz}, @var{fcn}, @var{fillval}, @var{issparse})

Create an array by accumulating the elements of a vector into the
positions defined by their subscripts.

The subscripts are defined by the rows of the matrix @var{subs} and the
values by @var{vals}.  Each row of @var{subs} corresponds to one of the
values in @var{vals}.  If @var{vals} is a scalar, it will be used for each
of the row of @var{subs}.  If @var{subs} is a cell array of vectors, all
vectors must be of the same length, and the subscripts in the @var{k}th
vector must correspond to the @var{k}th dimension of the result.

The size of the matrix will be determined by the subscripts
themselves.  However, if @var{sz} is defined it determines the matrix
size.  The length of @var{sz} must correspond to the number of columns
in @var{subs}.  An exception is if @var{subs} has only one column, in
which case @var{sz} may be the dimensions of a vector and the
subscripts of @var{subs} are taken as the indices into it.

The default action of @code{accumarray} is to sum the elements with
the same subscripts.  This behavior can be modified by defining the
@var{fcn} function.  This should be a function or function handle
that accepts a column vector and returns a scalar.  The result of the
function should not depend on the order of the subscripts.

The elements of the returned array that have no subscripts associated
with them are set to zero.  Defining @var{fillval} to some other value
allows these values to be defined.  This behavior changes, however,
for certain values of @var{fcn}.  If @var{fcn} is @code{@@min}
(respectively, @code{@@max}) then the result will be filled with the
minimum (respectively, maximum) integer if @var{vals} is of integral
type, logical false (respectively, logical true) if @var{vals} is of
logical type, zero if @var{fillval} is zero and all values are
non-positive (respectively, non-negative), and NaN otherwise.

By default @code{accumarray} returns a full matrix.  If
@var{issparse} is logically true, then a sparse matrix is returned
instead.

The following @code{accumarray} example constructs a frequency table
that in the first column counts how many occurrences each number in
the second column has, taken from the vector @var{x}.  Note the usage
of @code{unique}  for assigning to all repeated elements of @var{x}
the same index (@pxref{XREFunique,,@code{unique}}).

@example
@group
@var{x} = [91, 92, 90, 92, 90, 89, 91, 89, 90, 100, 100, 100];
[@var{u}, ~, @var{j}] = unique (@var{x});
[accumarray(@var{j}', 1), @var{u}']
  @xresult{}  2    89
      3    90
      2    91
      2    92
      3   100
@end group
@end example

Another example, where the result is a multi-dimensional 3-D array and
the default value (zero) appears in the output:

@example
@group
accumarray ([1, 1, 1;
             2, 1, 2;
             2, 3, 2;
             2, 1, 2;
             2, 3, 2], 101:105)
@xresult{} ans(:,:,1) = [101, 0, 0; 0, 0, 0]
@xresult{} ans(:,:,2) = [0, 0, 0; 206, 0, 208]
@end group
@end example

The sparse option can be used as an alternative to the @code{sparse}
constructor (@pxref{XREFsparse,,@code{sparse}}).  Thus

@example
sparse (@var{i}, @var{j}, @var{sv})
@end example

@noindent
can be written with @code{accumarray} as

@example
accumarray ([@var{i}, @var{j}], @var{sv}', [], [], 0, true)
@end example

@noindent
For repeated indices, @code{sparse} adds the corresponding value.  To
take the minimum instead, use @code{min} as an accumulator function:

@example
accumarray ([@var{i}, @var{j}], @var{sv}', [], @@min, 0, true)
@end example

The complexity of accumarray in general for the non-sparse case is
generally O(M+N), where N is the number of subscripts and M is the
maximum subscript (linearized in multi-dimensional case).  If
@var{fcn} is one of @code{@@sum} (default), @code{@@max},
@code{@@min} or @code{@@(x) @{x@}}, an optimized code path is used.
Note that for general reduction function the interpreter overhead can
play a major part and it may be more efficient to do multiple
accumarray calls and compute the results in a vectorized manner.

@seealso{accumdim, unique, sparse}
@end deftypefn
