# movmedian

```octave
function y = movmedian (x, wlen, varargin)
```

@deftypefn  {} {@var{y} =} movmedian (@var{x}, @var{wlen})
@deftypefnx {} {@var{y} =} movmedian (@var{x}, [@var{nb}, @var{na}])
@deftypefnx {} {@var{y} =} movmedian (@dots{}, @var{dim})
@deftypefnx {} {@var{y} =} movmedian (@dots{}, @var{nancond})
@deftypefnx {} {@var{y} =} movmedian (@dots{}, @var{property}, @var{value})
Calculate the moving median over a sliding window of length @var{wlen} on
data @var{x}.

The moving window length input @var{wlen} can either be a numeric scalar
or a 2-element numeric array @w{@code{[@var{nb}, @var{na}]}}.  The elements
included in the moving window depend on the size and value of @var{wlen}
as well as whether the @qcode{"SamplePoints"} option has been specified.
For full details of element inclusion,
@pxref{XREFmovslice,,@code{movslice}}.

If the optional argument @var{dim} is given, operate along this dimension.

The optional argument @var{nancond} is a string that controls how @code{NaN}
and @code{NA} values affect the output of @qcode{"movmedian"}.  The value
@qcode{"includenan"} (default) causes @code{NaN} and @code{NA} values to be
included in the moving window, and any window slice containing @code{NaN} or
@code{NA} values will return @code{NaN} for that element.  The value
@qcode{"omitnan"} causes @qcode{"movmedian"} to ignore any @code{NaN}
or @code{NA} values resulting in fewer elements being used to calculate the
median for that window slice.  If @qcode{"omitnan"} is specified and a
window slice contains all @code{NaN} or @code{NA} values,
@qcode{"movmedian"} returns @code{NaN} for that element.  The values
@qcode{"includemissing"} and @qcode{"omitmissing"} may be used
synonymously with @qcode{"includenan"} and @qcode{"omitnan"},
respectively.

The calculation can be controlled by specifying @var{property}/@var{value}
pairs.  Valid properties are @qcode{"Endpoints"} and
@qcode{"SamplePoints"}.  For full descriptions of these properties and
valid options, @pxref{XREFmovfun,,@code{movfun}}.

Programming Note: This function is a wrapper which calls @code{movfun}.
For full documentation of inputs and options,
@pxref{XREFmovfun,,@code{movfun}}.

@seealso{median, movfun, movslice, movmad, movmax, movmean, movmin,
movprod, movstd, movsum, movvar}
@end deftypefn
