import { compose, lensPath, over, view, set, inc, dec, not } from 'ramda'

const LIKED = 'LIKED'
const DISLIKED = 'DISLIKED'
const initialState = [
  { likes: { count: 10 }, isLiked: false, postId: 1 },
  { likes: { count: 42 }, isLiked: false, postId: 2 },
  { likes: { count: 5 }, isLiked: true, postId: 3 },
]

//TODO: create lenses for likes count and for isLiked
//TIP: it should have dynamic arg index

const reducer = (state = initialState, { type, index }) => {
  switch (type) {
    case LIKED:
      // TODO: refactor this with lenses!
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          likes: { count: state[index].likes.count + 1 },
          isLiked: true,
        },
        ...state.slice(index + 1),
      ]
    case DISLIKED:
      // TODO: refactor this with lenses!
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          likes: { count: state[index].likes.count - 1 },
          isLiked: false,
        },
        ...state.slice(index + 1),
      ]
    default:
      state
  }
}

describe('Lenses in selectors', () => {
  it('should get like count from state', () => {
    //TODO: use likesCount lens here
    const index = 0
    expect(initialState[index].likes.count).toBe(10)
  })

  it('should get user has liked from state', () => {
    //TODO: use isLiked lens here
    const index = 0
    expect(initialState[index].isLiked).toBe(false)
  })
})

describe('Lenses in reducers', () => {
  it('should increment like count and set hasLiked to true on LIKED action', () => {
    const index = 1
    expect(initialState[index].likes.count).toBe(42)
    expect(initialState[index].isLiked).toBe(false)

    const newState = reducer(initialState, { type: LIKED, index })

    expect(newState[index].likes.count).toBe(43)
    expect(newState[index].isLiked).toBe(true)
  })

  it('should decrement like count and set hasLiked to false on DISLIKED action', () => {
    const index = 2
    expect(initialState[index].likes.count).toBe(5)
    expect(initialState[index].isLiked).toBe(true)

    const newState = reducer(initialState, { type: DISLIKED, index })

    expect(newState[index].likes.count).toBe(4)
    expect(newState[index].isLiked).toBe(false)
  })
})
