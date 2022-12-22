const MDImagePattern = /\!\[([^\]]*)\]\(([^)]*)\)/g

/**
 * Convert url to unique filename
 * Example:
 *   1, https://example.com/images/foo.png -> 1_foo.png
 *   2, ./bar.png -> 2_bar.png
 *
 * @param {string} url
 * @return {*}  {string}
 */
function urlToFilename(prefix: string, url: string): string {
  const basename = url.split('/').pop()
  return prefix + "_" + basename
}

async function fetchDocument() {
  const url = location.pathname + '/download'
  return (await fetch(url)).text()
}

function getDocumentImages(document: string): string[] {
  const images: string[] = []
  for (let match of document.matchAll(MDImagePattern)) {
    const url = match[2]
    // make images unique
    if (!images.includes(url)) {
      images.push(url)
    }
  }
  return images
}

async function fetchImages(imageURLs: string[]) {
  const imageMap = new Map<string, Blob|null>()
  const fetchJobs = imageURLs.map((url) => {
    return new Promise((async (resolve) => {
      try {
        const res = await fetch(url)
        if (!res.ok) {
          throw new Error()
        }
        const blob = await res.blob()
        console.log(blob)
        imageMap.set(url, blob)
      } catch (e) {
        imageMap.set(url, null)
      } finally {
        resolve(url)
      }
    }))
  })
  await Promise.all(fetchJobs)

  return imageMap
}

async function makeZip(document: string, images: Map<string, Blob|null>) {
  // make new filenames for each url
  // filenameMap preserves url -> filename
  const filenameMap = new Map<string, string>()
  let prefix = 0
  for (let [url, blob] of images.entries()) {
    // skip if failed to download the image
    if (blob === null) {
      continue;
    }

    const filename = urlToFilename(prefix.toString(), url)
    filenameMap.set(url, filename)
    ++prefix
  }

  // convert url in document to new filenames
  document = document.replaceAll(MDImagePattern, (original, alt, url) => {
    const filename = filenameMap.get(url)
    return filename === undefined ? original : `![${alt}](${filename})`
  })

  // make zip file
  console.log(document, filenameMap)
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