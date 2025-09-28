import { BudgetType } from '@/types/filter'

interface BudgetFilterProps {
  selected: BudgetType | null
  onChange: (value: BudgetType | null) => void
}

const budgetOptions: BudgetType[] = ['100만원', '100~200만원', '200만원']

export default function BudgetFilter({ selected, onChange }: BudgetFilterProps) {
  const handleOptionClick = (option: BudgetType) => {
    const newValue = selected === option ? null : option
    onChange(newValue)
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-3">예산</h3>
      <div className="space-y-2">
        {budgetOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selected === option
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}