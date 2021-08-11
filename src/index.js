const endPoint = "http://localhost:3000/api/v1/workout_plans"



document.addEventListener('DOMContentLoaded', () => {
    getWorkouts()

    const createWorkoutPlanForm = document.querySelector('#create-workoutplan-form')
    createWorkoutPlanForm.addEventListener("submit", (e) => createFormHandler(e))

    const workoutplanContainer = document.querySelector('#workout-container')
    workoutplanContainer.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      const workoutplan = Workout.findById(id);
      document.querySelector('#update-workout').innerHTML = workoutplan.renderUpdateForm();
     })
      document.querySelector('#update-workout').addEventListener('submit', e => updateFormHandler(e))
 })


function getWorkouts() {
    fetch(endPoint)
    .then(res => res.json())
    .then(workouts => {
      workouts.data.forEach(workout => {
        let newWorkout = new Workout(workout, workout.attributes)
        document.querySelector('#workout-container').innerHTML += newWorkout.renderWorkoutCard()
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
        let newWorkout = new Workout(workoutData, workoutData.attributes)
        document.querySelector('#workout-container').innerHTML += newWorkout.renderWorkoutCard()
      })
}

function updateFormHandler(e) {
  e.preventDefault();
  const id = parseInt(e.target.dataset.id);
  const workoutplan = Workout.findById(id);
  const title = e.target.querySelector('#input-title').value;
  const description = e.target.querySelector('#input-description').value;
  const image_url = e.target.querySelector('#input-url').value;
  const category_id = parseInt(e.target.querySelector('#categories').value);
  patchWorkoutPlan(workoutplan, title, description, image_url, category_id)
}

function patchWorkoutPlan(workoutplan, title, description, image_url, category_id) {
  const bodyJSON = { title, description, image_url, category_id }
  fetch(`http://localhost:3000/api/v1/workout_plans/${workoutplan.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(bodyJSON),
  })
    .then(res => res.json())
    .then(updatedworkout => {
      const workout = Workout.findById(updatedworkout.data.id);
      workout.update(updatedworkout.data.attributes);
      document.querySelector('#workout-container').innerHTML = '';
      Workout.all.forEach(workout => document.querySelector('#workout-container').innerHTML += workout.renderWorkoutCard());
      document.querySelector('#update-workout').innerHTML = '';
    })
}
