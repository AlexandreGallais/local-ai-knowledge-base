# structfun

```octave
function varargout = structfun (fcn, S, varargin)
```

@deftypefn  {} {@var{A} =} structfun (@var{fcn}, @var{S})
@deftypefnx {} {@var{A} =} structfun (@dots{}, "ErrorHandler", @var{errfcn})
@deftypefnx {} {@var{A} =} structfun (@dots{}, "UniformOutput", @var{val})
@deftypefnx {} {[@var{A}, @var{B}, @dots{}] =} structfun (@dots{})

Evaluate the function named @var{name} on the fields of the structure
@var{S}.  The fields of @var{S} are passed to the function @var{fcn}
individually.

@code{structfun} accepts an arbitrary function @var{fcn} in the form of an
inline function, function handle, or the name of a function (in a character
string).  In the case of a character string argument, the function must
accept a single argument named @var{x}, and it must return a string value.
If the function returns more than one argument, they are returned as
separate output variables.

If the parameter @qcode{"UniformOutput"} is set to true (the default), then
the function must return a single element which will be concatenated into
the return value.  If @qcode{"UniformOutput"} is false, the outputs are
placed into a structure with the same fieldnames as the input structure.

@example
@group
s.name1 = "John Smith";
s.name2 = "Jill Jones";
structfun (@@(x) regexp (x, '(\w+)$', "matches")@{1@}, s,
           "UniformOutput", false)
  @xresult{} scalar structure containing the fields:
       name1 = Smith
       name2 = Jones
@end group
@end example

Given the parameter @qcode{"ErrorHandler"}, @var{errfcn} defines a function
to call in case @var{fcn} generates an error.  The form of the function is

@example
function [@dots{}] = errfcn (@var{se}, @dots{})
@end example

@noindent
where there is an additional input argument to @var{errfcn} relative to
@var{fcn}, given by @nospell{@var{se}}.  This is a structure with the
elements @qcode{"identifier"}, @qcode{"message"} and @qcode{"index"},
giving respectively the error identifier, the error message, and the index
into the input arguments of the element that caused the error.  For an
example on how to use an error handler, @pxref{XREFcellfun,,@code{cellfun}}.

@seealso{cellfun, arrayfun, spfun}
@end deftypefn
