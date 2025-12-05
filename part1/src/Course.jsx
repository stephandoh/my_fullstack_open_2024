// Subcomponent: for a single part
const Part = ({ part }) => (
  <li>{part.name} {part.exercises}</li>
);

// Course component
const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </ul>
      <b>Total of exercises {total}</b>
    </div>
  );
};

export default Course;
