import { useEffect, useState } from 'react'
import { FaDownload, FaShareSquare, FaTimes } from 'react-icons/fa'
import '../css/InstallApp.css'

function InstallApp() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [showGuide, setShowGuide] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true
    setIsInstalled(standalone)

    const handleBeforeInstall = (event) => {
      event.preventDefault()
      setInstallPrompt(event)
    }

    const handleInstalled = () => {
      setIsInstalled(true)
      setInstallPrompt(null)
      setShowGuide(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) {
      setShowGuide(true)
      return
    }

    await installPrompt.prompt()
    const choice = await installPrompt.userChoice
    if (choice?.outcome === 'accepted') setIsInstalled(true)
    setInstallPrompt(null)
  }

  if (isInstalled) return null

  const userAgent = window.navigator.userAgent
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent)
    || (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)
  const isSafari = /Safari/i.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(userAgent)
  const needsSafari = isIOS && !isSafari

  return (
    <>
      <button className="install-app-button" type="button" onClick={handleInstall}>
        <FaDownload aria-hidden="true" />
        <span>Install app</span>
      </button>

      {showGuide && (
        <div className="install-guide-backdrop" onClick={() => setShowGuide(false)}>
          <section
            className="install-guide"
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-guide-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="install-guide-close" type="button" aria-label="Close install instructions" onClick={() => setShowGuide(false)}>
              <FaTimes />
            </button>
            <div className="install-guide-icon"><FaDownload aria-hidden="true" /></div>
            <h2 id="install-guide-title">Add Ream’s portfolio to your phone</h2>

            {needsSafari ? (
              <>
                <p>This page is open inside another app. iPhone installation is available through Safari.</p>
                <ol>
                  <li>Tap the <strong>…</strong> menu at the top of this screen.</li>
                  <li>Choose <strong>Open in Safari</strong>.</li>
                  <li>In Safari, tap <FaShareSquare aria-label="Share" className="install-share-icon" /> <strong>Share</strong>, then <strong>Add to Home Screen</strong>.</li>
                </ol>
              </>
            ) : isIOS ? (
              <>
                <p>Safari lets you add this website to your iPhone’s Home Screen.</p>
                <ol>
                  <li>Tap the <FaShareSquare aria-label="Share" className="install-share-icon" /> <strong>Share</strong> button in Safari.</li>
                  <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                  <li>Tap <strong>Add</strong> to finish.</li>
                </ol>
              </>
            ) : (
              <>
                <p>Use your browser menu to install this website on your device.</p>
                <ol>
                  <li>Open the browser menu <strong>⋮</strong> or <strong>…</strong>.</li>
                  <li>Choose <strong>Install app</strong> or <strong>Add to Home Screen</strong>.</li>
                </ol>
              </>
            )}
            <button className="install-guide-done" type="button" onClick={() => setShowGuide(false)}>Got it</button>
          </section>
        </div>
      )}
    </>
  )
}

export default InstallApp
