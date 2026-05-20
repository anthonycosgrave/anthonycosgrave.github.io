---
title: "Set the page's `lang` attribute"
layout: layouts/post.njk
tags: [fasthtml, page-language, lang, screen-reader]
series: "fasthtml-web-a11y"
order: 4
permalink: "/fasthtml-web-a11y/set-the-language/"
date: 2025-11-15
description: "How to correctly declare the page language to improve accessibility and assistive technology support."
ogImage: /fasthtml-web-a11y/social/4-set-page-lang.png
---

Setting the `lang` attribute on page's `<html>` tag is an **extremely simple** and impactful accessibility improvement you can make. It helps screen readers, translation tools, and other assistive technologies (AT) interpret your content correctly.

<table-of-contents selector="h2, h3, h4, h5" summary="Overview"></table-of-contents>

## Why set the page language?

Setting the `lang` attribute ensures:
- Screen readers that support speech synthesis use the correct pronunciation and accent.  
- Braille translation software handles special characters properly.  
- Browser-based translation tools work more accurately.  

Without it, assistive tools must guess the language and often fall back on the user's system default setting, which can lead to mispronounced words and translation errors. According to the 2025 WebAIM Million project, nearly [15% of the top 1,000,000 home pages](https://webaim.org/projects/million/#languages) did **not** set a language.

The `lang` attribute follows [ISO 639 language codes](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes), typically using a two-letter code like **`en`** (English), **`zh`** (Chinese), or **`fr`** (French). If needed, you can specify regional variations using subtags, such as **`en-US`** (American English), **`fr-CA`** (Canadian French) or **`zh-CN`** (Mandarin Chinese) but be aware that subtag support can vary across browsers and screen reader pairings. 


## How to set the `lang` attribute

There appear to be several ways to set the document language in FastHTML, here are some:

```python
# page language set to English
html_options = {'lang': 'en'}
app = FastHTML(htmlkw=html_options)

...
app = fast_app(htmlkw={"lang": "en"})

...
# if you return Html() it will overwrite the html_options passed into fastHTML and fast_app
return Html(
    Head(Title('Set the lang attribute')),
    Body(H1('Set the lang attribute!')),
    # but they can be passed in like this
    **html_options,
)
```

## Handling multi-language content

The `lang` attribute can be applied to many elements but it is most commonly used on text-containing elements such as ```<p>, <span>, <div>```. For mixed-language content, the page's language can be overridden on the relevant elements. A way to achieve this in FastHTML is:

```python
# French
P('Bonjour. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.', lang='fr'),
# German
P('Guten Morgen. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.', lang='de'),
# Chinese (Simplified)
P('早上好。0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.', lang='zh-CN'),
# multiple languages in the same paragraph
P('Greetings in different languages: ', Span('Hello '), Span('Salut ', lang='fr'), Span('Hallo ', lang='de'), Span('你好 ', lang='zh-CN'))
```

This ensures screen readers switch pronunciations appropriately as you will hear in the video below.

<lite-youtube videoid="2VaaddRF2r8" title="Set the lang attribute on the html tag" style="background-image: url('https://i.ytimg.com/vi/2VaaddRF2r8/hqdefault.jpg');">
  <a href="https://youtu.be/2VaaddRF2r8" class="lyt-playbtn" title="Play Video">
    <span class="lyt-visually-hidden">Play Video: Set the lang attribute on the html tag</span>
  </a>
</lite-youtube>

## Additional language specific benefits

The ```lang``` attribute also affects typographical conventions like quotation marks. Different languages use different styles and setting the correct ```lang``` attribute ensures browsers format these properly. In FastHTML:

```python
P('They said, ', Q('Hello!')),  # inherits default set on the page e.g. <html lang='en'>
P('Ils ont dit: ', Q('Bonjour!'), lang='fr'),
P('Sie haben gesagt: ', Q('Hallo!'), lang='de')
```

The rendered HTML then looks like:
<code>
<p>They said, <q>Hello!</q></p>
<p lang="fr">Ils ont dit: <q>Bonjour!</q></p>
<p lang="de">Sie haben gesagt: <q>Hallo!</q></p>
</code>

## WCAG success criteria

These WCAG success criteria relate to the accessibility topics covered in this post.

**[3.1.1 Language of Page (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html)** – The **main** language of a web page must be specified on the `<html>` element so assistive technologies, such as screen readers or braille displays, can present the content correctly.

**[3.1.2 Language of Parts (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html)** – If a page contains **multiple** languages, each section or phrase must have the correct language specified in the relevant HTML so assistive technologies can present them correctly.