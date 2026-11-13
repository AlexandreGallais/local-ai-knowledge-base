---
title: "Readline (part 4 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/readline.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Readline (part 4 of 4)

## TTY keybindings

     | Keybindings
     | Description
     | Notes

     | `Ctrl`+`Shift`+`Backspace`
     | Delete line left
     | Doesn't work on Linux, Mac and Windows

     | `Ctrl`+`Shift`+`Delete`
     | Delete line right
     | Doesn't work on Mac

     | `Ctrl`+`C`
     | Emit `SIGINT` or close the readline instance
     |

     | `Ctrl`+`H`
     | Delete left
     |

     | `Ctrl`+`D`
     | Delete right or close the readline instance in case the current line is empty / EOF
     | Doesn't work on Windows

     | `Ctrl`+`U`
     | Delete from the current position to the line start
     |

     | `Ctrl`+`K`
     | Delete from the current position to the end of line
     |

     | `Ctrl`+`Y`
     | Yank (Recall) the previously deleted text
     | Only works with text deleted by `Ctrl`+`U` or `Ctrl`+`K`

     | `Meta`+`Y`
     | Cycle among previously deleted texts
     | Only available when the last keystroke is `Ctrl`+`Y` or `Meta`+`Y`

     | `Ctrl`+`A`
     | Go to start of line
     |

     | `Ctrl`+`E`
     | Go to end of line
     |

     | `Ctrl`+`B`
     | Back one character
     |

     | `Ctrl`+`F`
     | Forward one character
     |

     | `Ctrl`+`L`
     | Clear screen
     |

     | `Ctrl`+`N`
     | Next history item
     |

     | `Ctrl`+`P`
     | Previous history item
     |

     | `Ctrl`+`-`
     | Undo previous change
     | Any keystroke that emits key code `0x1F` will do this action.
    In many terminals, for example `xterm`,
    this is bound to `Ctrl`+`-`.

     | `Ctrl`+`6`
     | Redo previous change
     | Many terminals don't have a default redo keystroke.
    We choose key code `0x1E` to perform redo.
    In `xterm`, it is bound to `Ctrl`+`6`
    by default.

     | `Ctrl`+`Z`
     | Moves running process into background. Type
    `fg` and press `Enter`
    to return.
     | Doesn't work on Windows

     | `Ctrl`+`W` or `Ctrl`
   +`Backspace`
     | Delete backward to a word boundary
     | `Ctrl`+`Backspace` Doesn't
    work on Linux, Mac and Windows

     | `Ctrl`+`Delete`
     | Delete forward to a word boundary
     | Doesn't work on Mac

     | `Ctrl`+`Left arrow` or
    `Meta`+`B`
     | Word left
     | `Ctrl`+`Left arrow` Doesn't work
    on Mac

     | `Ctrl`+`Right arrow` or
    `Meta`+`F`
     | Word right
     | `Ctrl`+`Right arrow` Doesn't work
    on Mac

     | `Meta`+`D` or `Meta`
   +`Delete`
     | Delete word right
     | `Meta`+`Delete` Doesn't work
    on windows

     | `Meta`+`Backspace`
     | Delete word left
     | Doesn't work on Mac
