import { sep } from 'path'
import { IO, Maybe, Either, getProp } from 'crocks'
import { chain, compose, identity, split, last } from 'ramda'

const { Just, Nothing } = Maybe
const { Left, Right } = Either

describe('Monads', () => {
  // Exercise 1 ✅
  test('Use getProp and chain to safely get the street name when given a user.', () => {
    //Note getProp from crocks returns Maybe
    const user = {
      id: 2,
      name: 'albert',
      address: {
        street: {
          number: 22,
          name: 'Walnut St',
        },
      },
    }
    // getStreetName :: User -> Maybe String
    const getStreetName = identity

    expect(getStreetName().equals(Nothing())).toBeTruthy()
    expect(getStreetName({}).equals(Nothing())).toBeTruthy()
    expect(getStreetName(user).equals(Maybe('Walnut St'))).toBeTruthy()
  })

  // Exercise 2 ✅
  test('Use chain to safely calculate half of given number', () => {
    // works on even numbers
    const half = val => (val % 2 == 0 ? [val / 2] : [])

    const lastHalfOfList = identity

    expect(lastHalfOfList([])).toEqual([])
    expect(lastHalfOfList([3])).toEqual([])
    expect(lastHalfOfList([40])).toEqual([5])
  })

  //BONUS

  // Exercise 3 🤔
  test("Use getFile to get the filename, remove the directory so it's just the file, then purely log it.", () => {
    // getFile :: IO String
    const getFile = () => IO.of(__filename)
    // pureLog :: String -> IO ()
    const pureLog = x => IO.of(`logged ${x}`)
    // logFilename :: IO String
    const logFilename = identity

    logFilename().run(succ => expect(succ).toBe('logged monads.js'))
  })
})
