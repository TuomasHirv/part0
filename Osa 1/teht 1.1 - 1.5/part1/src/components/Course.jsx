import Parts from "./Parts"
import Sum from "./Sum"

const Course = ({course1}) => {
    {console.log("2 iteraatio", course1)}
    return (
      <div>
        <h1>{course1.name}</h1>
      <ul>
        {course1.parts.map(course =>
        <Parts key = {course.id} course = {course}/>
        )}
      </ul>
      <ul>
        <Sum course = {course1.parts}/>
      </ul>
    </div>
    )
  }
export default Course