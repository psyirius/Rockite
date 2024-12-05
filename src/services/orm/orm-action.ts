import type State from '$redux/state'
import type Model from './model'

export enum MutationType {
  Create = 0,
  Update = 1,
  Delete = 2,
}

export interface Mutation<T extends Model> {
  type: MutationType
  payload: {
    table: keyof State
    models?: T[]
    fields?: Partial<T>
  }
}

export enum OrmActionType {
  Mutations = 100,
  BroadcastedMutations = 101,
}

export default interface OrmAction {
  type: OrmActionType.Mutations
  payload: Mutation<Model>[]
}
