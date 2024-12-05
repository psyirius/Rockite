import { createDataSource, createMutableDataSource } from '$services/orm/data-source'
import type InternalProperty from '.'

export const mutableDataSource =
  createMutableDataSource<InternalProperty<string | number | boolean>>('internalProperties')

export const dataSource = createDataSource<InternalProperty<string | number | boolean>>('internalProperties')
