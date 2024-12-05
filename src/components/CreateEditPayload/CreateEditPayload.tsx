import SavedPayloadValidator from '$models/saved-payload/validator'
import { PopupContext } from '$providers/PopupProvider'
import { Form, Formik } from 'formik'
import { useContext } from 'react'
import * as yup from 'yup'
import FormEditor from '../General/Form/FormEditor'
import FormField from '../General/Form/FormField'
import FormTextInput from '../General/Form/FormTextInput'
import PopupBody from '../General/Popup/PopupBody'
import PopupButtons from '../General/Popup/PopupButtons'
import Spacer from '../General/Utilities/Spacer'

export interface CreateEditProjectProps {
  name: string
  content: string
  onSave: (name: string, content: string) => void
}

export default function CreateEditPayload({ name, content, onSave }: CreateEditProjectProps) {
  const popup = useContext(PopupContext)

  return (
    <Formik
      initialValues={{
        name,
        content,
      }}
      onSubmit={(value) => {
        onSave(value.name, value.content)
        popup.pop()
      }}
      validationSchema={yup.object({
        name: SavedPayloadValidator.name,
        content: SavedPayloadValidator.content,
      })}
      validateOnChange={false}
      validateOnBlur={false}
    >
      <Form>
        <PopupBody>
          <FormField title="Name">
            <FormTextInput name="name" maxLength={SavedPayloadValidator.nameLength} />
          </FormField>
          <Spacer />
          <FormField title="Content">
            <FormEditor name="content" />
          </FormField>
        </PopupBody>
        <PopupButtons
          actions={[
            {
              label: 'Cancel',
              theme: 'secondary',
              onClick: () => popup.pop(),
            },
            {
              label: 'Save',
              theme: 'primary',
              type: 'submit',
            },
          ]}
        />
      </Form>
    </Formik>
  )
}
