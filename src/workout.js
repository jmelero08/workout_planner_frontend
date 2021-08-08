class Workout{
    constructor(workout, workoutAttributes) {
        this.id = workout.id
        this.title = workoutAttributes.title
        this.description = workoutAttributes.description
        this.image_url = workoutAttributes.image_url
        this.category = workoutAttributes.category
        Workout.all.push(this)
    }

    static findById(id) {
      return this.all.find(workout => workout.id == id);
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
                  <button data-id=${this.id} id="update-workout" type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-muted">Category: ${this.category.name}</small>
              </div>
            </div>
          </div>
        </div>
      `
    }

    renderUpdateForm() {
      return `
      <form data-id=${this.id} >
        <h3>Edit a Workout!</h3>
  
        <label>Title</label>
        <input id='input-title' type="text" name="title" value="${this.title}" class="input-text">
        <br><br>
  
        <label>Description</label>
        <textarea id='input-description' name="description" rows="8" cols="80" value="">${this.description}</textarea>
        <br><br>
  
        <label>Image URL</label>
        <input id='input-url' type="text" name="image" value="${this.image_url}" class="input-text">
        <br><br>
  
        <label>Category</label>
        <select id="categories" name="categories" value="${this.category.name}">
        <option value="1">Chest</option>
        <option value="2">Legs</option>
        <option value="3">Back</option>
        <option value="4">Arms</option>
        </select>
        <br><br>
  
        <input id='edit-button' type="submit" name="submit" value="Edit Workout" class="submit">
      </form>
    `;
    }
}

Workout.all = []