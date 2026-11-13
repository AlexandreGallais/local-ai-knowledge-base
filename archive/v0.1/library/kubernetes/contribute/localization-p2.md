---
title: "Localizing Kubernetes documentation (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/contribute/localization.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Localizing Kubernetes documentation (part 2 of 2)

## Localize content

Localizing *all* the Kubernetes documentation is an enormous task. It's okay to
start small and expand over time.

### Minimum required content

At a minimum, all localizations must include:

Description | URLs
-----|-----
Home | All heading and subheading URLs
Setup | All heading and subheading URLs
Tutorials | Kubernetes Basics, Hello Minikube
Site strings | All site strings in a new localized TOML file
Releases | All heading and subheading URLs

Translated documents must reside in their own `content/**/` subdirectory, but otherwise, follow the
same URL path as the English source. For example, to prepare the
Kubernetes Basics tutorial for translation into German,
create a subdirectory under the `content/de/` directory and copy the English source or directory:

```shell
mkdir -p content/de/docs/tutorials
cp -ra content/en/docs/tutorials/kubernetes-basics/ content/de/docs/tutorials/
```

Translation tools can speed up the translation process. For example, some
editors offer plugins to quickly translate text.

**Caution:**
Machine-generated translation is insufficient on its own. Localization requires
extensive human review to meet minimum standards of quality.

To ensure accuracy in grammar and meaning, members of your localization team
should carefully review all machine-generated translations before publishing.

### Localize SVG images

The Kubernetes project recommends using vector (SVG) images where possible, as
these are much easier for a localization team to edit. If you find a raster
image that needs localizing, consider first redrawing the English version as
a vector image, and then localize that.

When translating text within SVG (Scalable Vector Graphics) images, it's
essential to follow certain guidelines to ensure accuracy and maintain
consistency across different language versions. SVG images are commonly
used in the Kubernetes documentation to illustrate concepts, workflows,
and diagrams.

1. **Identifying translatable text**: Start by identifying the text elements
   within the SVG image that need to be translated. These elements typically
   include labels, captions, annotations, or any text that conveys information.

1. **Editing SVG files**: SVG files are XML-based, which means they can be
   edited using a text editor. However, it's important to note that most of the
   documentation images in Kubernetes already convert text to curves to avoid font
   compatibility issues. In such cases, it is recommended to use specialized SVG
   editing software, such as Inkscape, for editing, open the SVG file and locate
   the text elements that require translation.

1. **Translating the text**: Replace the original text with the translated
   version in the desired language. Ensure the translated text accurately conveys
   the intended meaning and fits within the available space in the image. The Open
   Sans font family should be used when working with languages that use the Latin
   alphabet. You can download the Open Sans typeface from here:
   Open Sans Typeface.

1. **Converting text to curves**: As already mentioned, to address font
   compatibility issues, it is recommended to convert the translated text to
   curves or paths. Converting text to curves ensures that the final image
   displays the translated text correctly, even if the user's system does not
   have the exact font used in the original SVG.

1. **Reviewing and testing**: After making the necessary translations and
   converting text to curves, save and review the updated SVG image to ensure
   the text is properly displayed and aligned. Check
   Preview your changes locally.

### Source files

Localizations must be based on the English files from a specific release
targeted by the localization team. Each localization team can decide which
release to target, referred to as the _target version_ below.

To find source files for your target version:

1. Navigate to the Kubernetes website repository at
   https://github.com/kubernetes/website.

1. Select a branch for your target version from the following table:

Target version | Branch
-----|-----
Latest version | `main`
Previous version | `release-`
Next version | `dev-`

The `main` branch holds content for the current release ``.
The release team creates a `` branch before the next
release: v.

### Site strings in i18n

Localizations must include the contents of
`i18n/en/en.toml`
in a new language-specific file. Using German as an example:
`i18n/de/de.toml`.

Add a new localization directory and file to `i18n/`. For example, with
German (`de`):

```bash
mkdir -p i18n/de
cp i18n/en/en.toml i18n/de/de.toml
```

Revise the comments at the top of the file to suit your localization, then
translate the value of each string. For example, this is the German-language
placeholder text for the search form:

```toml
[ui_search]
other = "Suchen"
```

Localizing site strings lets you customize site-wide text and features: for
example, the legal copyright text in the footer on each page.

### Language-specific localization guide

As a localization team, you can formalize the best practices your team follows
by creating a language-specific localization guide.

For example, see the
Korean Localization Guide, which
includes content on the following subjects:

- Sprint cadence and releases
- Branch strategy
- Pull request workflow
- Style guide
- Glossary of localized and non-localized terms
- Markdown conventions
- Kubernetes API object terminology

### Language-specific Zoom meetings

If the localization project needs a separate meeting time, contact a SIG Docs
Co-Chair or Tech Lead to create a new reoccurring Zoom meeting and calendar
invite. This is only needed when the team is large enough to sustain and require
a separate meeting.

Per CNCF policy, the localization teams must upload their meetings to the SIG
Docs YouTube playlist. A SIG Docs Co-Chair or Tech Lead can help with the
process until SIG Docs automates it.

## Branch strategy

Because localization projects are highly collaborative efforts, we
encourage teams to work in shared localization branches - especially
when starting out and the localization is not yet live.

To collaborate on a localization branch:

1. A team member of
   @kubernetes/website-maintainers
   opens a localization branch from a source branch on
   https://github.com/kubernetes/website.

   Your team approvers joined the `@kubernetes/website-maintainers` team when
   you added your localization team to
   the `kubernetes/org` repository.

   We recommend the following branch naming scheme:

   `dev--<language code>.<team milestone>`

   For example, an approver on a German localization team opens the localization
   branch `dev-1.12-de.1` directly against the `kubernetes/website` repository,
   based on the source branch for Kubernetes v1.12.

1. Individual contributors open feature branches based on the localization
   branch.

   For example, a German contributor opens a pull request with changes to
   `kubernetes:dev-1.12-de.1` from `username:local-branch-name`.

1. Approvers review and merge feature branches into the localization branch.

1. Periodically, an approver merges the localization branch with its source
   branch by opening and approving a new pull request. Be sure to squash the
   commits before approving the pull request.

Repeat steps 1-4 as needed until the localization is complete. For example,
subsequent German localization branches would be: `dev-1.12-de.2`,
`dev-1.12-de.3`, etc.

Teams must merge localized content into the same branch from which the content
was sourced. For example:

- A localization branch sourced from `main` must be merged into `main`.
- A localization branch sourced from `release-`
  must be merged into `release-`.

**Note:**
If your localization branch was created from `main` branch, but it is not merged
into `main` before the new release branch `` created,
merge it into both `main` and new release branch ``. To
merge your localization branch into the new release branch
``, you need to switch the upstream branch of your
localization branch to ``.

At the beginning of every team milestone, it's helpful to open an issue
comparing upstream changes between the previous localization branch and the
current localization branch. There are two scripts for comparing upstream
changes.

- `upstream_changes.py`
  is useful for checking the changes made to a specific file. And
- `diff_l10n_branches.py`
  is useful for creating a list of outdated files for a specific localization
  branch.

While only approvers can open a new localization branch and merge pull requests,
anyone can open a pull request for a new localization branch. No special
permissions are required.

For more information about working from forks or directly from the repository,
see "fork and clone the repo".

## Upstream contributions

SIG Docs welcomes upstream contributions and corrections to the English source.
