import type Project from '$models/project'
import ProjectValidator from '$models/project/validator'
import { PopupContext } from '$providers/PopupProvider'
import type { projectUpdate } from '$redux/actions/projects'
import { Form, Formik } from 'formik'
import { useContext } from 'react'
import * as yup from 'yup'
import FormCheckbox from '../General/Form/FormCheckbox'
import FormField from '../General/Form/FormField'
import FormTextInput from '../General/Form/FormTextInput'
import PopupBody from '../General/Popup/PopupBody'
import PopupButtons from '../General/Popup/PopupButtons'
import Spacer from '../General/Utilities/Spacer'

export interface EditProjectProps {
  project: Project
  onProjectChange: typeof projectUpdate
}

export default function EditProject({ project, onProjectChange }: EditProjectProps) {
  const popup = useContext(PopupContext)

  return (
    <Formik
      initialValues={{
        name: project.name,
        formatEventPayloads: project.formatEventPayloads,
      }}
      validationSchema={yup.object({
        name: ProjectValidator.name,
        formatEventPayloads: ProjectValidator.formatEventPayloads,
      })}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(value) => {
        onProjectChange(project, value)
        popup.pop()
      }}
    >
      <Form>
        <PopupBody>
          <FormField title="Project Name">
            <FormTextInput name="name" placeholder="Project name" maxLength={ProjectValidator.nameLength} />
          </FormField>
          <Spacer />
          <FormField title="Formatting">
            <FormCheckbox
              name="formatEventPayloads"
              description="Prettify JSON payloads sent and received by WebSockets to improve readability."
            />
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
