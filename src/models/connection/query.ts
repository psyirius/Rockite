import { createDataSource, createMutableDataSource } from '$services/orm/data-source'
import type Connection from '.'

export const mutableDataSource = createMutableDataSource<Connection>('connections')

export const dataSource = createDataSource<Connection>('connections')
