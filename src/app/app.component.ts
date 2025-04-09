import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MainComponent} from './main/main.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MainComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyBalaton';
}
