import { createDataSource, createMutableDataSource } from '$services/orm/data-source'
import type Event from '.'

export const mutableDataSource = createMutableDataSource<Event>('events')

export const dataSource = createDataSource<Event>('events')
