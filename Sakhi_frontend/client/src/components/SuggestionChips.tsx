import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SuggestionChipsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export default function SuggestionChips({ suggestions, onSuggestionClick }: SuggestionChipsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-wrap gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-testid="suggestion-chips"
    >
      {suggestions.map((suggestion, index) => (
        <motion.div key={index} variants={chipVariants}>
          <Badge
            variant="secondary"
            className="cursor-pointer border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 px-4 py-2 text-sm font-normal hover-elevate active-elevate-2"
            onClick={() => onSuggestionClick(suggestion)}
            data-testid={`suggestion-chip-${index}`}
          >
            {suggestion}
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  );
}
