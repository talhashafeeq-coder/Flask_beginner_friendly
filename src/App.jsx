import React from 'react'
import { Routes, Route } from 'react-router-dom'
import IndexUrl from './Hooks/IndexUrl'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<IndexUrl.Dashboard />} />
        <Route path='/html' element={<IndexUrl.HtmlPage />} />
        <Route path='/css' element={<IndexUrl.CssPage />} />
        <Route path='/javascript' element={<IndexUrl.JavaScript />} />
        <Route path='/admin/*' element={<IndexUrl.Admin />} />
        <Route path="/content_course" element={<IndexUrl.CourseContent />} />
        <Route path='/python' element={<IndexUrl.Python />} />
        <Route path='/exam_content' element={<IndexUrl.ExamContent />} />
        <Route path='/question_content' element={<IndexUrl.QuestionContent />} />
        <Route path='/question_content_add' element={<IndexUrl.AddQuestion />} />
        <Route path='/addcourse' element={<IndexUrl.AddCourse />} />
        <Route path='/java' element={<IndexUrl.Javapage />} />
        <Route path='/addsubtopic' element={<IndexUrl.AddSubtopicForm />} />
      </Routes>
    </div>
  )
}
