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

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
  
    if (!input.files || input.files.length !== 2) {
      alert(input.files?.length ? 'More or less than two files selected' : 'No File Selected');
      return;
    }
  
    const JSONList: { spotify: any | null; spirit: any | null } = { spotify: null, spirit: null };
  
    try {
      const filePromises = [...input.files].map(file => this.readHarFile(file));
      const results = await Promise.all(filePromises);
  
      for (const json of results) {
        if (json.log.pages.some((page: any) => page.title.includes('https://open.spotify.com/'))) {
          JSONList.spotify = json;
        } else if (json.log.pages.some((page: any) => page.title.includes('https://www.spirit-of-metal.com/'))) {
          JSONList.spirit = json;
        }
      }
  
      if (JSONList.spotify && JSONList.spirit) {
        this._harService.setFullBandInfo(JSONList.spotify, JSONList.spirit);
      } else {
        alert('Missing Data');
      }
    } catch (error) {
      alert(error);
      throw error;
    }
  }
  
  private readHarFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      if (file.name.split('.').pop()?.toLowerCase() !== 'har') {
        reject('No HAR File Selected');
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const json = JSON.parse(e.target!.result as string);
          resolve(json);
        } catch {
          reject('HAR Reading Error');
        }
      };
      reader.readAsText(file);
    });
  }

  copyToClipboard(): void {
    
  }
}
