import { cn } from '$lib/utils'
import { useField } from 'formik'
import { Fragment, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { v4 as uuid } from 'uuid'
import ButtonSecondary from '../Styled/ButtonSecondary'

export interface FormTextInputArrayProps {
  name: string
  maxLength?: number
  addItemCta: string
}

export default function FormTextInputArray({ name, maxLength, addItemCta }: FormTextInputArrayProps) {
  const [field, meta, helpers] = useField<{ id: string; value: string }[]>({ name })
  const [focusedItem, setFocusedItem] = useState<{ id: string; value: string } | undefined>(undefined)

  return (
    <>
      <div
        className={cn(
          'w-full overflow-hidden bg-gray-100 dark:bg-gray-850 rounded-lg border-2 text-gray-800 dark:text-gray-300',
          focusedItem !== undefined && 'border-gray-400 dark:border-gray-600',
          focusedItem === undefined && 'border-gray-200 dark:border-gray-700',
        )}
      >
        {field.value.map((item) => (
          <Fragment key={item.id}>
            <div className="group flex items-center">
              <input
                type="text"
                className="w-full py-1 px-4 bg-transparent"
                maxLength={maxLength}
                value={item.value}
                onFocus={() => setFocusedItem(item)}
                onBlur={() => setFocusedItem(undefined)}
                onChange={async (event) => {
                  await helpers.setValue(
                    field.value.map((existingItem) =>
                      item === existingItem
                        ? {
                            id: existingItem.id,
                            value: event.target.value,
                          }
                        : existingItem,
                    ),
                  )
                  await helpers.setTouched(true)
                }}
              />
              <ButtonSecondary
                type="button"
                className="mr-3 h-fit p-1 invisible group-hover:visible rounded"
                onClick={() => helpers.setValue(field.value.filter((existingItem) => existingItem.id !== item.id))}
              >
                <MdClose size={14} />
              </ButtonSecondary>
            </div>

            {/* Underline */}
            <div
              className={cn(
                'border-b border-gray-200 dark:border-gray-700 mx-3',
                focusedItem?.id === item.id && 'border-gray-400 dark:border-gray-600',
              )}
            />
          </Fragment>
        ))}

        <ButtonSecondary
          type="button"
          className={'w-full text-xs h-8 text-center'}
          onClick={() => helpers.setValue([...field.value, { id: uuid(), value: '' }])}
        >
          {addItemCta}
        </ButtonSecondary>
      </div>

      {meta.error && (
        <div className="pt-2 text-red-800 text-sm font-semibold">
          {typeof meta.error === 'string' ? meta.error : (meta.error as any)?.find((error: any) => !!error).value}
        </div>
      )}
    </>
  )
}
