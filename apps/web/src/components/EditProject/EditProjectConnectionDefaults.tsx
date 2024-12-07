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
import FormTextInputArray from '../General/Form/FormTextInputArray'
import PopupBody from '../General/Popup/PopupBody'
import PopupButtons from '../General/Popup/PopupButtons'
import Link from '../General/Styled/Link'
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
        defaultSocketUrl: project.defaultSocketUrl,
        defaultSocketProtocols: project.defaultSocketProtocols,
        defaultSocketAutoReconnect: project.defaultSocketAutoReconnect,
      }}
      validationSchema={yup.object({
        defaultSocketUrl: ProjectValidator.defaultSocketUrl,
        defaultSocketProtocols: ProjectValidator.defaultSocketProtocols,
        defaultSocketAutoReconnect: ProjectValidator.defaultSocketAutoReconnect,
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
          <p className="text-gray-900 dark:text-gray-100">
            When a new connection is created, it is automatically populated with the defaults listed below.
          </p>
          <Spacer />
          <FormField title="WebSocket URL">
            <FormTextInput name="defaultSocketUrl" placeholder="WebSocket URL" />
          </FormField>
          <Spacer />
          <FormField
            title="Websocket Protocols"
            description={
              <>
                Set the Sec-WebSocket-Protocol header when connecting to a WebSocket. It&#39;s not possible to set other
                headers, see{' '}
                <Link href="https://stackoverflow.com/a/4361358" target="_blank" rel="noreferrer">
                  this
                </Link>{' '}
                StackOverflow answer for more details.
              </>
            }
          >
            <FormTextInputArray name="defaultSocketProtocols" addItemCta="Add Protocol" />
          </FormField>
          <Spacer />
          <FormField title="Auto Reconnect">
            <FormCheckbox
              name="defaultSocketAutoReconnect"
              description="Attempt to reconnect to the WebSocket after being disconnected."
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
