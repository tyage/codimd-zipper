async function fetchDocument() {
  const url = location.pathname + '/download';
  return (await fetch(url)).text()
}

function getDocumentImages(document: string): string[] {
  const imagePattern = /\!\[([^\]]*)\]\(([^)]*)\)/g
  const images = []
  for (let match of document.matchAll(imagePattern)) {
    const url = match[2]
    images.push(url)
  }
  return images
}

async function fetchImages(imageURLs: string[]) {
  console.log(imageURLs)
  throw new Error("Function not implemented.");
}

async function makeZip(document: string, images: void) {
  throw new Error("Function not implemented.");
}

function downloadZip(zip: void) {
  throw new Error("Function not implemented.");
}

async function main() {
  const document = await fetchDocument()
  const imageURLs = getDocumentImages(document)
  const images = await fetchImages(imageURLs)
  const zip = await makeZip(document, images)
  downloadZip(zip)
}

main()

// To supress isolatedModules error
export {}