import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BlockRenderer } from '../BlockRenderer'

describe('BlockRenderer', () => {
  it('renders a Hero block with the correct heading and subheading', () => {
    const blocks = [
      {
        blockType: 'hero',
        heading: 'Test Headline',
        subheading: 'Test Subheading',
        image: null,
      },
    ]

    render(<BlockRenderer blocks={blocks} />)

    expect(screen.getByText('Test Headline')).toBeDefined()
    expect(screen.getByText('Test Subheading')).toBeDefined()
  })

  it('renders a Card Grid block with all provided cards', () => {
    const blocks = [
      {
        blockType: 'cardGrid',
        cards: [
          { title: 'Card One', description: 'First card' },
          { title: 'Card Two', description: 'Second card' },
        ],
      },
    ]

    render(<BlockRenderer blocks={blocks} />)

    expect(screen.getByText('Card One')).toBeDefined()
    expect(screen.getByText('Card Two')).toBeDefined()
  })

  it('gracefully skips an unknown block type instead of crashing', () => {
    const blocks = [{ blockType: 'unknownBlockType', someField: 'value' }]

    expect(() => render(<BlockRenderer blocks={blocks} />)).not.toThrow()
  })

  it('returns null when the blocks array is empty', () => {
    const { container } = render(<BlockRenderer blocks={[]} />)
    expect(container.firstChild).toBeNull()
  })
})