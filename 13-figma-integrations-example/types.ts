export type TComponent = {
  key: string
  name: string
  description: string
  remote: boolean
  documentationLinks: string[]
}

export type TComponents = {
  [key: string]: TComponent
}

export type TSelectedNode = {
  id: string
  name: string
}

export type TDownloadResponse = {
  err: string
  images: { [key: string]: string }
}
