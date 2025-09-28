import { EnvironmentType } from '@/types/filter'

interface EnvironmentFilterProps {
  selected: EnvironmentType | null
  onChange: (value: EnvironmentType | null) => void
}

const environmentOptions: EnvironmentType[] = ['자연친화', '도심선호', '카페작업', '코워킹 필수']

export default function EnvironmentFilter({ selected, onChange }: EnvironmentFilterProps) {
  const handleOptionClick = (option: EnvironmentType) => {
    const newValue = selected === option ? null : option
    onChange(newValue)
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-3">환경</h3>
      <div className="space-y-2">
        {environmentOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selected === option
                ? 'bg-purple-100 text-purple-800 border border-purple-300'
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