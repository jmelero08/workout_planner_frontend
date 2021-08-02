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
        <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <img src=${this.image_url} class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${this.title}</h5>
              <p class="card-text">${this.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-muted">Category: ${this.category.name}</small>
              </div>
            </div>
          </div>
        </div>
      `
    }
}

Workout.all = []