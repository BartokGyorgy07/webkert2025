import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../shared/pipes/date.pipe';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expired',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    DateFormatterPipe,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './expired.component.html',
  styleUrl: './expired.component.scss'
})
export class ExpiredComponent {
  displayedColumns: string[] = ['name', 'date', 'actions'];
  
  expiredInsurances = [
    {
      name: 'Life Insurance',
      date: '2025-03-01T14:30:00Z',
    },
    {
      name: 'Life Insurance Pro',
      date: '2025-02-28T09:15:42Z',
    }
  ];
  
  deleteInsurance(index: number): void {
    this.expiredInsurances = this.expiredInsurances.filter((_, i) => i !== index);
  }
  
  clearAllInsurances(): void {
    this.expiredInsurances = [];
  }
}