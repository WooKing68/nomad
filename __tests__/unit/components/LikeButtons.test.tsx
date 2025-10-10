import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LikeButtons from '@/components/LikeButtons'
import { getUserVote, setUserVote } from '@/utils/localStorage'

// Mock localStorage utilities
jest.mock('@/utils/localStorage', () => ({
  getUserVote: jest.fn(),
  setUserVote: jest.fn(),
}))

describe('LikeButtons', () => {
  const mockOnVoteChange = jest.fn()
  const mockGetUserVote = getUserVote as jest.MockedFunction<typeof getUserVote>
  const mockSetUserVote = setUserVote as jest.MockedFunction<typeof setUserVote>

  beforeEach(() => {
    jest.clearAllMocks()
    mockGetUserVote.mockReturnValue(null)
  })

  describe('렌더링 테스트', () => {
    it('초기 좋아요 수가 올바르게 표시됨', async () => {
      render(
        <LikeButtons
          cityId="1"
          initialLikes={42}
          initialDislikes={8}
          onVoteChange={mockOnVoteChange}
        />
      )

      await waitFor(() => {
        expect(screen.getByText('42')).toBeInTheDocument()
      })
    })

    it('초기 싫어요 수가 올바르게 표시됨', async () => {
      render(
        <LikeButtons
          cityId="1"
          initialLikes={42}
          initialDislikes={8}
          onVoteChange={mockOnVoteChange}
        />
      )

      await waitFor(() => {
        expect(screen.getByText('8')).toBeInTheDocument()
      })
    })

    it('좋아요 버튼이 렌더링됨', () => {
      render(
        <LikeButtons
          cityId="1"
          initialLikes={42}
          initialDislikes={8}
          onVoteChange={mockOnVoteChange}
        />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
    })
  })

  describe('좋아요 버튼 클릭 테스트', () => {
    describe('처음 클릭 (null → like)', () => {
      it('좋아요 수가 1 증가', async () => {
        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          expect(screen.getByText('42')).toBeInTheDocument()
        })

        const likeButton = screen.getAllByRole('button')[0]
        fireEvent.click(likeButton)

        await waitFor(() => {
          expect(screen.getByText('43')).toBeInTheDocument()
        })
      })

      it('싫어요 수는 변하지 않음', async () => {
        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          expect(screen.getByText('8')).toBeInTheDocument()
        })

        const likeButton = screen.getAllByRole('button')[0]
        fireEvent.click(likeButton)

        await waitFor(() => {
          expect(screen.getByText('8')).toBeInTheDocument()
        })
      })

      it('localStorage에 like 저장', async () => {
        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          const likeButton = screen.getAllByRole('button')[0]
          fireEvent.click(likeButton)
        })

        await waitFor(() => {
          expect(mockSetUserVote).toHaveBeenCalledWith('1', 'like')
        })
      })

      it('onVoteChange 콜백이 호출됨', async () => {
        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          const likeButton = screen.getAllByRole('button')[0]
          fireEvent.click(likeButton)
        })

        await waitFor(() => {
          expect(mockOnVoteChange).toHaveBeenCalledWith('1', 'like', 43, 8)
        })
      })
    })

    describe('두 번 클릭 (like → null)', () => {
      it('좋아요 수가 1 감소', async () => {
        mockGetUserVote.mockReturnValue('like')

        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          const likeButton = screen.getAllByRole('button')[0]
          fireEvent.click(likeButton)
        })

        await waitFor(() => {
          expect(screen.getByText('41')).toBeInTheDocument()
        })
      })

      it('localStorage에서 투표 삭제', async () => {
        mockGetUserVote.mockReturnValue('like')

        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          const likeButton = screen.getAllByRole('button')[0]
          fireEvent.click(likeButton)
        })

        await waitFor(() => {
          expect(mockSetUserVote).toHaveBeenCalledWith('1', null)
        })
      })
    })

    describe('싫어요 상태에서 클릭 (dislike → like)', () => {
      it('좋아요 수가 1 증가하고 싫어요 수가 1 감소', async () => {
        mockGetUserVote.mockReturnValue('dislike')

        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          const likeButton = screen.getAllByRole('button')[0]
          fireEvent.click(likeButton)
        })

        await waitFor(() => {
          expect(screen.getByText('43')).toBeInTheDocument()
          expect(screen.getByText('7')).toBeInTheDocument()
        })
      })

      it('localStorage에 like 저장', async () => {
        mockGetUserVote.mockReturnValue('dislike')

        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          const likeButton = screen.getAllByRole('button')[0]
          fireEvent.click(likeButton)
        })

        await waitFor(() => {
          expect(mockSetUserVote).toHaveBeenCalledWith('1', 'like')
        })
      })
    })
  })

  describe('싫어요 버튼 클릭 테스트', () => {
    describe('처음 클릭 (null → dislike)', () => {
      it('싫어요 수가 1 증가', async () => {
        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          const dislikeButton = screen.getAllByRole('button')[1]
          fireEvent.click(dislikeButton)
        })

        await waitFor(() => {
          expect(screen.getByText('9')).toBeInTheDocument()
        })
      })

      it('좋아요 수는 변하지 않음', async () => {
        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          const dislikeButton = screen.getAllByRole('button')[1]
          fireEvent.click(dislikeButton)
        })

        await waitFor(() => {
          expect(screen.getByText('42')).toBeInTheDocument()
        })
      })

      it('localStorage에 dislike 저장', async () => {
        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          const dislikeButton = screen.getAllByRole('button')[1]
          fireEvent.click(dislikeButton)
        })

        await waitFor(() => {
          expect(mockSetUserVote).toHaveBeenCalledWith('1', 'dislike')
        })
      })

      it('onVoteChange 콜백이 호출됨', async () => {
        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          const dislikeButton = screen.getAllByRole('button')[1]
          fireEvent.click(dislikeButton)
        })

        await waitFor(() => {
          expect(mockOnVoteChange).toHaveBeenCalledWith('1', 'dislike', 42, 9)
        })
      })
    })

    describe('두 번 클릭 (dislike → null)', () => {
      it('싫어요 수가 1 감소', async () => {
        mockGetUserVote.mockReturnValue('dislike')

        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          const dislikeButton = screen.getAllByRole('button')[1]
          fireEvent.click(dislikeButton)
        })

        await waitFor(() => {
          expect(screen.getByText('7')).toBeInTheDocument()
        })
      })
    })

    describe('좋아요 상태에서 클릭 (like → dislike)', () => {
      it('싫어요 수가 1 증가하고 좋아요 수가 1 감소', async () => {
        mockGetUserVote.mockReturnValue('like')

        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          const dislikeButton = screen.getAllByRole('button')[1]
          fireEvent.click(dislikeButton)
        })

        await waitFor(() => {
          expect(screen.getByText('41')).toBeInTheDocument()
          expect(screen.getByText('9')).toBeInTheDocument()
        })
      })

      it('localStorage에 dislike 저장', async () => {
        mockGetUserVote.mockReturnValue('like')

        render(
          <LikeButtons
            cityId="1"
            initialLikes={42}
            initialDislikes={8}
            onVoteChange={mockOnVoteChange}
          />
        )

        await waitFor(() => {
          const dislikeButton = screen.getAllByRole('button')[1]
          fireEvent.click(dislikeButton)
        })

        await waitFor(() => {
          expect(mockSetUserVote).toHaveBeenCalledWith('1', 'dislike')
        })
      })
    })
  })


  describe('localStorage 통합 테스트', () => {
    it('컴포넌트 마운트 시 localStorage에서 초기 투표 상태를 불러옴', async () => {
      mockGetUserVote.mockReturnValue('like')

      render(
        <LikeButtons
          cityId="1"
          initialLikes={42}
          initialDislikes={8}
          onVoteChange={mockOnVoteChange}
        />
      )

      await waitFor(() => {
        expect(mockGetUserVote).toHaveBeenCalledWith('1')
      })
    })

    it('기존 like 상태가 있을 때 버튼이 활성화 상태로 렌더링됨', async () => {
      mockGetUserVote.mockReturnValue('like')

      const { container } = render(
        <LikeButtons
          cityId="1"
          initialLikes={42}
          initialDislikes={8}
          onVoteChange={mockOnVoteChange}
        />
      )

      await waitFor(() => {
        const likeButton = screen.getAllByRole('button')[0]
        expect(likeButton).toHaveClass('bg-red-50', 'text-red-600')
      })
    })

    it('기존 dislike 상태가 있을 때 버튼이 활성화 상태로 렌더링됨', async () => {
      mockGetUserVote.mockReturnValue('dislike')

      const { container } = render(
        <LikeButtons
          cityId="1"
          initialLikes={42}
          initialDislikes={8}
          onVoteChange={mockOnVoteChange}
        />
      )

      await waitFor(() => {
        const dislikeButton = screen.getAllByRole('button')[1]
        expect(dislikeButton).toHaveClass('bg-gray-100', 'text-gray-700')
      })
    })
  })
})
