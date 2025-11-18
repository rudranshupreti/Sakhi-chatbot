import { useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import ChatSidebar from '../ChatSidebar'

export default function ChatSidebarExample() {
  const [conversations, setConversations] = useState([
    {
      id: '1',
      title: 'Morning yoga routine guidance',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      title: 'Breathing exercises for anxiety',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      title: 'Beginner meditation tips',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    },
  ])

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <ChatSidebar
          conversations={conversations}
          activeConversationId="1"
          onSelectConversation={(id) => console.log('Selected:', id)}
          onNewConversation={() => console.log('New conversation')}
          onDeleteConversation={(id) => {
            setConversations(conversations.filter(c => c.id !== id))
            console.log('Deleted:', id)
          }}
          onLogout={() => console.log('Logout')}
          userName="User Name"
        />
      </div>
    </SidebarProvider>
  )
}
