---
title: "Adventures in AI: personal podcast generator"
description: "Building a personal tool to learn about things via audio whilst on the move"
pubDate: 2026-05-08
---

Music and audio is a big passion of mine; I worked as a Sound Engineer for several years before becoming a Software Engineer, and played in bands for many years too.

[OpenAI's recent announcement on their audio tooling](https://www.youtube.com/watch?v=JOu8v6CBjkE) was super impressive and really got me inspired to play with some of what's available.

For a while I've been wanting to learn about things via audio whilst I'm on the move. I find it a great way to quickly get an overview of something, without having to invest the time and effort into reading online or a textbook.

## Orra

So I thought I'd build another personal app that solves a very specific need I have: wanting to learn about things via audio whilst I am out and about.

The result was [Orra](https://github.com/chrisjgilbert/orra) – a personal podcast / audio narration tool. I give it an area or topic along with a target duration and it gives me an MP3 back I can listen to.

<figure>
    <img src="/orra.png" alt="" loading="lazy">
    <figcaption>
        My Claude Code review task
    </figcaption>
</figure>

## How it works

It's a Flask app and I give it a description of what I want to learn about and a target duration. That's then sent off to an OpenAI LLM with a system prompt telling it to write me a transcript.

An OpenAI text-to-speech model then produces an audio file for me to listen to.

I played around with [ElevenLabs](https://elevenlabs.io/) as part of this and was similarly super impressed by the quality and breadth of their tooling. I ultimately landed on using OpenAI's model because it was significantly cheaper and the quality is perfect for my needs – it doesn't need to be VO quality.

To generate a 15 minute episode costs a few $ so it's not cheap, but it's valuable enough to use and I make a few podcasts a month.

The app itself has a SQLite DB on a Hetzner machine which gets wiped when I deploy. That's actually fine because I listen once and can download the MP3 if I want to keep it. Wiping the DB saves me from needing to tidy the UI up to handle lots of episodes.

## What's next

I'm really curious to explore more tools in the AI / audio space. For a while I've had this idea about interactive audiobooks where you can speak to characters and shape the story, in the way you could with adventure books many years ago where you could jump to different pages.

ElevenLabs could definitely be powerful enough to do this kind of thing which is pretty cool. I'm also interested in playing with [Suno](https://suno.com/). I've not written any music for years but this is the kind of thing that could get me back in the studio (or on the laptop!).
