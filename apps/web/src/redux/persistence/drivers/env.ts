import env from '../../../helpers/env'
import type State from '../../state'
import type PersistenceDriver from '../persistence-driver'

const driver: PersistenceDriver = {
  load: () => JSON.parse(env('PERSISTENCE_DRIVER_VALUE') as string) as State,
  store: () => {},
}

export default driver
