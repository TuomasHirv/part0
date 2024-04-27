import Course from './components/Course'

const App = ({courses}) => {
  const kurssit = courses.map(course_ => <Course key = {course_.id} course1 = {course_} />)
  return (
    <div>
      <ul>
        {kurssit}
      </ul>
    </div>
  )
}

export default App