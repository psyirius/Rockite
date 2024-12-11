export interface Migration {
  id: string
  execute: (state: any) => any
}
