type ContextType<T> = {
  close: boolean
  selectedItem: T | undefined
  x: number
  y: number
}
