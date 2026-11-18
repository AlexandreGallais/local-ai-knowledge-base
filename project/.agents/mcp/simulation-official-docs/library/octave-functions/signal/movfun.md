# movfun

```octave
function y = movfun (fcn, x, wlen, varargin)
```

@deftypefn  {} {@var{y} =} movfun (@var{fcn}, @var{x}, @var{wlen})
@deftypefnx {} {@var{y} =} movfun (@var{fcn}, @var{x}, [@var{nb}, @var{na}])
@deftypefnx {} {@var{y} =} movfun (@dots{}, "@var{property}", @var{value})

Apply function @var{fcn} to a moving window of length @var{wlen} on data
@var{x}.

The moving window length input @var{wlen} can either be a numeric scalar
or a 2-element numeric array @w{@code{[@var{nb}, @var{na}]}}.  The elements
included in the moving window depend on the size and value of @var{wlen}
as well as whether the @qcode{"SamplePoints"} option has been specified.
For full details of element inclusion,
@pxref{XREFmovslice,,@code{movslice}}.

During calculations the data input @var{x} is reshaped into a 2-dimensional
@var{wlen}-by-@var{N} matrix and @var{fcn} is called on this new matrix.
Therefore, @var{fcn} must accept an array input argument and apply the
computation along dimension 1, i.e., down the columns of the array.

When applied to an array (possibly multi-dimensional) with @var{n} columns,
@var{fcn} may return a result in either of two formats: @w{Format 1)}@ an
array of size 1-by-@var{n}-by-@var{dim3}-by-@dots{}-by-@var{dimN}.  This
is the typical output format from Octave core functions.  Type
@code{demo ("movfun", 5)} for an example of this use case.
@w{Format 2)}@ a row vector of length
@code{@var{n} * @var{numel_higher_dims}} where @var{numel_higher_dims} is
@w{@code{prod (size (@var{x})(3:end))}}.  The output of @var{fcn} for the
i-th input column must be found in the output at indices
@w{@code{i:@var{n}:(@var{n}*@var{numel_higher_dims})}}.
This format is useful when concatenating functions into arrays, or when
using @code{nthargout}.  Type @code{demo ("movfun", 6)} for an example of
this case.

The calculation can be controlled by specifying @var{property}/@var{value}
pairs.  Valid properties are

@table @asis

@item @qcode{"dim"}
Operate along the dimension specified, rather than the default of the first
non-singleton dimension.

@item @qcode{"SamplePoints"}

This property specifies a sorted, numeric vector of unique coordinate
positions of the data points in @var{x}.  The default value is the vector
@w{@code{[1 : @var{numel (x)}]}}.  When a non-default SamplePoints vector
is specified, the moving window length @var{wlen} is measured
against the SamplePoints positions to determine which points are
included in each window slice.  SamplePoints need not be uniformly spaced.
This can result in window slices containing different numbers of points.

@item @qcode{"Endpoints"}

This property controls how results are calculated at the boundaries
(@w{endpoints}) of the window.  Possible values are:

@table @asis
@item @qcode{"shrink"} (default)
The window is truncated at the beginning and end of the array to exclude
elements for which there is no source data.  For example, with a window of
length 3, @code{@var{y}(1) = @var{fcn} (@var{x}(1:2))}, and
@code{@var{y}(end) = @var{fcn} (@var{x}(end-1:end))}.

@item @qcode{"discard"}
Any @var{y} values that use a window extending beyond the original
data array are deleted.  For example, with a 10-element data vector and a
window of length 3, the output will contain only 8 elements.  The first
element would require calculating the function over indices
@w{@code{[0, 1, 2]}}@ and is therefore discarded.  The last element would
require calculating the function over indices @w{@code{[9, 10, 11]}}@ and is
therefore discarded.

@item @qcode{"fill"}
Any window elements outside the data array are replaced by @code{NaN}.  For
example, with a window of length 3,
@code{@var{y}(1) = @var{fcn} ([NaN, @var{x}(1:2)])}, and
@code{@var{y}(end) = @var{fcn} ([@var{x}(end-1:end), NaN])}.
This option usually results in @var{y} having @code{NaN} values at the
boundaries, although it is influenced by how @var{fcn} handles @code{NaN},
and also by the property @qcode{"nancond"}.

@item @var{user_value}
Any window elements outside the data array are replaced by the specified
value @var{user_value} which must be a numeric scalar.  For example, with a
window of length 3,
@code{@var{y}(1) = @var{fcn} ([@var{user_value}, @var{x}(1:2)])}, and
@code{@var{y}(end) = @var{fcn} ([@var{x}(end-1:end), @var{user_value}])}.
A common choice for @var{user_value} is 0.

@item @qcode{"same"}
Any window elements outside the data array are replaced by the value of
@var{x} at the boundary.  For example, with a window of length 3,
@code{@var{y}(1) = @var{fcn} ([@var{x}(1), @var{x}(1:2)])}, and
@code{@var{y}(end) = @var{fcn} ([@var{x}(end-1:end), @var{x}(end)])}.

@item @qcode{"periodic"}
The window is wrapped so that any missing data elements are taken from
the other side of the data.  For example, with a window of length 3,
@code{@var{y}(1) = @var{fcn} ([@var{x}(end), @var{x}(1:2)])}, and
@code{@var{y}(end) = @var{fcn} ([@var{x}(end-1:end), @var{x}(1)])}.

@end table

Note 1: For non-uniform SamplePoint spacing, the only permitted value for
@qcode{"EndPoints"} is @qcode{"shrink"}.

Note 2: For some @qcode{"Endpoints"} options, the window size at the
boundaries may not be the same as for the central part, and @var{fcn} must
work in these cases.

@item @qcode{"nancond"}
Controls haw @code{NaN} and @code{NA} values affect the output of
@qcode{"movfun"}.  The value @qcode{"includenan"} (default) causes
@code{NaN} and @code{NA} values to be included in the moving window, and any
window slice containing @code{NaN} or @code{NA} values will return
@code{NaN} for that element.  The value @qcode{"omitnan"} causes
@qcode{"movfun"} to ignore any @code{NaN} or @code{NA} values resulting
in fewer elements being used to calculate the result for that window
slice.  If @qcode{"omitnan"} is specified and a window slice contains all
@code{NaN} or @code{NA} values, @qcode{"movfun"} returns the value
specified by the @qcode{"nanval"} property for that element.  The values
@qcode{"includemissing"} and @qcode{"omitmissing"} may be used
synonymously with @qcode{"includenan"} and @qcode{"omitnan"},
respectively.

@item @qcode{"nanval"}
Specifies the value to return when @qcode{"nancond"} is set to
@qcode{"omitnan"} or @qcode{"omitmissing"} and all elements in a window
are @code{NaN} or @code{NA}.  @qcode{"nanval"} must be a numeric scalar
value or @code{NaN} (default).

@item @qcode{"outdim"}
A row vector that selects which dimensions of the calculation will appear
in the output @var{y}.  This is only useful when @var{fcn} returns an
N-dimensional array in @w{Format 1}.  The default is to return all output
dimensions.

@end table

Programming Note: The property @qcode{"outdim"} can be used to save memory
when the output of @var{fcn} has many dimensions, or when a wrapper to the
base function that selects the desired outputs is too costly.  When memory
is not an issue, the easiest way to select output dimensions is to first
calculate the complete result with @code{movfun} and then filter that
result with indexing.  If code complexity is not an issue then a wrapper
can be created using anonymous functions.  For example, if @code{basefcn}
is a function returning a @var{K}-dimensional row output, and only
dimension @var{D} is desired, then the following wrapper could be used.

@example
@group
@var{fcn} = @@(x) basefcn (x)(:,columns(x) * (@var{D}-1) + (1:columns(x)));
@var{y} = movfun (@@fcn, @dots{});
@end group
@end example

@seealso{movslice, prepad, postpad, permute, reshape}
@end deftypefn
