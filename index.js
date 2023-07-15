const Joi = require('joi')
const express = require('express')


const app = express()

app.use(express.json()); //return piece of middlewear

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
    } else {
        res.send(course)
    }
})
// http://localhost:5000/api/courses/2012/12


// app.get('/api/courses/:years/:months', (req,res) => {
//     res.send(req.query);
// }) 
//query parameter optional stored in key value pairs
// http://localhost:5000/api/courses/2012/12?ahmed=king

app.post('/api/courses', (req, res) => {
    //Input Validation
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.message); 
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course); //convential return the pushed object in body
})

app.put('/api/courses/:id', (req, res) => {
    //look for resourse
    // If not found return 404

    // Validate
    // If Invalid return 400 - Bad Request

    // Update course
    // Return Updated Course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
       return res.status(404).send('The course with the given id was not found')
    }



    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.message) 
    }

    course.name = req.body.name

    res.send(course);

})

app.delete('/api/courses/:id', (req,res)=> {
    // Find Course
    // 404 if not found
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if(!course) return res.status(404).send('Course not found') 


    // Delete 
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return deleted course
    res.send(course);
})


function validateCourse(course) {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(course)
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}..`))
// app.post()
// app.put()
// app.delete()