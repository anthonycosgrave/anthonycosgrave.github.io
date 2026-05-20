---
title: "Assistive Technologies"
layout: layouts/post.njk
tags: [assistive-technology, screen-reader]
series: "fasthtml-web-a11y"
order: 1
permalink: "/fasthtml-web-a11y/assistive-technologies/"
date: 2025-11-15
description: "An introduction into assistive technologies and common screen reader usage."
ogImage: /fasthtml-web-a11y/social/1-overview-of-at.png
---

<table-of-contents selector="h2, h3, h4, h5" summary="Overview"></table-of-contents>

## Assistive Technologies

"Assistive Technologies" (AT) is a broad term for tools that help people with disabilities perform tasks that might otherwise be difficult or impossible from wheelchairs and prosthetics to communication boards, glasses, and accessibility software.

However, **access to AT alone does not remove all barriers**.

For the purposes of the posts in this overall series, the focus is on people who use desktop screen reader software and those who rely on keyboards or keyboard-like devices.

It's important not to assume how someone interacts with your site or which technologies they use. The Web Accessibility Initiative (WAI) interview series ["How People with Disabilities Use the Web"]([https://www.w3.org/WAI/people-use-web/user-stories/) provides real-world stories highlighting the barriers interviewees face and the AT they rely on.

## What is a screen reader?

Screen readers are software applications that convert on-screen content - like text, links, and buttons - into speech or braille output, allowing people to navigate and interact with websites and applications. They are primarily used by blind people or those with low-vision issues but can also support people with dyslexia or cognitive disabilities. They also provide other functionality such as navigational aids via keyboard commands.

Testing with a screen reader offers a practical perspective on accessibility that no amount of reading or automated tool can provide. Personally, a lot of accessibility theory really "clicked" for me once I began using a screen reader regularly.

You don't need to become an expert. Start with the basics, **use default settings** - to ensure you don't rely on a non-standard configuration - and maybe slow the speech rate until you get comfortable. The goal is simply to understand how your content is announced and interacted with.

### Common screen readers

In the last WebAIM Screen Reader survey the top 4 most [commonly used screen readers](https://webaim.org/projects/screenreadersurvey10/#used) were:

* NVDA 65.6%
* JAWS 60.5%
* VoiceOver 43.9%
* Narrator 37.3%

And the associated [operating systems](https://webaim.org/projects/screenreadersurvey10/#os) were:

* Windows 86.1%
* Mac 9.6%
* Linux 2.9% 

WebAIM noted that *"Respondents without disabilitites were nearly 3 times more likely to use Mac OS than respondents with disabilities."*.

### NonVisual Desktop Access (NVDA)

A free, open-source and Windows based. Donations are welcome!

* [NonVisual Desktop Access (NVDA)](https://www.nvaccess.org/download/) 
* [NVDA Keyboard shortcuts](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

### Narrator

Built into Windows by default.

* [Windows Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1)
* [Narrator Keyboard shortcuts](https://dequeuniversity.com/screenreaders/narrator-keyboard-shortcuts)

### Job Access With Speech (JAWS)

A fully featured but paid-for, screen reader.

* [Job Access With Speech (JAWS)](https://www.freedomscientific.com/products/software/jaws/)
* [JAWS Keyboard shortcuts](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

### VoiceOver

Built into MacOs and iOS devices.

* [MacOS VoiceOver](https://support.apple.com/en-ie/guide/voiceover/welcome/mac) 
* [VoiceOver Keyboard shortcuts](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)

### Screen Reader and Browser combinations

Screen readers rely on browsers to interpret accessibility information, and because of differences in proprietary software, behaviour can vary between combinations. This is why it is important to test with more than one screen reader and browser setup.

According to the [latest WebAIM survey](https://webaim.org/projects/screenreadersurvey10/#browsercombos), the top 5 common combinations were:

* JAWS with Chrome
* NVDA with Chrome
* JAWS with Edge
* NVDA with Firefox