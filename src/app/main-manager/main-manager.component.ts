import { Component, OnInit } from '@angular/core';
import { HarReaderComponent } from "./components/har-reader/har-reader.component";
import { ObjectManagerComponent } from "./components/object-manager/object-manager.component";

@Component({
  selector: 'app-main-manager',
  templateUrl: './main-manager.component.html',
  styleUrls: ['./main-manager.component.css'],
  imports: [HarReaderComponent, ObjectManagerComponent]
})
export class MainManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
