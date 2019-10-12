import React from 'react'
import Course from './Course'

const Courses = (props) => {
    const rows = () => props.courses.map((c) => 
    <Course course = {c}/>
    )

return (
    <div>
        {rows()}
    </div>
)

}
export default Courses