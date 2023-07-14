const express = require('express')
const app = express()

const courses = [
    { id: 1, name: 'Course1' },
    { id: 2, name: 'Course2' },
    { id: 3, name: 'Course3' }
]

app.get('/', (req, res) => {
    res.send('Hello World!!!..')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send('The course with the given id was not found')
    } else
    {
        res.send(course)
    }
})
// http://localhost:5000/api/courses/2012/12


// app.get('/api/courses/:years/:months', (req,res) => {
//     res.send(req.query);
// }) 
//query parameter optional stored in key value pairs
// http://localhost:5000/api/courses/2012/12?ahmed=king



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}..`))
// app.post()
// app.put()
// app.delete()