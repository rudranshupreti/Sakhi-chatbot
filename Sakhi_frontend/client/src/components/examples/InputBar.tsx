import { useState } from 'react'
import InputBar from '../InputBar'

export default function InputBarExample() {
  const [messages, setMessages] = useState<string[]>([])

  const handleSend = (message: string) => {
    setMessages([...messages, message])
    console.log('Message sent:', message)
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 text-sm">Sent: {msg}</div>
        ))}
      </div>
      <InputBar onSendMessage={handleSend} />
    </div>
  )
}
