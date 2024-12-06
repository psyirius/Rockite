import { createDataSource, createMutableDataSource } from '$services/orm/data-source'
import type Project from '.'

export const mutableDataSource = createMutableDataSource<Project>('projects')

export const dataSource = createDataSource<Project>('projects')
