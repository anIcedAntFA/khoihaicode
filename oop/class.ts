class Task {
  // Properties
  private id: number;
  private title: string;
  private description: string;
  private dueDate: Date;
  private completed: boolean;

  // Constructor
  constructor(taskInfo: {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
  }) {
    this.id = taskInfo.id;
    this.title = taskInfo.title;
    this.description = taskInfo.description;
    this.dueDate = taskInfo.dueDate;
    this.completed = false; // By default, the task is not completed
  }

  // Method to mark the task as completed
  public complete() {
    this.completed = true;
  }

  // Method to mark the task as incomplete
  public incomplete() {
    this.completed = false;
  }
}

// Create instances of the Task class using an object as a parameter
const task1 = new Task({
  id: 1,
  title: 'Finish report',
  description: 'Write the quarterly report for the team meeting',
  dueDate: new Date('2120-03-25'),
});

const task2 = new Task({
  id: 2,
  title: 'Buy groceries',
  description: 'Buy milk, eggs, and bread',
  dueDate: new Date('2077-11-17'),
});

// Mark task1 as completed
task1.complete();

// Output task details
console.log(task1);
console.log(task2);
