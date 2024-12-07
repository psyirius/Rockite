import { useState } from 'react'
import type { Highlighter } from 'shiki'
import { createHighlighter } from 'shiki'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

type HighlighterOptions = Parameters<typeof createHighlighter>[0]

const useShiki = (options: HighlighterOptions) => {
  const [highlighter, setHighlighter] = useState<Highlighter>()
  const [shouldFetch, setShouldFetch] = useState<boolean>(true)

  if (shouldFetch) {
    setShouldFetch(false)
    createHighlighter({
      engine: createOnigurumaEngine(import('shiki/wasm')),
      ...options,
    }).then(setHighlighter)
  }

  return highlighter
}

export * from 'shiki'

export default useShiki
