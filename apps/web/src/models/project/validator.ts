import socketProtocolArray from '$services/shared-validators/socket-protocol-array'
import * as yup from 'yup'

export const Validator = {
  name: yup.string().required().label('Project Name').max(50),
  nameLength: 50,
  formatEventPayloads: yup.boolean().required(),
  defaultSocketUrl: yup.string().max(1000),
  defaultSocketProtocols: socketProtocolArray(),
  defaultSocketAutoReconnect: yup.boolean().required(),
}

export default Validator
