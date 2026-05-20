---
title: "The Weakest Hint"
layout: layouts/post.njk
description: A deliberately unhelpful quiz game about classic video games built using FastHTML, BeautifulSoup and Hugging Face.
tags: [game, web-accessibility, htmx, hugging-face, beautifulsoup, fasthtml]
order: 1
permalink: "/the-weakest-hint/"
date: 2025-12-14
ogImage: /the-weakest-hint/social/the-weakest-hint.png
---

"The Weakest Hint" is a multiple-choice quiz about popular video games. Players get five questions, each with four possible answers. The twist? An AI has generated deliberately bad and funny descriptions of the games e.g. "Two lines chasing one ball" for Pong, or "Angry metal shotguns demon confetti" for Doom.

<table-of-contents selector="h2, h3, h4, h5" summary="Overview"></table-of-contents>

## The tech stack
- **[FastHTML](https://fastht.ml)** - Python web framework that lets you build with minimal boilerplate
- **[HTMX](https://htmx.org/)** - For content swaps without full page reloads
- **[Tailwind CSS v3](https://v3.tailwindcss.com/)** - Utility-first styling
- **[Hugging Face Hub](https://pypi.org/project/huggingface-hub/)** - Python library for interacting with Hugging Face's pretrained models 
- **[gemma-2-2b-it](https://huggingface.co/google/gemma-2-2b-it)** - via Hugging Face Inference API - Generates the game descriptions
- **[Beautiful Soup 4](https://pypi.org/project/beautifulsoup4/)** - For Wikipedia article scraping and formatting the game list

## Getting game data

[List of video games considered the best](https://en.wikipedia.org/wiki/List_of_video_games_considered_the_best) provided a good source of popular games spanning multiple decades and platforms—broad enough that most players would recognise at least some titles.

I scraped the table from the Wikipedia page using BeautifulSoup, extracting game titles and genres. To avoid repetition, I removed sequels by identifying common patterns (roman numerals, numbers after colons) and kept only the first game in each series:

```python
def get_base_title(title):
    """Extract base game title by removing sequels indicators."""
    base = title.split(':')[0].strip()
    base = re.sub(r'\s+(II|III|IV|V|VI|VII|VIII|IX|X|\d+)$', '', base)
    return base
```

The scraping code fetches the page, parses the HTML table, and builds a list of game/genre pairs. I used pandas to deduplicate based on the base title, keeping only the first entry for each game series:

```python
    ...
    response = httpx.get("https://en.wikipedia.org/wiki/List_of_video_games_considered_the_best", 
                         headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    tables = soup.find_all('table', class_='wikitable')
    table = tables[0]
    rows = table.find_all('tr')

    games_list = []
    for i in range(1, len(rows)):
        cells = rows[i].find_all(['td'])
        if len(cells) >= 2:
            games_list.append({
                'game': cells[0].get_text().strip(), 
                'genre': cells[1].get_text().strip()
            })

    df = pd.DataFrame(games_list)
    df['base_name'] = df['game'].apply(get_base_title)
    df = df.drop_duplicates(subset='base_name', keep='first')
    df = df.drop(columns=['base_name'])
    ...
```

## Picking a model to generate the descriptions

I needed a model that could generate short, quirky descriptions on demand. I tested several highly-rated text generation models on Hugging Face by sending the same prompt - for multiple games - to each and comparing outputs. Three stood out:

* `google/gemma-2-2b-it`  
* `Qwen/Qwen3-Coder-480B-A35B-Instruct`
* `openai/gpt-oss-120b`  

[Gemma-2-2b-it](https://huggingface.co/google/gemma-2-2b-it) consistently produced outputs closest to the prompt.

I used the Inference Client's `chat_completion` method, designed for conversational (i.e. send a prompt, receive a response) models.

## The Problem: Sessions don't work in HF Spaces
Everything worked perfectly locally. Click "Start Quiz", generate five questions, answer them, see your score. Simple.

Then I deployed to Hugging Face Spaces and the quiz immediately broke! Players could start a quiz, but clicking any answer button crashed with `KeyError: 'QUESTIONS'`. The session data—storing the questions, score, and progress—vanished between requests.

After considerable debugging, I discovered the culprit: **Hugging Face Spaces embeds apps in iframes on a different domain** (`*.hf.space`). Modern browsers block cookies in cross-origin iframe contexts to prevent tracking. FastHTML's session system relies on cookies, so when HTMX made requests from within the iframe, the browser either blocked the session cookie or failed to send it back.

I tried several fixes:
- Adding the `SECRET_KEY` environment variable (necessary, but didn't solve it)
- Setting `sess_same_site='none'` (requires Secure flag)
- Adding `sess_https_only=True` (still blocked by the browser)

Browser DevTools confirmed it: the session cookie existed in storage but wasn't being sent with POST requests. The `Set-Cookie` header showed a blocking warning about cross-site responses.

This turned out to be a documented HF Spaces limitation. It is not a bug, just how iframes and modern browser security work together.

### The Solution: Hidden form fields
Since cookies weren't viable, I switched to passing state through hidden form fields. Instead of storing questions in the session, I serialise them to JSON and include them in each HTMX response:

```python
Input(type="hidden", name="questions", value=json.dumps(questions))
Input(type="hidden", name="q_index", value=str(q_index))
```

When a button is clicked, HTMX posts these hidden fields back to the server. The next route receives them, deserialises the JSON, and continues where it left off. No cookies required.

This meant refactoring every route to accept and pass along the game state, but it worked. The quiz now runs smoothly on HF Spaces.

## Other Challenges

### Tweaking the prompt and cleaning up responses
For the most part the responses were usable but would intermittently be: quite long sentences, sometimes chopped off mid-sentence, included unnecessary punctuation and, other irregularities. 

I iterated on the prompt, adding more detailed rules:

- "Your response must be exactly 5 words"
- "Must be a complete thought, not cut off mid-sentence"
- "Do not wrap your response in quotation marks"
- "Use only plain text, no special characters"

I also added multiple examples to guide the style. Even with these constraints, the model occasionally misbehaved, so I built a `clean_description()` function and a final manual review of the generated descriptions.

### Accessibility
Accessibility wasn't an afterthought. I wanted the game to be usable for keyboard-only navigation and work well in both light and dark modes. This meant going beyond framework defaults in a few key areas.

#### High contrast colours with light and dark mode support
Some of Tailwind's default button and text colours failed WCAG AA contrast requirements (4.5:1 minimum). Since the game uses four answer buttons, I needed distinct colours that worked in both light and dark modes.

For light mode, I used darker shades (700) with white text. For dark mode, lighter shades (400-500) with black text. Each combination meets or exceeds the 4.5:1 ratio (light / dark):
- Green: `bg-green-700` / `bg-green-500`
- Purple: `bg-purple-700` / `bg-purple-400`
- Orange: `bg-orange-700` / `bg-orange-400`
- Pink: `bg-pink-700` / `bg-pink-400`

#### Visible focus indicators via 'focus-visible'
All browsers provide a default keyboard focus indicator, via `:focus-visible`. The syntax varies slightly between browser vendors but they all render an `outline`:

```css
:focus-visible {
    outline: -webkit-focus-ring-color auto 1px;
}
```

These indicators vary in appearance across browsers, so they are often removed by designers or developers. This creates a major accessibility issue if a visible replacement is not provided. I've written a more detailed breakdown on why focus indicators matter previously, ["Focus Indicators Are The Keyboard User's Cursor"](https://anthonycosgrave.github.io/fasthtml-web-a11y/focus-indicators/).

Tailwind provides a utility class to override the default outline style:

```python
cls = "focus-visible:outline-none"
```

Which translates to the following CSS:

```css
.focus-visible\:outline-none:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
```

This removes the default keyboard focus indicator style in all browsers. For most people, there would be no visual outline to indicate the element was in focus if they TAB'd to it. (Technically, there would be a visible outline in Windows High Contrast mode where the `transparent` value would be overridden by the high contrast theme's outline `color`).

If you remove them, it is extremely important to remember to add in ':focus-visible' indicators. Using the 'Start Button' from the game, here is how I added a
highly visible focus indicator:

```python
"focus-visible:outline-none focus-visible:ring-4 "
"focus-visible:ring-blue-500 focus-visible:ring-offset-4 "
```

This creates a 4px ring with a 4px gap, making the focused element unmistakable during keyboard navigation. The `focus-visible` rules only apply for keyboard focus, which is very important for people out there who, for various reasons, can only use keyboards or keyboard-like devices.

#### Keyboard accessibility and focus management
When a page loads, the browser establishes a tab order based on the focusable elements in the DOM. This order can be navigated using `TAB` or `Shift + TAB`.

In this game, HTMX replaces parts of the page after a button is activated. When the previously focused element is removed during the swap, focus is lost. When this happens, the tab order is broken, pressing `TAB` will move focus outside of the game rather than to a button.

To fix this, focus is *explicitly* restored after each swap by programmatically focusing on the new content:

```python
focus_attrs = {"tabindex":-1, "autofocus":True}

P(message, cls="text-2xl font-bold text-center focus:outline-none", **focus_attrs)
```

`tabindex="-1"` allows the paragraph - `P()` - to receive focus while `autofocus` ensures that focus is placed on it after HTMX has swapped it into the page.

The default focus outline is suppressed using `focus:outline-none`, as the paragaph is not intended to be interacted with. It is used a logical staring point for continuing keyboard navigation, were pressing `TAB` takes the player to the button(s) on the page.

I went with this approach over automatically focusing on a button, as that could take attention away from the game text and possibly give the wrong impression that one of the answers had been pre-selected.

### API Quota Limits
Testing, tweaking, and generating descriptions on-demand hit HF's free tier limits quickly. I kept getting [402 errors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402) at intermittent points mid-game! The solution was to pre-generate multiple descriptions per game offline, store them in JSON, and pick randomly during gameplay. 

The `40X` errors didn't immediately go away with the pre-generation option! The script includes a lot of retry logic: when a request fails, it sleeps for 60 seconds then retries, with a maximum retry limit to prevent infinite loops. Progress is saved after each game completes, allowing the script to resume if interrupted.

See 'description_creator.py' for the source code.

### Tailwind verbosity
My understanding of the purpose of Tailwind is to build UIs from small, composable utility classes. I went into this project with the mindset of "What is the Tailwind way to do X, Y and Z?". Coming from a stylesheet-first background, Tailwind's approach of effectively inline styling everything felt "wrong".

The size and scope of this project are very small, but moving to a "component-first" approach helped to clarify some of the benefits of Tailwind. For example, everything related to a `AnswerButton` is contained within the `AnswerButton` FastHTML component's code.

### Being more "Pythonic"
List comprehensions are something I have to keep reminding myself to use! I made a point of trying to use them whenever possible e.g. filtering games by genre:

```python
same_genre = [g for g in games if g['genre'] == game_genre]
```

I also created a dictionary for the repeated focus management I mentioned above and **unpacked** it where needed:

```python
focus_attrs = {"tabindex":-1, "autofocus":True}
...
P(message, cls="text-2xl font-bold text-center focus:outline-none", **focus_attrs)
```

## What I Learned
- **Cookie-based sessions don't work with HF Spaces** Hidden fields or server-side storage are more portable.
- **Pre-generating AI content** beats real-time generation for quota-limited APIs and improves UX.
- **Tailwind's not all bad** once you stop fighting the framework and lean into its patterns.

## Play it!
Play the Hugging Face version here: [The Weakest Hint](https://huggingface.co/spaces/acosgrave/the-weakest-hint).

## Source code
The source code for that version is also hosted on [Hugging Face](https://huggingface.co/spaces/acosgrave/the-weakest-hint/tree/main).

The **sessions** based version of the code is available on my GitHub: [The Weakest Hint](https://github.com/anthonycosgrave/the-weakest-hint).
