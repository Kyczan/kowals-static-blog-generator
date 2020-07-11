# kowals-static-blog-generator

This CLI utility creates static `.html` pages from provided `.pug` and `.md` files.

Working example can be found in [this github repo](https://github.com/Kyczan/kowal-pro-blog) that contains my blog.

## Creating new blog

### Initial setup

First open terminal, create new blog directory, initialize npm project inside and install `kowals-static-blog-generator`:

```sh
mkdir my-blog
cd my-blog
npm init -y
npm i -S kowals-static-blog-generator
```

Next open `package.json` and add following script in script section:

```json
"scripts": {
  "build": "kowals-static-blog-generator ./src ./dist"
},
```

Now you are able to run following command from terminal

```sh
npm run build
```

Everything what it does - it takes files from `./src` directory, converts to static `.html` files and put them to `./dist` folder.

### `./src` setup

`./src` folder is a place where your blog files live. Structure of this folder should look like this:

```
src/
  |- assets/
  |    |- some-photo.png
  |    `- styles.css
  |
  |- layout/
  |    |- includes/
  |    |    |- _footer.pug
  |    |    `- _header.pug
  |    |
  |    |- layout.pug
  |    `- post.pug
  |
  |- pages/
  |    |- blog.pug
  |    `- index.pug
  |
  `- posts/
       |- 2020-07-04/
       |    |-assets/
       |    `-post.md
       |
       `- 2020-07-10/
            |-assets/
            `-post.md
```

Let's take a closer look:

- `assets/` - there live files that should be copied to `./dist` folder without modifying.
- `layout/` - contains general structure of page written with `.pug` template engine.
- `pages/` - `.pug` files that extends `layout.pug` - they will be translated to `.html` and copied to `./dist`.
- `posts/` - finally - blog posts written in markdown. Every post should be in folder describing its date of creation. Note that every post should be named `post.md`. Layout of post is extended from `post.pug`. Every image related to post can be placed into `assets/` in post directory.

### `./dist` generation

After run `npm run build` command there will be created `./dist` folder with target files:

```
dist/
  |- assets/
  |    |- some-photo.png
  |    `- styles.css
  |
  |- posts/
  |    |- assets/
  |    |- 2020-07-04-some-title.html
  |    `- 2020-07-10-another-title.html
  |
  |- blog.html
  `- index.html
```

This files can be uploaded directly to the server.
