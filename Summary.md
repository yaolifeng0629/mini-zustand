### Next

-   https://www.nextjs.cn/docs/routing/introduction#dynamic-route-segments

---

### How to create other pages?

-   [index routes](https://www.nextjs.cn/docs/routing/introduction#index-routes)

```
pages/index.js → /
pages/blog/index.js → /blog
```

-   [nested routes](https://www.nextjs.cn/docs/routing/introduction#nested-routes)

```
pages/blog/first-post.js → /blog/first-post
pages/dashboard/settings/username.js → /dashboard/settings/username
```

-   [Dynamic router segments](https://www.nextjs.cn/docs/routing/introduction#dynamic-route-segments)
    -   [Dynamic router](https://www.nextjs.cn/docs/routing/dynamic-routes)

```
pages/blog/[slug].js → /blog/:slug (/blog/hello-world)
pages/[username]/settings.js → /:username/settings (/foo/settings)
pages/post/[...all].js → /post/* (/post/2020/id/title)
```

### How to export a component?

-   Will export multi component

```tsx
  export const Button: NextPage = () => { ... }
  export const AnotherComponent: NextPage = () => { ... }
```

-   Will export a default components

```tsx
  export default (() => { ... }) as NextPage;
```

### How to use the styled-components?

```tsx
'use client';
import styled from 'styled-components';

export default function Home() {
    return <Li>1</Li>;
}

const Li = styled.p`
    color: red;
`;
```

### How to use Https Development environment？

```json
"dev": "next dev --experimental-https",
```

### How to dynamic loading components？

```tsx
// pages/index.js
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), {
    loading: () => <p>Loading...</p>, // placeholder content
    ssr: false
});

const Home = () => {
    return (
        <div>
            <h1>Welcome to Next.js</h1>
            <HeavyComponent />
        </div>
    );
};

export default Home;
```

-   components contents:

```tsx
// components/HeavyComponent.js
const HeavyComponent = () => {
    return (
        <div>
            <h2>This is a heavy component!</h2>
        </div>
    );
};

export default HeavyComponent;
```

### How to support preload, preconnect, prefetchDNS?

-   Due to Next.js not directly provides these config, but we can use ReactDOM will link tag security insert the document's `<head>`.

1.  create `app/preload-resources.tsx`

```tsx
'use client';

import ReactDOM from 'react-dom';

export function PreloadResources() {
    ReactDOM.preload('...', { as: '...' }); // ==== <link rel="preload" href="..." as="..." />
    ReactDOM.preconnect('...', { crossOrigin: '...' }); // <link rel="preconnect" href="..." crossorigin />
    ReactDOM.prefetchDNS('...'); // <link rel="dns-prefetch" href="..." />

    return null;
}
```

2.  modify `app/layout.tsx`

```tsx
import PreloadResources from './preload-resources';

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <body>
            <PreloadResources />
            {children}
        </body>
    </html>
);

export default RootLayout;
```
