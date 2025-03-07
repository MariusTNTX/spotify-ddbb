import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HarReaderService } from '../../services/har-reader.service';

@Component({
  selector: 'app-har-reader',
  templateUrl: './har-reader.component.html',
  styleUrls: ['./har-reader.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule]
})
export class HarReaderComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  
  public fileName!: string;

  constructor(private _harService: HarReaderService) { }

  ngOnInit() { }

  openFileInput(){
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if(!input.files || !input.files.length) {
      alert('No File Selected');
      return;
    }
    const file = input.files[0];
    if (file.name.split('.').pop()!.toLowerCase() !== 'har') {
      alert('No HAR File Selected');
      return;
    }
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const json: any = JSON.parse(e.target!.result as string);
        this._harService.setFullBandInfo(json);
      } catch (error) {
        alert('HAR Reading Error');
        throw error;
      }
    };
    reader.readAsText(file);
  }

  copyToClipboard(): void {
    
  }
}
