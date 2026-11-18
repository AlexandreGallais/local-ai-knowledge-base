# printd

```octave
function pr_out = printd (obj, filename)
```

@deftypefn  {} {} printd (@var{obj}, @var{filename})
@deftypefnx {} {@var{out_file} =} printd (@dots{})

Convert any object acceptable to @code{disp} into the format selected by
the suffix of @var{filename}.

If the optional output @var{out_file} is requested, the name of the created
file is returned.

This function is intended to facilitate manipulation of the output of
functions such as @code{stemleaf}.
@seealso{stemleaf}
@end deftypefn
