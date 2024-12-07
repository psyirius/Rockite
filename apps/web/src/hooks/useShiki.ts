import { useState } from 'react'
import { type Highlighter, createHighlighter } from 'shiki'

type HighlighterOptions = Parameters<typeof createHighlighter>[0]

const useShiki = (options: HighlighterOptions) => {
  const [highlighter, setHighlighter] = useState<Highlighter>()
  const [shouldFetch, setShouldFetch] = useState<boolean>(true)

  if (shouldFetch) {
    setShouldFetch(false)
    createHighlighter(options).then(setHighlighter)
  }

  return highlighter
}

export * from 'shiki'

export default useShiki
