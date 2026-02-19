# Amrutha Satishkumar - GitHub Pages

This site is built with Jekyll and designed for GitHub Pages.

## Add a new post
1. Create a file in `_posts` named `YYYY-MM-DD-title.md`.
2. Add front matter:
   ```yaml
   ---
   title: "Post title"
   date: YYYY-MM-DD
   categories: [ai]
   ---
   ```
3. Write the first paragraph as the excerpt and add `<!--more-->` where you want it to end.

## Update LinkedIn links
Edit `_data/linkedin.yml` and replace the placeholder URLs and text.

## Deploy on GitHub Pages
1. Push to the `main` branch.
2. In GitHub repository settings, set Pages to build from `main` / root.
3. GitHub Pages will run Jekyll automatically.
