import { createDataSource, createMutableDataSource } from '$services/orm/data-source'
import type SavedPayload from '.'

export const mutableDataSource = createMutableDataSource<SavedPayload>('savedPayloads')

export const dataSource = createDataSource<SavedPayload>('savedPayloads')
