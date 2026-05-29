import useFeedbackStore from './store'

const Buttons = () => {
  const goodReview = useFeedbackStore(state => state.goodReview)
  const neutralReview = useFeedbackStore(state => state.neutralReview)
  const badReview = useFeedbackStore(state => state.badReview)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={goodReview}>good</button>
      <button onClick={neutralReview}>neutral</button>
      <button onClick={badReview}>bad</button>
    </div>
  )
}

export default Buttons
