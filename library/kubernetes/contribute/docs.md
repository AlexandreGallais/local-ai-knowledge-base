---
title: "Contribute to Kubernetes Documentation"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/contribute/docs.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Contribute to Kubernetes Documentation

This website is maintained by Kubernetes SIG Docs.
The Kubernetes project welcomes help from all contributors, new or experienced!

Kubernetes documentation contributors:

- Improve existing content
- Create new content
- Translate the documentation
- Manage and publish the documentation parts of the Kubernetes release cycle

The blog team, part of SIG Docs, helps manage the official blogs. Read
contributing to Kubernetes blogs to learn more.

---

**Note:**
To learn more about contributing to Kubernetes in general, see the general
contributor documentation site.

## Getting started

Anyone can open an issue about documentation, or contribute a change with a
pull request (PR) to the
`kubernetes/website` GitHub repository.
You need to be comfortable with
git and
GitHub
to work effectively in the Kubernetes community.

To get involved with documentation:

1. Sign the CNCF Contributor License Agreement.
2. Familiarize yourself with the documentation repository
   and the website's static site generator.
3. Make sure you understand the basic <example-value> for
   opening a pull request and
   reviewing changes.

```mermaid
flowchart TB
subgraph third[Open PR]
direction TB
U[ ] -.-
Q[Improve content] --- N[Create content]
N --- O[Translate docs]
O --- P[Manage/publish docs parts<br>of K8s release cycle]

end

subgraph second[Review]
direction TB
   T[ ] -.-
   D[Look over the<br>kubernetes/website<br>repository] --- E[Check out the<br>Hugo static site<br>generator]
   E --- F[Understand basic<br>GitHub commands]
   F --- G[Review open PR<br>and change review <br>processes]
end

subgraph first[Sign up]
    direction TB
    S[ ] -.-
    B[Sign the CNCF<br>Contributor<br>License Agreement] --- C[Join sig-docs<br>Slack channel] 
    C --- V[Join kubernetes-sig-docs<br>mailing list]
    V --- M[Attend weekly<br>sig-docs calls<br>or slack meetings]
end

A([fa:fa-user New<br>Contributor]) --> first
A --> second
A --> third
A --> H[Ask Questions!!!]

classDef grey fill:#dddddd,stroke:#ffffff,stroke-width:px,color:#000000, font-size:15px;
classDef white fill:#ffffff,stroke:#000,stroke-width:px,color:#000,font-weight:bold
classDef spacewhite fill:#ffffff,stroke:#fff,stroke-width:0px,color:#000
class A,B,C,D,E,F,G,H,M,Q,N,O,P,V grey
class S,T,U spacewhite
class first,second,third white
```
Figure 1. Getting started for a new contributor.

Figure 1 outlines a roadmap for new contributors. You can follow some or all of
the steps for `Sign up` and `Review`. Now you are ready to open PRs that achieve
your contribution objectives with some listed under `Open PR`. Again, questions
are always welcome!

Some tasks require more trust and more access in the Kubernetes organization.
See Participating in SIG Docs for more details about
roles and permissions.

## Your first contribution

You can prepare for your first contribution by reviewing several steps beforehand.
Figure 2 outlines the steps and the details follow.

```mermaid
flowchart LR
    subgraph second[First Contribution]
    direction TB
    S[ ] -.-
    G[Review PRs from other<br>K8s members] -->
    A[Check kubernetes/website<br>issues list for<br>good first PRs] --> B[Open a PR!!]
    end
    subgraph first[Suggested Prep]
    direction TB
       T[ ] -.-
       D[Read contribution overview] -->E[Read K8s content<br>and style guides]
       E --> F[Learn about Hugo page<br>content types<br>and shortcodes]
    end
    

    first ----> second
     

classDef grey fill:#dddddd,stroke:#ffffff,stroke-width:px,color:#000000, font-size:15px;
classDef white fill:#ffffff,stroke:#000,stroke-width:px,color:#000,font-weight:bold
classDef spacewhite fill:#ffffff,stroke:#fff,stroke-width:0px,color:#000
class A,B,D,E,F,G grey
class S,T spacewhite
class first,second white
```
Figure 2. Preparation for your first contribution.

- Read the Contribution overview to
  learn about the different ways you can contribute.
- Check `kubernetes/website` issues list
  for issues that make good entry points.
- Open a pull request using GitHub
  to existing documentation and learn more about filing issues in GitHub.
- Review pull requests from other
  Kubernetes community members for accuracy and language.
- Read the Kubernetes content and
  style guides so you can leave informed comments.
- Learn about page content types
  and Hugo shortcodes.

## Getting help when contributing

Making your first contribution can be overwhelming. The
New Contributor Ambassadors
are there to walk you through making your first few contributions. You can reach out to them in the
Kubernetes Slack preferably in the `#sig-docs` channel. There is also the
New Contributors Meet and Greet call
that happens on the first Tuesday of every month. You can interact with the New Contributor Ambassadors
and get your queries resolved here.

## Get involved with SIG Docs

SIG Docs is the group of contributors who
publish and maintain Kubernetes documentation and the website. Getting
involved with SIG Docs is a great way for Kubernetes contributors (feature
development or otherwise) to have a large impact on the Kubernetes project.

SIG Docs communicates with different methods:

- Join `#sig-docs` on the Kubernetes Slack instance. Make sure to
  introduce yourself!
- Join the `kubernetes-sig-docs` mailing list,
  where broader discussions take place and official decisions are recorded.
- Join the SIG Docs video meeting
  held every two weeks. Meetings are always announced on `#sig-docs` and added to the
  Kubernetes community meetings calendar.
  You'll need to download the Zoom client or dial in using a phone.
- Join the SIG Docs async Slack standup meeting on those weeks when the in-person Zoom
  video meeting does not take place. Meetings are always announced on `#sig-docs`.
  You can contribute to any one of the threads up to 24 hours after meeting announcement.

## Other ways to contribute

- Visit the Kubernetes community site. Participate on Twitter or Stack Overflow,
  learn about local Kubernetes meetups and events, and more.
- Read the contributor cheatsheet
  to get involved with Kubernetes feature development.
- Visit the contributor site to learn more about Kubernetes Contributors
  and additional contributor resources.
- Learn how to contribute to the official blogs
- Submit a case study

## Next steps

- Learn to work from a local clone
  of the repository.
- Document features in a release.
- Participate in SIG Docs, and become a
  member or reviewer.

- Start or help with a localization.
