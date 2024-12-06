import type Model from '$services/orm/model'
import type State from '../state'
import type Table from '../table'

export default interface PersistenceStrategy<T extends Model> {
  shouldBroadcast: boolean
  broadcast?: (model: T) => T
  persist: (table: Table<T>, state: State) => { [key: string]: T }
}
