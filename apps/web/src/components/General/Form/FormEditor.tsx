import { cn } from '$lib/utils'
import { ErrorMessage, useField } from 'formik'
import { useState } from 'react'
import Editor from '../Editor/Editor'

export interface FormEditorProps {
  name: string
}

export default function FormEditor({ name }: FormEditorProps) {
  const [field, , helpers] = useField({ name })
  const [isFocused, setIsFocused] = useState<boolean>(false)

  return (
    <>
      <div
        className={cn(
          'overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg border-2 py-2 px-4',
          isFocused && 'border-gray-400 dark:border-gray-600',
          !isFocused && 'border-gray-200 dark:border-gray-700',
        )}
      >
        <Editor
          name={field.name}
          onChange={(value) => {
            helpers.setValue(value)
            helpers.setTouched(true)
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={(event) => {
            setIsFocused(false)
            field.onBlur(event)
          }}
          value={field.value}
          minLines={10}
          maxLines={20}
        />
      </div>
      <ErrorMessage name={name} component="div" className="pt-2 text-red-800 text-sm font-semibold" />
    </>
  )
}
