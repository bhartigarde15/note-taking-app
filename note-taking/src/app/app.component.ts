import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'note-taking';

  links = ['Home', 'Create', 'Favorites'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  toggle() {
    this.background = this.background ? undefined : 'primary';
  }
}
