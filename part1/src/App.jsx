 // Define a component responsible for formatting a single course called Course

  const Course = ({ course }) => {
      const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
      console.log('showing course', course.name, 'with total exercises', total, 
        'with course names:', course.parts.map(part => part.name).join(', '))
    return (
      <div>
        <h1>{course.name}</h1>
        <ul>{course.parts.map(part => (<li key={part.id}>{part.name} {part.exercises}</li>))}</ul>
        <b>Total of exercises {total}</b>
      </div>
    )
  }

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
     		name: 'redux',
     		exercises : 11,
     		id: 4
      }

    ]
  }
 
  return <Course course={course} />
}

export default App