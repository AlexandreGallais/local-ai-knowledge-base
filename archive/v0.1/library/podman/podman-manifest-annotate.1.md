---
title: "podman-manifest-annotate.1"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-manifest-annotate.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-manifest-annotate.1

% podman-manifest-annotate 1

## NAME
podman\-manifest\-annotate - Add and update information about an image or artifact in a manifest list or image index

## SYNOPSIS
**podman manifest annotate** [*options*] *listnameorindexname* *imagemanifestdigestorimageorartifactname*

## DESCRIPTION

Adds or updates information about an image or artifact included in a manifest list or image index.

## OPTIONS

If **--index** is also specified, sets the annotation on the entire image index.

#### **--arch**=*architecture*

Override the architecture which the list or index records as a requirement for
the image.  This is usually automatically retrieved from the image's
configuration information, so it is rarely necessary to use this option.

#### **--features**=*feature*

Specify the features list which the list or index records as requirements for
the image.  This option is rarely used.

#### **--index**

Treats arguments to the **--annotation** option as annotation values to be set
on the image index itself rather than on an entry in the image index.  Implied
for **--subject**.

#### **--os**=*OS*

Override the OS which the list or index records as a requirement for the image.
This is usually automatically retrieved from the image's configuration
information, so it is rarely necessary to use this option.

#### **--os-features**=*feature*

Specify the OS features list which the list or index records as requirements
for the image.  This option is rarely used.

#### **--os-version**=*version*

Specify the OS version which the list or index records as a requirement for the
image.  This option is rarely used.

#### **--subject**=*imageName*

Set the *subject* field in the image index to mark the image index as being
associated with the specified image in some way.  An image index can only be
associated with, at most, one subject.

## EXAMPLES

Update arch and variant information to specified manifest list for image:
```
$ podman manifest annotate --arch arm64 --variant v8 mylist:v1.11 sha256:59eec8837a4d942cc19a52b8c09ea75121acc38114a2c68b98983ce9356b8610
07ec8dc22b5dba3a33c60b68bce28bbd2b905e383fdb32a90708fa5eeac13a07: sha256:59eec8837a4d942cc19a52b8c09ea75121acc38114a2c68b98983ce9356b8610
```

## SEE ALSO
**podman(1)**, **podman-manifest(1)**
