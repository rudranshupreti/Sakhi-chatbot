# Sakhi Yoga Chatbot - Design Guidelines

## Design Philosophy
Create a soft, warm, safe space where Indian women can talk openly about their body, mind, and yoga journey. The interface should feel calming, supportive, and wellness-inspired with a modern Gen-Z elegance.

## Visual Style

### Color Palette
- **Primary:** Lavender (user message bubbles)
- **Secondary:** Soft peach/blush pink (bot message bubbles)
- **Accents:** Pastel peach
- **Base:** Soft white backgrounds
- **Gradients:** Gentle, subtle transitions (not loud or harsh)

### Design Principles
- **NO sharp edges** - everything rounded and soft
- **NO harsh colors** - only pastels and gentle tones
- **Minimal, breathable spacing** - calm and peaceful
- **Smooth rounded cards** throughout
- **Light gradient backgrounds** for depth without heaviness

## Layout Structure

### Full-Height Chat Interface
- **Header Section:**
  - "Sakhi" logo text (elegant, feminine typography)
  - Small lotus or yoga icon
  - Soft gradient background
  
- **Chat Message Area:**
  - Bot messages: Left-aligned, soft peach bubbles
  - User messages: Right-aligned, lavender bubbles
  - Auto-scrolling enabled
  - Generous padding between messages
  - Smooth message appearance animations (Framer Motion)

- **Input Area (Bottom):**
  - Rounded input field with soft borders
  - Send button with pastel gradient styling
  - Microphone icon button placeholder (right side)
  - Sticky positioning at bottom

### Loading States
- Three soft bouncing dots animation
- Pastel colors matching brand
- Smooth, gentle motion

## Typography
- Modern, clean sans-serif fonts
- Soft, readable hierarchy
- Generous line-height for breathing room
- Feminine but professional feel

## Spacing System
Use Tailwind spacing units: 2, 4, 6, 8 for consistency
- Message bubbles: p-4 to p-6
- Section padding: py-6 to py-8
- Chat container: Full viewport height minus header and input

## Component Requirements

### Core Components
1. **Header** - Branding, lotus icon, gradient background
2. **MessageBubble** - Rounded, color-coded by sender
3. **ChatWindow** - Scrollable message container with auto-scroll
4. **InputBar** - Input field + send button + mic icon
5. **LoadingDots** - Three-dot animation for bot thinking

### Animations
- Message slide-in with Framer Motion
- Gentle fade transitions
- Smooth bouncing dots for loading
- NO jarring or harsh animations

## Mobile Responsiveness
- Full-screen mobile experience
- Touch-friendly input areas
- Optimized spacing for smaller screens
- Collapsible sidebar (if implemented)

## UX Feel & Personality
The interface should evoke:
- **Calm** (like Headspace/Calm apps)
- **Safe & supportive** environment
- **Feminine wellness** aesthetic
- **Indian cultural sensitivity** in visual language
- **Approachable** for discussing personal wellness topics

## Technical Implementation Notes
- React component-based architecture
- TailwindCSS for styling
- ShadCN components where beneficial
- Framer Motion for animations
- API placeholder: `http://localhost:8000/chat`

## Images
No hero images or photography required. Use:
- Small lotus/yoga icon in header (SVG from icon library)
- Minimal iconography only where needed
- Focus on color, typography, and gentle gradients for visual interest