import socketProtocolArray from '$services/shared-validators/socket-protocol-array'
import * as yup from 'yup'

const Validator = {
  name: yup.string().required().label('Connection Name'),
  nameLength: 20,
  socketProtocols: socketProtocolArray(),
  socketAutoReconnect: yup.boolean().required(),
}

export default Validator
