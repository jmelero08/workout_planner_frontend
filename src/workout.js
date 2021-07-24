class Workout{
    constructor(workout, workoutAttributes) {
        this.id = workout.id
        this.title = workoutAttributes.title
        this.description = workoutAttributes.description
        this.image_url = workoutAttributes.image_url
        this.category = workoutAttributes.category
        Workout.all.push(this)
        console.log(this);
    }

    renderWorkoutCard() {
        return `
        <div data-id=${this.id}>
          <img src=${this.image_url} height="200" width="250">
          <h3>${this.title}</h3>
          <p>${this.category.name}</p>
        <button data-id=${this.id}>edit</button>
        </div>
        <br><br>`;
    }
}

Workout.all = []