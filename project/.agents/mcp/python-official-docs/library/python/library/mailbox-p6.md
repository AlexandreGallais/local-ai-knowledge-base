---
title: "mailbox --- Manipulate mailboxes in various formats (part 6 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/mailbox.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# mailbox --- Manipulate mailboxes in various formats (part 6 of 6)

## Exceptions

The following exception classes are defined in the `mailbox` module:

### exception `Error()`

The base class for all other module-specific exceptions.

### exception `NoSuchMailboxError()`

Raised when a mailbox is expected but is not found, such as when instantiating a
`Mailbox` subclass with a path that does not exist (and with the *create*
parameter set to `False`), or when opening a folder that does not exist.

### exception `NotEmptyError()`

Raised when a mailbox is not empty but is expected to be, such as when deleting
a folder that contains messages.

### exception `ExternalClashError()`

Raised when some mailbox-related condition beyond the control of the program
causes it to be unable to proceed, such as when failing to acquire a lock that
another program already holds, or when a uniquely generated file name
already exists.

### exception `FormatError()`

Raised when the data in a file cannot be parsed, such as when an `MH`
instance attempts to read a corrupted `.mh_sequences` file.

## Examples

A simple example of printing the subjects of all messages in a mailbox that seem
interesting:

```
import mailbox
for message in mailbox.mbox('~/mbox'):
    subject = message['subject']       # Could possibly be None.
    if subject and 'python' in subject.lower():
        print(subject)
```

To copy all mail from a Babyl mailbox to an MH mailbox, converting all of the
format-specific information that can be converted:

```
import mailbox
destination = mailbox.MH('~/Mail')
destination.lock()
for message in mailbox.Babyl('~/RMAIL'):
    destination.add(mailbox.MHMessage(message))
destination.flush()
destination.unlock()
```

This example sorts mail from several mailing lists into different mailboxes,
being careful to avoid mail corruption due to concurrent modification by other
programs, mail loss due to interruption of the program, or premature termination
due to malformed messages in the mailbox:

```
import mailbox
import email.errors

list_names = ('python-list', 'python-dev', 'python-bugs')

boxes = {name: mailbox.mbox('~/email/%s' % name) for name in list_names}
inbox = mailbox.Maildir('~/Maildir', factory=None)

for key in inbox.iterkeys():
    try:
        message = inbox[key]
    except email.errors.MessageParseError:
        continue                # The message is malformed. Just leave it.

    for name in list_names:
        list_id = message['list-id']
        if list_id and name in list_id:
            # Get mailbox to use
            box = boxes[name]

            # Write copy to disk before removing original.
            # If there's a crash, you might duplicate a message, but
            # that's better than losing a message completely.
            box.lock()
            box.add(message)
            box.flush()
            box.unlock()

            # Remove original message
            inbox.lock()
            inbox.discard(key)
            inbox.flush()
            inbox.unlock()
            break               # Found destination, so stop looking.

for box in boxes.itervalues():
    box.close()
```
