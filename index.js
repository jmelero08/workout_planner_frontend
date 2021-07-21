const endPoint = "http://localhost:3000/api/v1/workout_plans"

document.addEventListener('DOMContentLoaded', () => {
    getWorkouts()

    const createWorkoutPlanForm = document.querySelector('#create-workoutplan-form')
    createWorkoutPlanForm.addEventListener("submit", (e) => createFormHandler(e))

})

function getWorkouts() {
    fetch(endPoint)
    .then(res => res.json())
    .then(workouts => {
      workouts.data.forEach(workout => {
        const workoutMarkup = `
          <div data-id=${workout.id}>
            <img src=${workout.attributes.image_url} height="200" width="250">
            <h3>${workout.attributes.title}</h3>
            <p>${workout.attributes.category.name}</p>
            <button data-id=${workout.id}>edit</button>
          </div>
          <br><br>`;

          document.querySelector('#workout-container').innerHTML += workoutMarkup
      })
    })
}

function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector('#input-title').value
    const descriptionInput = document.querySelector('#input-description').value
    const imageInput = document.querySelector('#input-url').value
    const categoryId = parseInt(document.querySelector('#categories').value)
    postFetch(titleInput, descriptionInput, imageInput, categoryId)
}

function postFetch(title, description, image_url, category_id){
    // console.log(title, description, image_url, category_id)
    let bodyData = {title, description, image_url, category_id}

    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(workout => {
        console.log(workout)
        const workoutData = workout.data
        // render JSON response
        const workoutMarkup = `
        <div data-id=${workout.id}>
          <img src=${workoutData.attributes.image_url} height="200" width="250">
          <h3>${workoutData.attributes.title}</h3>
          <p>${workoutData.attributes.category.name}</p>
          <button data-id=${workoutData.id}>edit</button>
        </div>
        <br><br>`;
    
        document.querySelector('#workout-container').innerHTML += workoutMarkup;
      })
}

