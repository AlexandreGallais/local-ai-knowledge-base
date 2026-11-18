# __unimplemented__

```octave
function txt = __unimplemented__ (fcn)
```

@deftypefn {} {@var{txt} =} __unimplemented__ (@var{fcn})
Return specific help text for the unimplemented function @var{fcn}.

This is usually a suggestion for an existing compatible function to use in
place of @var{fcn}.

This function is not called by users, but by the Octave interpreter when it
fails to recognize an input string as a valid function name.  See
@code{missing_function_hook} for using a different handler for this event.
@seealso{missing_function_hook}
@end deftypefn
