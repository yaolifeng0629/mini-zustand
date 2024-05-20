### How to create other pages?

- [index routes](https://www.nextjs.cn/docs/routing/introduction#index-routes)

```
pages/index.js → /
pages/blog/index.js → /blog
```
- [nested routes](https://www.nextjs.cn/docs/routing/introduction#nested-routes)

```
pages/blog/first-post.js → /blog/first-post
pages/dashboard/settings/username.js → /dashboard/settings/username
```

- [Dynamic router segments](https://www.nextjs.cn/docs/routing/introduction#dynamic-route-segments)
  - [Dynamic router](https://www.nextjs.cn/docs/routing/dynamic-routes)
```
pages/blog/[slug].js → /blog/:slug (/blog/hello-world)
pages/[username]/settings.js → /:username/settings (/foo/settings)
pages/post/[...all].js → /post/* (/post/2020/id/title)
```
