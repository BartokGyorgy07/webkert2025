import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Insurance } from '../../shared/models/Insurance';

@Component({
  selector: 'app-insurances',
  imports: [
    ReactiveFormsModule,
    DatePipe,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './insurances.component.html',
  styleUrl: './insurances.component.scss',
  standalone: true
})
export class InsurancesComponent implements OnInit {
  @Input() title: string = 'New Insurance';
  @Output() insuranceAdded = new EventEmitter<Insurance>();
  
  displayedColumns: string[] = ['name', 'price', 'dueDate'];
  insuranceForm!: FormGroup;
  
  insurances: Insurance[] = [
    {
      id: 1,
      name: 'Basic Insurance',
      price: 7500,
      dueDate: new Date('2025-08-17'),
      description: 'Convers basic medical care'
    },
    {
      id: 2,
      name: 'Insurance Extra',
      price: 25000,
      dueDate: new Date('2026-07-25'),
      description: 'Covers basic medical carer + 3 hospital service / month'
    },
    {
      id: 3,
      name: 'Life Insurance',
      price: 75000,
      dueDate: new Date('2035-06-25'),
      description: 'Life Insurance'
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.insuranceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [5000, [Validators.required, Validators.pattern("^[0-9]*$")]],
      dueDate: [new Date(), Validators.required],
      description: ['', Validators.maxLength(200)]
    });
  }

  addInsurance(): void {
    if (this.insuranceForm.valid) {
      const formValue = this.insuranceForm.value;
      
      const newInsurance: Insurance = {
        id: this.insurances.length + 1,
        name: formValue.name,
        price: formValue.price,
        dueDate: formValue.dueDate,
        description: formValue.description
      };
      
      this.insurances = [...this.insurances, newInsurance];
      this.insuranceAdded.emit(newInsurance);
      this.insuranceForm.reset({
        price: 5000,
        dueDate: new Date()
      });
    } else {
      Object.keys(this.insuranceForm.controls).forEach(key => {
        const control = this.insuranceForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  trackById(index: number, item: Insurance): number {
    return item.id;
  }
  
  getFormControlError(controlName: string): string {
    const control = this.insuranceForm.get(controlName);
    if (control?.invalid) {
      if (control.errors?.['required']) {
        return 'This field is required';
      }
      if (control.errors?.['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors?.['maxlength']) {
        return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}