import './style.css'
import { downloadDocument } from './downloader'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <button id="downloader" type="button">Download</button>
    </div>
  </div>
`

document.querySelector<HTMLButtonElement>('#downloader')?.addEventListener('click', () => {
  downloadDocument()
})
