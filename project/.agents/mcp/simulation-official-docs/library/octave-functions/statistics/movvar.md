# movvar

```octave
function y = movvar (x, wlen, varargin)
```

@deftypefn  {} {@var{y} =} movvar (@var{x}, @var{wlen})
@deftypefnx {} {@var{y} =} movvar (@var{x}, [@var{nb}, @var{na}])
@deftypefnx {} {@var{y} =} movvar (@dots{}, @var{opt})
@deftypefnx {} {@var{y} =} movvar (@dots{}, @var{opt}, @var{dim})
@deftypefnx {} {@var{y} =} movvar (@dots{}, @var{nancond})
@deftypefnx {} {@var{y} =} movvar (@dots{}, @var{property}, @var{value})
Calculate the moving variance over a sliding window of length @var{wlen} on
data @var{x}.


The moving window length input @var{wlen} can either be a numeric scalar
or a 2-element numeric array @w{@code{[@var{nb}, @var{na}]}}.  The elements
included in the moving window depend on the size and value of @var{wlen}
as well as whether the @qcode{"SamplePoints"} option has been specified.
For full details of element inclusion,
@pxref{XREFmovslice,,@code{movslice}}.

The optional argument @var{opt} determines the type of normalization to use.
Valid values are:

@table @asis
@item 0:
  normalize with @math{N-1}, provides the best unbiased estimator of the
variance [default]

@item 1:
  normalizes with @math{N}, this provides the second moment around the mean
@end table

If the optional argument @var{dim} is given, operate along this dimension.
The normalization argument @var{opt} must be given before the dimension.
To use the default value for @var{opt} you may pass an empty input
argument @code{[]}.

The optional argument @var{nancond} is a string that controls how @code{NaN}
and @code{NA} values affect the output of @qcode{"movvar"}.  The value
@qcode{"includenan"} (default) causes @code{NaN} and @code{NA} values to be
included in the moving window, and any window slice containing @code{NaN} or
@code{NA} values will return @code{NaN} for that element.  The value
@qcode{"omitnan"} causes @qcode{"movvar"} to ignore any @code{NaN}
or @code{NA} values resulting in fewer elements being used to calculate the
variance for that window slice.  If @qcode{"omitnan"} is specified and a
window slice contains all @code{NaN} or @code{NA} values, @qcode{"movvar"}
returns @code{NaN} for that element.  The values @qcode{"includemissing"}
and @qcode{"omitmissing"} may be used synonymously with
@qcode{"includenan"} and @qcode{"omitnan"}, respectively.

The calculation can be controlled by specifying @var{property}/@var{value}
pairs.  Valid properties are @qcode{"Endpoints"} and
@qcode{"SamplePoints"}.  For full descriptions of these properties and
valid options, @pxref{XREFmovfun,,@code{movfun}}.

Programming Note: This function is a wrapper which calls @code{movfun}.
For full documentation of inputs and options,
@pxref{XREFmovfun,,@code{movfun}}.

@seealso{var, movfun, movslice, movmad, movmax, movmean, movmedian, movmin,
movprod, movstd, movsum}
@end deftypefn
