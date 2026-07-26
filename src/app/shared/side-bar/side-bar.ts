import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink,NgClass],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
 isopensidebar = false;
  ToggleSidebar() {
    this.isopensidebar = !this.isopensidebar;
  }
  closeidebar(){
    this.isopensidebar = false;
  }
}
