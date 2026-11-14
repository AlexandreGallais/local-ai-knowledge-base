---
title: "tkinter --- Python interface to Tcl/Tk (part 2 of 17)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter --- Python interface to Tcl/Tk (part 2 of 17)

## Tkinter life preserver

This section is not designed to be an exhaustive tutorial on either Tk or
Tkinter.  For that, refer to one of the external resources noted earlier.
Instead, this section provides a very quick orientation to what a Tkinter
application looks like, identifies foundational Tk concepts, and
explains how the Tkinter wrapper is structured.

The remainder of this section will help you to identify the classes,
methods, and options you'll need in your Tkinter application, and where to
find more detailed documentation on them, including in the official Tcl/Tk
reference manual.

### A Hello World program

We'll start by walking through a "Hello World" application in Tkinter. This
isn't the smallest one we could write, but has enough to illustrate some
key <example-value> you'll need to know.

```
from tkinter import *
from tkinter import ttk
root = Tk()
frm = ttk.Frame(root, padding=10)
frm.grid()
ttk.Label(frm, text="Hello World!").grid(column=0, row=0)
ttk.Button(frm, text="Quit", command=root.destroy).grid(column=1, row=0)
root.mainloop()
```

After the imports, the next line creates an instance of the `Tk` class,
which initializes Tk and creates its associated Tcl interpreter. It also
creates a toplevel window, known as the root window, which serves as the main
window of the application.

The following line creates a frame widget, which in this case will contain
a label and a button we'll create next. The frame is fit inside the root
window.

The next line creates a label widget holding a static text string.
The `grid()` method is used to specify the relative layout (position)
of the label within its containing frame widget, similar to how tables in HTML
work.

A button widget is then created, and placed to the right of the label.
When pressed, it will call the `destroy()` method of the root window.

Finally, the `mainloop()` method puts everything on the display, and
responds to user input until the program terminates.

### Important Tk concepts

Even this simple program illustrates the following key Tk concepts:

widgets
A Tkinter user interface is made up of individual *widgets*. Each widget is
represented as a Python object, instantiated from classes like
`ttk.Frame`, `ttk.Label`, and `ttk.Button`.

widget hierarchy
Widgets are arranged in a *hierarchy*. The label and button were contained
within a frame, which in turn was contained within the root window. When
creating each *child* widget, its *parent* widget is passed as the first
argument to the widget constructor.

configuration options
Widgets have *configuration options*, which modify their appearance and
behavior, such as the text to display in a label or button. Different
classes of widgets will have different sets of options.

geometry management
Widgets aren't automatically added to the user interface when they are
created. A *geometry manager* like `grid` controls where in the
user interface they are placed.

event loop
Tkinter reacts to user input, changes from your program, and even refreshes
the display only when actively running an *event loop*. If your program
isn't running the event loop, your user interface won't update.

### Understanding how Tkinter wraps Tcl/Tk

When your application uses Tkinter's classes and methods, internally Tkinter
is assembling strings representing Tcl/Tk commands, and executing those
commands in the Tcl interpreter attached to your application's `Tk`
instance.

Whether it's trying to navigate reference documentation, trying to find
the right method or option, adapting some existing code, or debugging your
Tkinter application, there are times that it will be useful to understand
what those underlying Tcl/Tk commands look like.

To illustrate, here is the Tcl/Tk equivalent of the main part of the Tkinter
script above.

```
ttk::frame .frm -padding 10
grid .frm
grid [ttk::label .frm.lbl -text "Hello World!"] -column 0 -row 0
grid [ttk::button .frm.btn -text "Quit" -command "destroy ."] -column 1 -row 0
```

Tcl's syntax is similar to many shell languages, where the first word is the
command to be executed, with arguments to that command following it, separated
by spaces. Without getting into too many details, notice the following:

- The commands used to create widgets (like `ttk::frame`) correspond to
widget classes in Tkinter.

- Tcl widget options (like `-text`) correspond to keyword arguments in
Tkinter.

- Widgets are referred to by a *pathname* in Tcl (like `.frm.btn`),
whereas Tkinter doesn't use names but object references.

- A widget's place in the widget hierarchy is encoded in its (hierarchical)
pathname, which uses a `.` (dot) as a path separator. The pathname for
the root window is just `.` (dot). In Tkinter, the hierarchy is defined
not by pathname but by specifying the parent widget when creating each
child widget.

- Operations which are implemented as separate *commands* in Tcl (like
`grid` or `destroy`) are represented as *methods* on Tkinter widget
objects. As you'll see shortly, at other times Tcl uses what appear to be
method calls on widget objects, which more closely mirror what is
used in Tkinter.

### How do I...? What option does...?

If you're not sure how to do something in Tkinter, and you can't immediately
find it in the tutorial or reference documentation you're using, there are a
few strategies that can be helpful.

First, remember that the details of how individual widgets work may vary
across different versions of both Tkinter and Tcl/Tk. If you're searching
documentation, make sure it corresponds to the Python and Tcl/Tk versions
installed on your system.

When searching for how to use an API, it helps to know the exact name of the
class, option, or method that you're using. Introspection, either in an
interactive Python shell or with `print()`, can help you identify what
you need.

To find out what configuration options are available on any widget, call its
`configure()` method, which returns a dictionary containing a variety
of information about each object, including its default and current values.
Use `keys()` to get just the names of each option.

```
btn = ttk.Button(frm, ...)
print(btn.configure().keys())
```

As most widgets have many configuration options in common, it can be useful
to find out which are specific to a particular widget class. Comparing the
list of options to that of a simpler widget, like a frame, is one way to
do that.

```
print(set(btn.configure().keys()) - set(frm.configure().keys()))
```

Similarly, you can find the available methods for a widget object using the
standard `dir()` function. If you try it, you'll see there are over 200
common widget methods, so again identifying those specific to a widget class
is helpful.

```
print(dir(btn))
print(set(dir(btn)) - set(dir(frm)))
```

### Navigating the Tcl/Tk reference manual

As noted, the official
Tk commands reference
manual (man pages) is often the most accurate description of what specific
operations on widgets do.
Even when you know the name of the option or method that you need, you may
still have a few places to look.

While all operations in Tkinter are implemented as method calls on widget
objects, you've seen that many Tcl/Tk operations appear as commands that
take a widget pathname as its first parameter, followed by optional
parameters, for example

```
destroy .
grid .frm.btn -column 0 -row 0
```

Others, however, look more like methods called on a widget object (in fact,
when you create a widget in Tcl/Tk, it creates a Tcl command with the name
of the widget pathname, with the first parameter to that command being the
name of a method to call).

```
.frm.btn invoke
.frm.lbl configure -text "Goodbye"
```

In the official Tcl/Tk reference documentation, you'll find most operations
that look like method calls on the man page for a specific widget (for example,
you'll find the `invoke()` method on the
ttk::button
man page), while functions that take a widget as a parameter often have
their own man page (for example,
grid).

You'll find many common options and methods in the
options or
ttk::widget man
pages, while others are found in the man page for a specific widget class.

You'll also find that many Tkinter methods have compound names, for example,
`winfo_x()`, `winfo_height()`,
`winfo_viewable()`.
You'd find documentation for all of these in the
winfo man page.

> **Note:** Somewhat confusingly, there are also methods on all Tkinter widgets
> that don't actually operate on the widget, but operate at a global
> scope, independent of any widget. Examples are methods for accessing
> the clipboard or the system bell. (They happen to be implemented as
> methods in the base `Widget` class that all Tkinter widgets
> inherit from).

## Threading model

Python and Tcl/Tk have very different threading models, which `tkinter`
tries to bridge. If you use threads, you may need to be aware of this.

A Python interpreter may have many threads associated with it. In Tcl, multiple
threads can be created, but each thread has a separate Tcl interpreter instance
associated with it. Threads can also create more than one interpreter instance,
though each interpreter instance can be used only by the one thread that created it.

Each `Tk` object created by `tkinter` contains a Tcl interpreter.
It also keeps track of which thread created that interpreter. Calls to
`tkinter` can be made from any Python thread. Internally, if a call comes
from a thread other than the one that created the `Tk` object, an event
is posted to the interpreter's event queue, and when executed, the result is
returned to the calling Python thread.

Tcl/Tk applications are normally event-driven, meaning that after
initialization, the interpreter runs an event loop (that is,
`Tk.mainloop()`) and responds to events.
Because it is single-threaded, event handlers must respond quickly, otherwise
they will block other events from being processed.
To avoid this, any long-running computations should not run in an event
handler, but are either broken into smaller pieces using timers, or run in
another thread.
This is different from many GUI toolkits where the GUI runs in a completely
separate thread from all application code including event handlers.

If the Tcl interpreter is not running the event loop and processing events, any
`tkinter` calls made from threads other than the one running the Tcl
interpreter will fail.

A number of special cases exist:

- Tcl/Tk libraries built without thread support are now rare: Tcl/Tk 9.0 (the
bundled version) is always thread-aware, so this case only arises with some
older 8.x builds. When the library is not thread-aware,
`tkinter` calls the library from the originating Python thread, even
if this is different than the thread that created the Tcl interpreter. A global
lock ensures only one call occurs at a time.

- While `tkinter` allows you to create more than one instance of a `Tk`
object (with its own interpreter), all interpreters that are part of the same
thread share a common event queue, which gets ugly fast. In practice, don't create
more than one instance of `Tk` at a time. Otherwise, it's best to create
them in separate threads and ensure you're running a thread-aware Tcl/Tk build.

- Blocking event handlers are not the only way to prevent the Tcl interpreter from
reentering the event loop. It is even possible to run multiple nested event loops
or abandon the event loop entirely. If you're doing anything tricky when it comes
to events or threads, be aware of these possibilities.

- There are a few select `tkinter` functions that presently work only when
called from the thread that created the Tcl interpreter.
