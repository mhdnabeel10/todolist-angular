import { Component,OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

interface Todo {
 id:number;
 task:string;
 
}

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
 todoList : Todo[] = []
 nextId: number = 1
  
ngOnInit() : void{
  if (typeof window !== 'undefined' && window.localStorage){
  const savedTask = localStorage.getItem('todoList');
  if (savedTask){
    this.todoList = JSON.parse(savedTask);

    this.nextId = this.todoList.length ? Math.max(...this.todoList.map(task => task.id)) + 1 : 1; 
   }
  }
}

 addTask(task:string): void{
  task=task.trim();
  if (task){
    this.todoList.push({
      id: this.nextId++,
      task:task,
    });
    this.saveTasks();
  }
 }
 deleteTask(id: number): void{
  this.todoList = this.todoList.filter(task => task.id !== id);
  this.saveTasks();
 }

 saveTasks(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
}
}

