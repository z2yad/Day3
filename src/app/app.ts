import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from './shared/side-bar/side-bar';
import { Topbar } from './shared/topbar/topbar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBar, Topbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Task3');
}
