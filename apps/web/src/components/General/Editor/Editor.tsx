import useShiki from '$hooks/useShiki'
import CodeEditor from '@rockite/react-code-editor'
import rehypeShikiFromHighlighter from '@shikijs/rehype/core'
import type { RehypeShikiCoreOptions } from '@shikijs/rehype/core'
// import rehypePrism from 'rehype-prism-plus';
// import {
//   transformerRenderWhitespace
// } from '@shikijs/transformers'
// import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import type { ChangeEvent, FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react'
import { useEffect, useState } from 'react'
import { theme } from 'twin.macro'
import '@rockite/react-code-editor/styles.css'
import ButtonSecondary from '$components/General/Styled/ButtonSecondary'
import { useThemeMode } from '$hooks/useThemeMode'
import { cn } from '$lib/utils'
import { Field, Select } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import prettierPluginXml from '@prettier/plugin-xml'
import { AnimatePresence, motion } from 'motion/react'
import prettierPluginBabel from 'prettier/plugins/babel'
import prettierPluginEstree from 'prettier/plugins/estree'
import prettierPluginGraphQL from 'prettier/plugins/graphql'
import prettier from 'prettier/standalone'
import { toast } from 'sonner'
import type { PluggableList } from 'unified'

type EventHandlers = {
  onBlur?: FocusEventHandler<HTMLDivElement> & FocusEventHandler<HTMLTextAreaElement>
  onClick?: MouseEventHandler<HTMLDivElement> & MouseEventHandler<HTMLTextAreaElement>
  onFocus?: FocusEventHandler<HTMLDivElement> & FocusEventHandler<HTMLTextAreaElement>
  onKeyDown?: KeyboardEventHandler<HTMLDivElement> & KeyboardEventHandler<HTMLTextAreaElement>
  onKeyUp?: KeyboardEventHandler<HTMLDivElement> & KeyboardEventHandler<HTMLTextAreaElement>
}

export type EditorProps = EventHandlers & {
  name?: string
  value: string
  onChange: (value: string) => void
  minLines: number
  maxLines: number
  placeholder?: string
}

const LANGUAGES = [
  {
    name: 'text',
    label: 'Text',
    format: 'text',
  },
  {
    name: 'json',
    label: 'JSON',
    format: 'json',
  },
  {
    name: 'xml',
    label: 'XML',
    format: 'xml',
  },
  {
    name: 'graphql',
    label: 'GraphQL',
    format: 'graphql',
  },
]

export default function Editor({
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyUp,
  onKeyDown,
  placeholder,
  minLines,
  maxLines,
}: EditorProps) {
  const appTheme = useThemeMode((state) => state.theme)

  const highlighter = useShiki({
    themes: ['one-dark-pro', 'one-light'],
    langs: LANGUAGES.map((language) => language.format),
  })
  const [rehypePlugins, setRehypePlugins] = useState<PluggableList>([])

  useEffect(() => {
    if (highlighter) {
      setRehypePlugins([
        // [rehypePrism, {
        //   ignoreMissing: true,
        // }],
        [
          rehypeShikiFromHighlighter,
          highlighter,
          {
            themes: {
              light: 'one-light',
              dark: 'one-dark-pro',
            },
            defaultColor: false, // this will set the color to the css vars prefixed with --shiki-
            stripEndNewline: false,
            transformers: [
              // transformerRenderWhitespace(),
              // transformerColorizedBrackets(),
            ],
            cssVariablePrefix: '--shiki-',
            mergeWhitespaces: true,
          } satisfies RehypeShikiCoreOptions,
        ],
      ])
    }
  }, [highlighter])

  const [selectedSyntax, setSyntax] = useState('text')

  function onValueChange(value: string) {
    onChange(value)
  }

  function onFormat() {
    switch (selectedSyntax) {
      case 'json': {
        prettier
          .format(value, {
            parser: 'json',
            plugins: [prettierPluginBabel, prettierPluginEstree],
          })
          .then(onValueChange)
          .catch((e) => toast.error(e.message))
        break
      }
      case 'xml': {
        prettier
          .format(value, {
            parser: 'xml',
            plugins: [prettierPluginXml],
          })
          .then(onValueChange)
          .catch((e) => toast.error(e.message))
        break
      }
      case 'graphql': {
        prettier
          .format(value, {
            parser: 'graphql',
            plugins: [prettierPluginGraphQL],
          })
          .then(onValueChange)
          .catch((e) => toast.error(e.message))
        break
      }
    }
  }

  function onSyntaxChange(event: ChangeEvent<HTMLSelectElement>) {
    setSyntax(event.target.value)
  }

  return (
    <div
      className="flex flex-col w-full editor rounded border border-gray-300 dark:border-gray-700"
      style={{
        minHeight: `${Number(theme`lineHeight.snug`) * minLines}rem`,
        maxHeight: `${Number(theme`lineHeight.snug`) * maxLines}rem`,
      }}
    >
      {/* Header */}
      <div className="flex flex-row justify-between px-2 py-1 border-b border-gray-300 dark:border-gray-700">
        <div className="bg-red-100 flex w-100 truncate text-e">{/* TODO: The Tab to switch between View */}</div>

        <div className="flex flex-row justify-end w-full gap-x-2">
          <AnimatePresence>
            {selectedSyntax !== 'text' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, ease: 'easeInOut', type: 'tween' }}
                exit={{ opacity: 0 }}
              >
                <ButtonSecondary
                  type="button"
                  className="px-2 py-1 rounded text-xs"
                  onClick={onFormat}
                  disabled={!(value && value.length)}
                >
                  Format
                </ButtonSecondary>
              </motion.div>
            )}
          </AnimatePresence>

          <Field className="w-[88px]">
            <div className="relative">
              <Select
                value={selectedSyntax}
                onChange={onSyntaxChange}
                className={cn(
                  'block w-full appearance-none rounded border-none bg-gray-250 dark:bg-gray-800 py-1 px-2 text-xs text-gray-800 dark:text-gray-200',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                )}
              >
                {LANGUAGES.map((language) => (
                  <option key={language.name} value={language.name}>
                    {language.label}
                  </option>
                ))}
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-1 right-2 size-4 fill-gray-800/60 dark:fill-gray-200/60"
                aria-hidden="true"
              />
            </div>
          </Field>
        </div>
      </div>

      <div
        className={cn(
          'rounded-b',
          'editor max-h-full overflow-y-auto',
          '[&::-webkit-scrollbar]:w-2',
          '[&::-webkit-scrollbar-track]:bg-white',
          '[&::-webkit-scrollbar-track]:rounded-full',
          '[&::-webkit-scrollbar-thumb]:bg-gray-300',
          '[&::-webkit-scrollbar-thumb]:rounded-full',
          'dark:[&::-webkit-scrollbar-track]:bg-gray-850',
          'dark:[&::-webkit-scrollbar-thumb]:bg-gray-700',
        )}
      >
        <CodeEditor
          name={name}
          className=""
          value={value}
          language={selectedSyntax}
          placeholder={placeholder}
          onChange={(evt: any) => onChange(evt.target.value)}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          padding={15}
          indentWidth={2}
          style={{
            // outerDiv
            fontFamily: 'DM Mono, monospace',
          }}
          minHeight={Number(theme`lineHeight.snug`) * minLines}
          rehypePlugins={rehypePlugins}
          themeMode={appTheme}
        />
      </div>
    </div>
  )
}
