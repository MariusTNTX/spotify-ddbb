import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Column, View } from '../../../../types';

@Component({
  selector: 'app-match-header',
  templateUrl: './match-header.component.html',
  styleUrls: ['./match-header.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonToggleModule]
})
export class MatchHeaderComponent implements OnInit {

  @Input() column!: Column;
  @Input() view!: View;

  @Output() newOrder: EventEmitter<Column> = new EventEmitter<Column>();
  @Output() newView: EventEmitter<View> = new EventEmitter<View>();
  @Output() newQuery: EventEmitter<string> = new EventEmitter<string>();

  public query: string = '';

  constructor() { }

  ngOnInit() { }

}
