'use client'

import { useEffect, useState } from 'react'

export default function WorkerCyclePage() {
  const [message, setMessage] = useState('waiting')

  useEffect(() => {
    import('../lib/spawn.js').then(({ spawn }) => {
      const worker = spawn()
      worker.onmessage = (event) => setMessage(String(event.data))
    })
  }, [])

  return <p id="worker-cycle-message">{message}</p>
}
