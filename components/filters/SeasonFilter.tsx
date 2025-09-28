import { SeasonType } from '@/types/filter'

interface SeasonFilterProps {
  selected: SeasonType | null
  onChange: (value: SeasonType | null) => void
}

const seasonOptions: SeasonType[] = ['봄', '여름', '가을', '겨울']

export default function SeasonFilter({ selected, onChange }: SeasonFilterProps) {
  const handleOptionClick = (option: SeasonType) => {
    const newValue = selected === option ? null : option
    onChange(newValue)
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-3">최고 계절</h3>
      <div className="space-y-2">
        {seasonOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selected === option
                ? 'bg-orange-100 text-orange-800 border border-orange-300'
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