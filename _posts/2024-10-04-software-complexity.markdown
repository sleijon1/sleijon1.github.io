---
layout: post
title: "Inevitability of Software Complexity"
date: 2024-10-04
categories: Software Development
---

Why do programmers prefer complex software over simple solutions?

Because "Hello, World!" doesn't look impressive on a resume!

(joke by ChatGPT)

# On Software Complexity

I was listening to the DevOps Paradox by Viktor Farcic and Darin Pope during my run today and really enjoyed the conversation. The main point from their discussion, that I personally think is crucial, is the (almost) inevitability of bad design. Viktor brought this up multiple times which I agree with strongly. The idea that you can look at any system that has been alive for long enough and is complex enough and think that it is poorly designed from the requirements of today. As software developers we like having fun about how poorly something has been implemented. And this can be all fun and games but in all seriousness we rarely have the historical context of the code base in our minds when evaluating the current state of the design. Things like past requirements, time constraints and just the state of the overall programming knowledge from the time it was implemented all need to be factored in when evaluating the quality of a design. We wouldn't laugh at a horse for not being the supreme vehicle today.

For me, it is crucial that everyone that works with and around building systems understand that a system can be perfectly built with regards to the original requirements (..but those are seldom complete w.r.t what actually should be built) but it can not be perfectly built with regards to every possible new requirement that might pop up in the future. And so, which Darin and Viktor discuss in the episode, we will always get down to a cost-benefit analysis of keeping a system alive for new requirements, despite the fact that the system was not built to support those requirements, versus replacing the system with a new one, better suited for the new requirements.

Another aspect that they didn't touch on as much in the episode is the question of how much can and should you refactor. It is possible, given enough time and resources to refactor the system one can keep working with the same system for an indefinite amount of time without costs of maintenance ever superseding cost of replacement. This seems possible to me but the hurdle of normalizing refactoring and building quality software without sacrificing valuable features is a big one. Thats a discussion for another day.

Great episode and I recommend giving it a listen! 🛠️

<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/3wApol9qc1sGuUHKPUXRZ9?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
