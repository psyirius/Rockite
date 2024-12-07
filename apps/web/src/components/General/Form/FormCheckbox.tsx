import { cn } from '$lib/utils'
import { useField } from 'formik'
import { TiTick } from 'react-icons/ti'

export interface FormCheckboxProps {
  name: string
  description?: string
}

export default function FormCheckbox({ name, description }: FormCheckboxProps) {
  const [field, , helpers] = useField({ name })

  return (
    <label className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg py-2 px-4 cursor-pointer">
      <div className="mr-4">
        <button
          type="button"
          onClick={async () => {
            await helpers.setValue(!field.value)
            await helpers.setTouched(true)
          }}
          className={cn(
            'w-6 h-6 rounded flex items-center justify-center text-xl',
            field.value && 'bg-purple-600 dark:bg-purple-700 hover:bg-purple-500 hover:dark:bg-purple-600 text-white',
            !field.value &&
              'bg-gray-200 dark:bg-gray-500 hover:bg-gray-300 hover:dark:bg-gray-400 text-gray-600 dark:text-gray-700',
          )}
        >
          <TiTick />
        </button>
      </div>
      <div className="flex-grow">
        {description && <div className="text-sm text-gray-700 dark:text-gray-300">{description}</div>}
      </div>
    </label>
  )
}
