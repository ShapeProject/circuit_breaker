import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'
import React from 'react'

describe('Buttonコンポーネントのテスト', () => {
  it('正しくレンダリングされる', () => {
    render(<Button>Test</Button>)

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument()
  })

  it('children propsからのテキストが正しく表示される', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('ボタン固有の属性(disabled)が正しく適用される', () => {
    render(<Button disabled={true}>Disabled Button</Button>)

    const buttonElement = screen.getByText('Disabled Button')
    expect(buttonElement).toBeDisabled()
  })

  it('クリック時にonClickイベントハンドラがトリガーされる', () => {
    const handleClick = jest.fn()

    render(<Button onClick={handleClick}>Click me</Button>)

    const buttonElement = screen.getByText('Click me')
    fireEvent.click(buttonElement)

    expect(handleClick).toHaveBeenCalled()
  })
})
