# edit

```octave
function retval = edit (varargin)
```

@deftypefn  {} {} edit @var{name}
@deftypefnx {} {} edit @var{field} @var{value}
@deftypefnx {} {@var{value} =} edit ("get", @var{field})
@deftypefnx {} {@var{value} =} edit ("get", "all")
Edit the named function, or change editor settings.

If @code{edit} is called with the name of a file or function as its
argument it will be opened in the default text editor.  The default editor
for the Octave GUI is specified in the Editor tab of Preferences.  The
default editor for the CLI is specified by the @code{EDITOR} function.

@itemize @bullet
@item
If the function @var{name} is available in a file on your path, then it
will be opened in the editor.  If no file is found, then the m-file
variant, ending with @qcode{".m"}, will be considered.  If still no file is
found, then variants with a leading @qcode{"@@"} and then with both a
leading @qcode{"@@"} and trailing @qcode{".m"} will be considered.

@item
If @var{name} is the name of a command-line function, then an m-file will
be created to contain that function along with its current definition.

@item
If @code{@var{name}.cc} is specified, then it will search for
@file{@var{name}.cc} in the path and open it in the editor.  If the file is
not found, then a new @file{.cc} file will be created.  If @var{name}
happens to be an m-file or command-line function, then the text of that
function will be inserted into the .cc file as a comment.

@item
If @file{@var{name}.ext} is on your path then it will be edited, otherwise
the editor will be started with @file{@var{name}.ext} in the current
directory as the filename.

@strong{Warning:} You may need to clear @var{name} before the new definition
is available.  If you are editing a .cc file, you will need to execute
@code{mkoctfile @file{@var{name}.cc}} before the definition will be
available.
@end itemize

If @code{edit} is called with @var{field} and @var{value} variables, the
value of the control field @var{field} will be set to @var{value}.

If an output argument is requested and the first input argument is
@code{get} then @code{edit} will return the value of the control field
@var{field}.  If the control field does not exist, edit will return a
structure containing all fields and values.  Thus, @code{edit ("get",
@qcode{"all"})} returns a complete control structure.

The following control fields are used:

@table @samp
@item author
This is the name to put after the "## Author:" field of new functions.  By
default it guesses from the @code{gecos} field of the password database.

@item email
This is the e-mail address to list after the name in the author field.  By
default it guesses @code{<$LOGNAME@@$HOSTNAME>}, and if @code{$HOSTNAME}
is not defined it uses @code{uname -n}.  You probably want to override
this.  Be sure to use the format @code{@email{user@@host}}.

@item license

@table @samp
@item gpl
GNU General Public License (default).

@item bsd
BSD-style license without advertising clause.

@item pd
Public domain.

@item "text"
Your own default copyright and license.
@end table

Unless you specify @samp{pd}, edit will prepend the copyright statement
with "Copyright (C) YYYY Author".

@item mode
This value determines whether the editor should be started in async mode
(editor is started in the background and Octave continues) or sync mode
(Octave waits until the editor exits).  Set it to @qcode{"sync"} to start
the editor in sync mode.  The default is @qcode{"async"}
(@pxref{XREFsystem,,@code{system}}).

@item editinplace
Determines whether files should be edited in place, without regard to
whether they are modifiable or not.  The default is @code{true}.
Set it to @code{false} to have read-only function files automatically
copied to @samp{home}, if it exists, when editing them.

@item home
This value indicates a directory that system m-files should be copied into
before opening them in the editor.  The intent is that this directory is
also in the path, so that the edited copy of a system function file shadows
the original.  This setting only has an effect when @samp{editinplace} is
set to @code{false}.  The default is the empty matrix (@code{[]}), which
means it is not used.  The default in previous versions of Octave was
@file{~/octave}.
@end table
@seealso{EDITOR, path}
@end deftypefn
