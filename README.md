# college-application
This is a sample college API application written using Node.js and Express.js to allow for the functional requirements of a college.

The application connectes to a MySQL database in the backend.

## Table of Contents

- [Install](#Install)
- [Usage](#Usage)
- [Testing](#Testing)
- [Contributing](#Contributing)
- [License](#License)

## Install

This package is written using Node.js version `v22.5.0`.

To install this application, clone the git repository:
```sh
git clone https://github.com/aisha-als/college-api.git
```

To install the dependencies, run the following command:
```sh
npm install
```

The dependencies are defined in [package.json](college-api/package.json) file.

## Usage

Update the [db.js](college-api/src/app/services/db.js) file with the parameters to connect to your MySQL database.

To start the Node.js server, run:
```sh
cd src
node server.js
```

Authorisation is implemented by sending the UserID as a header in the http request using the key:
`UserID`

The Courses API endpoints and a sample required body for this application are:

- List available courses (student role)

    `GET /api/courses/availablecourses`

- Enable a course (admin role)

    `PUT /api/courses/enable`

    Body:
`{
"CourseID": "4"
}`

- Disable a course (admin role)

    `PUT /api/courses/disable`

    Body:
`{
"CourseID": "4"
}`

- Assign a course (admin role)

    `PUT /api/courses/assign`

    Body:
`{
  "CourseID": "6",
  "TeacherID": "6"
}`

The Enrolments API endpoints and a sample required body for this application are:

- Enrol into a course (student role)

    `POST /api/enrolments/enrol`

    Body:
`{
  "CourseID": "5"
}`

- Pass a student (teacher role)

    `PUT /api/enrolments/pass`

    Body:
`{
  "CourseID": "1",
  "StudentID": "6"
}`

- Fail a student (teacher role)

    `PUT /api/enrolments/fail`

    Body:
`{
  "CourseID": "1",
  "StudentID": "6"
}`

## Testing

Testing has been done using Postman to send HTTP requests to the API endpoints. A [Postman collection file](college-api/tests/college-api.postman_collection.json) has been added to 
the `tests/` directory.


## Contributing

Please open a PR for contributions.

## License

MIT License.

See license in [LICENSE](college-api/LICENSE)