import { Async, Identity, IO, Maybe, Either, either, getProp } from 'crocks'
import { add, compose, concat, prop, map, head, toUpper, identity } from 'ramda'

const { Just, Nothing } = Maybe
const { Left, Right } = Either

describe('Functors', () => {
  // Exercise 1
  test('Use add(x,y) and map(f,x) to make a function that increments a value inside a functor.', () => {
    // TODO: incrF :: Functor f => f Int -> f Int
    const incrF = identity
    expect(incrF(Identity(1)).equals(Identity(2))).toBeTruthy()
  })

  // Exercise 2
  test('Use head to get the first element of the list.', () => {
    const xs = Identity.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
    // TODO: first :: [String] -> String
    const first = identity
    expect(first(xs).equals(Identity('do'))).toBeTruthy()
  })

  // Exercise 3
  test('Use getProp and head to find the first initial of the user.', () => {
    const user = { id: 2, name: 'Albert' }
    // HINT: getProp :: (String | Integer) -> a -> Maybe b
    // TODO: initial :: User -> Maybe String
    const initial = identity
    expect(initial(user).equals(Just('A'))).toBeTruthy()
    expect(initial({}).equals(Nothing())).toBeTruthy()
  })

  // Exercise 4
  test('Use Maybe instead of if statement. ', () => {
    const safeNum = function(n) {
      if (n) {
        return parseInt(n)
      }
    }

    // safeNum :: Number -> Maybe(Number)
    // TODO: const safeNum = identity
    // const safeNum = identity

    expect(safeNum('4').equals(Maybe(4))).toBeTruthy()
  })

  // Exercise 5
  test('Write a function that uses checkActive() and showWelcome() to grant access or return the error.', () => {
    const showWelcome = compose(
      concat('Welcome '),
      prop('name')
    )
    const checkActive = user => (user.active ? Right(user) : Left('Your account is not active'))
    // TODO: eitherWelcome :: User -> Either String String
    const eitherWelcome = identity
    expect(
      eitherWelcome({ name: 'Flavio', active: true }).equals(Right('Welcome Flavio'))
    ).toBeTruthy()
    expect(
      eitherWelcome({ name: 'Yannick', active: false }).equals(Left('Your account is not active'))
    ).toBeTruthy()
  })

  // Exercise 6
  test('Write a validation function that checks for a length > 3.', () => {
    //  It should return Right(x) if it is greater than 3 and Left("You need > 3") otherwise.
    // TODO: validateName :: User -> Either String ()
    const errorMessage = 'You need > 3'
    const validateName = identity

    expect(validateName('hello').equals(Right('hello'))).toBeTruthy()
    expect(validateName('fla').equals(Left(errorMessage))).toBeTruthy()
  })
})
