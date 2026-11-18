# untabify

```octave
function str = untabify (t, tw = 8, deblank_arg = false)
```

@deftypefn  {} {@var{str} =} untabify (@var{t})
@deftypefnx {} {@var{str} =} untabify (@var{t}, @var{tw})
@deftypefnx {} {@var{str} =} untabify (@var{t}, @var{tw}, @var{deblank})
Replace TAB characters in @var{t} with spaces.

The input, @var{t}, may be either a 2-D character array, or a cell array of
character strings.  The output is the same class as the input.

The tab width is specified by @var{tw}, and defaults to eight.

If the optional argument @var{deblank} is true, then the spaces will be
removed from the end of the character data.

The following example reads a file and writes an untabified version of the
same file with trailing spaces stripped.

@example
@group
fid = fopen ("tabbed_script.m");
text = char (fread (fid, "uchar")');
fclose (fid);
fid = fopen ("untabified_script.m", "w");
text = untabify (strsplit (text, "\n"), 8, true);
fprintf (fid, "%s\n", text@{:@});
fclose (fid);
@end group
@end example

@seealso{strjust, strsplit, deblank}
@end deftypefn
