import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-har-reader',
  templateUrl: './har-reader.component.html',
  styleUrls: ['./har-reader.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule]
})
export class HarReaderComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  
  public fileName!: string;

  constructor() { }

  ngOnInit() { }

  openFileInput(){
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
    }
  }

  copyToClipboard(): void {

  }
}
