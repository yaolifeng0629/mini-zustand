## Mini Zustand

-   Implement simply zustand. (Learning only)

## Getting Started

First, install dependence：
```bash
npm install
# or
pnpm install
```
Second, run the development server:

```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

Third, Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes
1.  switching `zustand` or `my-zustand` to see the difference.
2.  open the control, look at the `Applications` localStorage. find `test_persist` key.

## Zustand
-   **zustand** is a lightweight, fast, extensible state management tool. Its core principle is to encapsulate state and state update logic in a separate store, independent of React's context, thus reducing unnecessary rerendering.

### Main features:

-   Simple and straightforward API
-   Use proxy for state management to ensure performance optimization
-   Support middleware mechanism for easy extension

### Notes on using zustand

1. **Prevent state leakage**: Ensure that when using state, you do not modify the state object directly, but update the state through the API provided by zustand.
2. **Selector function**: When using selector functions, try to choose the state with the smallest granularity to avoid unnecessary rendering.
3. **Middleware usage**: Select appropriate middleware according to needs, such as `redux` middleware can implement functions similar to redux.
4. **Asynchronous operations**: Asynchronous operations can be handled in setState, but consistency in state updates must be ensured.
