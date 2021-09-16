import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import FormCep from './FormCep'

globalFetch = Jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => ({
      cep: '03047000',
      logradouro: 'Rua escorpião',
      bairro: 'Estrelas'
    })
  })
)

it('should render cep form ', async () => {
  const { debug, getByPlaceholderText, container } = render(<FormCep />)

  const cepInput = getByPlaceholderText('CEP').closest('input')
  fireEvent.change(cepInput, { target: { value: '03047000' } })

  await act(() => global.fetch)

  expect(global.fetch).toHaveBeenCalledTimes(1)
  expect(container).toMatchSnapshot()
})