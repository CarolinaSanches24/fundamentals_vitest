import { expect, test } from 'vitest'
import { sum } from '../sum'


test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3) //espera que a soma dos numeros seja igual a 3
})