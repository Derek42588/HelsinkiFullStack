import React from 'react'

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = ({ course } ) => {
    const rows = () => course.parts.map((c, i) =>
        <Part
          key={i}
          part={c.name}
          exercises = {c.exercises}
        />
      )

    return (
        <div>
            <ul>
                {rows()}
            </ul>
        </div>
    )
}

// const Total = ({ course }) => {

//     const sumExercises = course.parts.map (c => c.exercises)
//     const total = sumExercises.reduce((s, p) => )

//     return (
//         <p style = {{fontWeight: 'bold'}}>
//             total of {total} exercises 
//         </p>
//     )
// }

const Part = (props) => {
    return (
        <p>{props.part} {props.exercises}</p>
    )
}

const Course = (props) => {
  
    console.log(props)
    const { course } = props
  return (
    <div>
      <Header course = {course.name}/>
      <Content course = {course} />
      {/* <Total course = {course} /> */}
    </div>
  )
}

export default Course
