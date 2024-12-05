export function blob2Uint8Array(blob: Blob) {
  const xhr = new XMLHttpRequest()

  const url = URL.createObjectURL(blob)

  // required if you need to read binary data:
  xhr.overrideMimeType('text/plain; charset=x-user-defined')
  xhr.open('GET', url, false)
  xhr.send()

  // Revoke the object URL after we're done with it
  URL.revokeObjectURL(url)

  const ui8 = Uint8Array.from(xhr.response, (c: string) => c.charCodeAt(0))

  if (ui8.length !== blob.size) {
    throw new Error('Failed to convert Blob to Uint8Array')
  }

  return ui8
}
