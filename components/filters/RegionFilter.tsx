import { RegionType } from '@/types/filter'

interface RegionFilterProps {
  selected: RegionType | null
  onChange: (value: RegionType | null) => void
}

const regionOptions: RegionType[] = ['전체', '수도권', '경상도', '전라도', '강원도', '제주도', '충청도']

export default function RegionFilter({ selected, onChange }: RegionFilterProps) {
  const handleOptionClick = (option: RegionType) => {
    const newValue = selected === option ? null : option
    onChange(newValue)
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-3">지역</h3>
      <div className="space-y-2">
        {regionOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selected === option
                ? 'bg-green-100 text-green-800 border border-green-300'
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