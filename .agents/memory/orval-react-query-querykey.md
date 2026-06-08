---
name: Orval react-query hook options require queryKey
description: Why generated useX hooks need an explicit queryKey when you pass query options
---

When passing `query` options into an orval-generated react-query hook (e.g. `useGetMigrationStats({ query: { refetchInterval: 60000 } })`), TypeScript fails with `Property 'queryKey' is missing in type ... UseQueryOptions`.

**Why:** Under react-query v5 strict typing, the generated `query` option is typed as full `UseQueryOptions`, which requires `queryKey`. The hook supplies a default key internally, but the *type* still demands it once you pass any query options. Calling the hook with no args works fine — the error only appears when you pass options.

**How to apply:** Import and pass the generated key helper alongside your options:
`useGetX({ query: { queryKey: getGetXQueryKey(), refetchInterval: 60000 } })`. The `getGetXQueryKey` helper is exported from `@workspace/api-client-react` next to the hook.
