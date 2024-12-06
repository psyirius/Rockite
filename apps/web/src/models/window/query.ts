import { createDataSource, createMutableDataSource } from '$services/orm/data-source'
import type Window from '.'

export const mutableDataSource = createMutableDataSource<Window>('windows')

export const dataSource = createDataSource<Window>('windows')
