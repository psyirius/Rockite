import Model from '$services/orm/model';
import State from '../state';
import Table from '../table';

export default interface PersistenceStrategy<T extends Model> {
  shouldBroadcast: boolean,
  broadcast?: (model: T) => T,
  persist: (table: Table<T>, state: State) => { [key: string]: T },
}
