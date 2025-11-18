import SuggestionChips from '../SuggestionChips'

export default function SuggestionChipsExample() {
  const suggestions = [
    "Morning yoga routine",
    "Breathing exercises",
    "Meditation tips",
    "Stress relief poses"
  ]

  return (
    <div className="flex flex-col gap-4 p-6">
      <h3 className="text-sm font-medium text-muted-foreground">Try asking about:</h3>
      <SuggestionChips
        suggestions={suggestions}
        onSuggestionClick={(s) => console.log('Clicked:', s)}
      />
    </div>
  )
}
