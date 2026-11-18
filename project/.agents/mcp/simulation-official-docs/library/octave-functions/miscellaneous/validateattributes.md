# validateattributes

```octave
function validateattributes (A, cls, attr, varargin)
```

@deftypefn  {} {} validateattributes (@var{A}, @var{classes}, @var{attributes})
@deftypefnx {} {} validateattributes (@var{A}, @var{classes}, @var{attributes}, @var{arg_idx})
@deftypefnx {} {} validateattributes (@var{A}, @var{classes}, @var{attributes}, @var{func_name})
@deftypefnx {} {} validateattributes (@var{A}, @var{classes}, @var{attributes}, @var{func_name}, @var{arg_name})
@deftypefnx {} {} validateattributes (@var{A}, @var{classes}, @var{attributes}, @var{func_name}, @var{arg_name}, @var{arg_idx})
Check validity of input argument.

Confirms that the argument @var{A} is valid by belonging to one of
@var{classes}, and holding all of the @var{attributes}.  If it does not,
an error is thrown, with a message formatted accordingly.  The error
message can be made further complete by the function name @var{fun_name},
the argument name @var{arg_name}, and its position in the input
@var{arg_idx}.

@var{classes} must be a cell array of strings (an empty cell array is
allowed) with the name of classes (remember that a class name is case
sensitive).  In addition to the class name, the following categories
names are also valid:

@table @asis
@item @qcode{"float"}
Floating point value comprising classes @qcode{"double"} and
@qcode{"single"}.

@item @qcode{"integer"}
Integer value comprising classes (u)int8, (u)int16, (u)int32, (u)int64.

@item @qcode{"numeric"}
Numeric value comprising either a floating point or integer value.

@end table

@var{attributes} must be a cell array with names of checks for @var{A}.
Some of them require an additional value to be supplied right after the
name (see details for each below).

@table @asis
@item @qcode{"<="}
All values are less than or equal to the following value in
@var{attributes}.

@item @qcode{"<"}
All values are less than the following value in @var{attributes}.

@item @qcode{">="}
All values are greater than or equal to the following value in
@var{attributes}.

@item @qcode{">"}
All values are greater than the following value in @var{attributes}.

@item @qcode{"2d"}
A 2-dimensional matrix.  Note that vectors and empty matrices have
2 dimensions, one of them being of length 1, or both length 0.

@item @qcode{"3d"}
Has no more than 3 dimensions.  A 2-dimensional matrix is a 3-D matrix
whose 3rd dimension is of length 1.

@item @qcode{"binary"}
All values are either 1 or 0.

@item @qcode{"column"}
Values are arranged in a single column.

@item @qcode{"decreasing"}
No value is @var{NaN}, and each is less than the preceding one.

@item @qcode{"diag"}
Value is a diagonal matrix.

@item @qcode{"even"}
All values are even numbers.

@item @qcode{"finite"}
All values are finite.

@item @qcode{"increasing"}
No value is @var{NaN}, and each is greater than the preceding one.

@item @qcode{"integer"}
All values are integer.  This is different than using @code{isinteger}
which only checks its an integer type.  This checks that each value in
@var{A} is an integer value, i.e., it has no decimal part.

@item @qcode{"ncols"}
Has exactly as many columns as the next value in @var{attributes}.

@item @qcode{"ndims"}
Has exactly as many dimensions as the next value in @var{attributes}.

@item @qcode{"nondecreasing"}
No value is @var{NaN}, and each is greater than or equal to the preceding
one.

@item @qcode{"nonempty"}
It is not empty.

@item @qcode{"nonincreasing"}
No value is @var{NaN}, and each is less than or equal to the preceding one.

@item @qcode{"nonnan"}
No value is a @code{NaN}.

@item @nospell{@qcode{"nonnegative"}}
All values are non negative.

@item @qcode{"nonsparse"}
It is not a sparse matrix.

@item @qcode{"nonzero"}
No value is zero.

@item @qcode{"nrows"}
Has exactly as many rows as the next value in @var{attributes}.

@item @qcode{"numel"}
Has exactly as many elements as the next value in @var{attributes}.

@item @qcode{"odd"}
All values are odd numbers.

@item @qcode{"positive"}
All values are positive.

@item @qcode{"real"}
It is a non-complex matrix.

@item @qcode{"row"}
Values are arranged in a single row.

@item @qcode{"scalar"}
It is a scalar.

@item @qcode{"size"}
Its size has length equal to the values of the next in @var{attributes}.
The next value must is an array with the length for each dimension.  To
ignore the check for a certain dimension, the value of @code{NaN} can be
used.

@item @qcode{"square"}
Is a square matrix.

@item @qcode{"vector"}
Values are arranged in a single vector (column or vector).

@end table

@seealso{isa, validatestring, inputParser}
@end deftypefn
