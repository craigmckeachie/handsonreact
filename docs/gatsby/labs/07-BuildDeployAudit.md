---
title: 'Build & Deploy'
---



### Create a production build

1. Stop the development server (if it's still running) and run the following command:

```shell
gatsby build
```

> This does a production build of your site and outputs the built static files into the `public` directory.

2. View the production site locally. Run:

```shell
gatsby serve
```

Once this starts, you can view your site at `http://localhost:9000`.

### Run a Lighthouse audit

Now you're going to run your first Lighthouse test.

1. If you haven't already done so, open the site *in Chrome Incognito Mode* so no extensions interfere with the test. Then, open up the Chrome DevTools.

2. Click on the "Lighthouse" tab.

3. Click "Generate report" (All available audit types should be selected by default). (It'll then take a minute or so to generate the report).
4. Once the report is complete, you can see, Gatsby's performance is excellent out of the box but you're missing some things for PWA, Accessibility, Best Practices, and SEO that will improve your scores (and in the process make your site much more friendly to visitors and search engines).

## PWA

If you are interested, here are the [steps to enable the site as a PWA](https://www.gatsbyjs.com/docs/tutorial/part-eight/#add-a-manifest-file).
