import { createDataSource, createMutableDataSource } from '$services/orm/data-source'
import type Tab from '.'

export const mutableDataSource = createMutableDataSource<Tab>('tabs')

export const dataSource = createDataSource<Tab>('tabs')
