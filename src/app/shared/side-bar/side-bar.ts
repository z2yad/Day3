import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Dashbord } from '../../feature/dashbord/dashbord';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink,Dashbord],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {

}
