import MessageBubble from '../MessageBubble'

export default function MessageBubbleExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <MessageBubble 
        content="Namaste! I'm Sakhi, your wellness companion. How can I support you today?" 
        sender="bot" 
        timestamp={new Date()}
      />
      <MessageBubble 
        content="I'd love some guidance on morning yoga for beginners" 
        sender="user" 
        timestamp={new Date()}
      />
      <MessageBubble 
        content="That's wonderful! Starting your day with yoga is such a beautiful practice. Let me share a gentle 10-minute morning flow perfect for beginners..." 
        sender="bot" 
        timestamp={new Date()}
      />
    </div>
  )
}
