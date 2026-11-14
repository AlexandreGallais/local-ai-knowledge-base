---
title: "winsound --- Sound-playing interface for Windows"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/winsound.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `winsound` --- Sound-playing interface for Windows

Module `winsound`.

**Source code:** PC/winsound.c

The `winsound` module provides access to the basic <example-value> machinery
provided by Windows platforms.  It includes functions and several constants.

> **Availability:** Windows.

## Functions

### `Beep(frequency, duration)`

Beep the PC's speaker. The *frequency* parameter specifies frequency, in hertz,
of the sound, and must be in the range 37 through 32,767. The *duration*
parameter specifies the number of milliseconds the sound should last.  If the
system is not able to beep the speaker, `RuntimeError` is raised.

### `PlaySound(sound, flags)`

Call the underlying `PlaySound` function from the Platform API.  The
*sound* parameter may be a filename, a system sound alias, audio data as a
bytes-like object, or `None`.  Its
interpretation depends on the value of *flags*, which can be a bitwise ORed
combination of the constants described below. If the *sound* parameter is
`None`, any currently playing waveform sound is stopped. If the system
indicates an error, `RuntimeError` is raised.

### `MessageBeep(type=MB_OK)`

Call the underlying `MessageBeep` function from the Platform API.  This
plays a sound as specified in the registry.  The *type* argument specifies which
sound to play; possible values are `-1`, `MB_ICONASTERISK`,
`MB_ICONEXCLAMATION`, `MB_ICONHAND`, `MB_ICONQUESTION`, and `MB_OK`, all
described below.  The value `-1` produces a "simple beep"; this is the final
fallback if a sound cannot be played otherwise.  If the system indicates an
error, `RuntimeError` is raised.

## Constants

### `SND_FILENAME`

The *sound* parameter is the name of a WAV file. Do not use with
`SND_ALIAS`.

### `SND_ALIAS`

The *sound* parameter is a sound association name from the registry.  If the
registry contains no such name, play the system default sound unless
`SND_NODEFAULT` is also specified. If no default sound is registered,
raise `RuntimeError`. Do not use with `SND_FILENAME`.

All Win32 systems support at least the following; most systems support many
more:

```text
+--------------------------+----------------------------------------+
| :func:`PlaySound` *name* | Corresponding Control Panel Sound name |
+==========================+========================================+
| ``'SystemAsterisk'``     | Asterisk                               |
+--------------------------+----------------------------------------+
| ``'SystemExclamation'``  | Exclamation                            |
+--------------------------+----------------------------------------+
| ``'SystemExit'``         | Exit Windows                           |
+--------------------------+----------------------------------------+
| ``'SystemHand'``         | Critical Stop                          |
+--------------------------+----------------------------------------+
| ``'SystemQuestion'``     | Question                               |
+--------------------------+----------------------------------------+
```

For example:

```
import winsound
# Play Windows exit sound.
winsound.PlaySound("SystemExit", winsound.SND_ALIAS)

# Probably play Windows default sound, if any is registered (because
# "*" probably isn't the registered name of any sound).
winsound.PlaySound("*", winsound.SND_ALIAS)
```

### `SND_LOOP`

Play the sound repeatedly.  The `SND_ASYNC` flag must also be used to
avoid blocking.  Cannot be used with `SND_MEMORY`.

### `SND_MEMORY`

The *sound* parameter to `PlaySound()` is a memory image of a WAV file, as a
bytes-like object.

> **Note:** This module does not support playing from a memory image asynchronously, so a
> combination of this flag and `SND_ASYNC` will raise `RuntimeError`.

### `SND_PURGE`

Stop playing all instances of the specified sound.

> **Note:** This flag is not supported on modern Windows platforms.

### `SND_ASYNC`

Return immediately, allowing sounds to play asynchronously.

### `SND_NODEFAULT`

If the specified sound cannot be found, do not play the system default sound.

### `SND_NOSTOP`

Do not interrupt sounds currently playing.

### `SND_NOWAIT`

Return immediately if the sound driver is busy.

> **Note:** This flag is not supported on modern Windows platforms.

### `SND_APPLICATION`

The *sound* parameter is an application-specific alias in the registry.
This flag can be combined with the `SND_ALIAS` flag
to specify an application-defined sound alias.

### `SND_SENTRY`

Triggers a SoundSentry event when the sound is played.

> *Added in version 3.14.*

### `SND_SYNC`

The sound is played synchronously.  This is the default behavior.

> *Added in version 3.14.*

### `SND_SYSTEM`

Assign the sound to the audio session for system notification sounds.

> *Added in version 3.14.*

### `MB_ICONASTERISK`

Play the `SystemDefault` sound.

### `MB_ICONEXCLAMATION`

Play the `SystemExclamation` sound.

### `MB_ICONHAND`

Play the `SystemHand` sound.

### `MB_ICONQUESTION`

Play the `SystemQuestion` sound.

### `MB_OK`

Play the `SystemDefault` sound.

### `MB_ICONERROR`

Play the `SystemHand` sound.

> *Added in version 3.14.*

### `MB_ICONINFORMATION`

Play the `SystemDefault` sound.

> *Added in version 3.14.*

### `MB_ICONSTOP`

Play the `SystemHand` sound.

> *Added in version 3.14.*

### `MB_ICONWARNING`

Play the `SystemExclamation` sound.

> *Added in version 3.14.*
