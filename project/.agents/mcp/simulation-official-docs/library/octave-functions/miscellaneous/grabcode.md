# grabcode

```octave
function code_str = grabcode (url)
```

@deftypefn  {} {} grabcode @var{filename}
@deftypefnx {} {} grabcode @var{url}
@deftypefnx {} {@var{code_str} =} grabcode (@dots{})

Grab the code from a report created by the @code{publish} function.

The grabbed code inside the published report must be enclosed by the
strings @samp{##### SOURCE BEGIN #####} and @samp{##### SOURCE END #####}.
The @code{publish} function creates this format automatically.

If no return value is requested the code is saved to a temporary file and
opened in the default editor.  NOTE: The temporary file must be saved to a
new filename or the code will be lost.

If an output is requested the grabbed code will be returned as string
@var{code_str}.

Example:

@example
@group
publish ("my_script.m");
grabcode ("html/my_script.html");
@end group
@end example

The example above publishes @file{my_script.m} to the default location
@file{html/my_script.html}.  Next, the published Octave script is grabbed to
edit its content in a new temporary file.

@seealso{publish}
@end deftypefn
