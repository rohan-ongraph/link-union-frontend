import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userService } from '../../services/user-service.service';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../interfaces/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup; // Form group for the contact form
  token!: string|null;
  decodedToken!: DecodedToken
  
  userId!: string; // User ID obtained from session storage
  username!: string;
  email!: string;

  constructor(
    private fb: FormBuilder, // FormBuilder for creating reactive forms
    private userService: userService, // User service for contacting user
    private mssgService: MessageService // Message service for displaying messages
  ){
    this.token = sessionStorage.getItem('token'); // Retrieve user ID from session storage
    if (this.token) {
      try {
        // Decode the JWT token
        this.decodedToken = jwtDecode(this.token);
        //Access the values stored in the token
        this.userId = this.decodedToken.userId;
        this.email = this.decodedToken.email;
        this.username = this.decodedToken.fullname;
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    } else {
      console.error('JWT token not found in session storage');
    }
  }

  ngOnInit(): void {
    // Initialize the contact form with subject and message fields
    this.contactForm = this.fb.group({
      subject: ['', Validators.required], // Subject field with required validation
      message: ['', Validators.required] // Message field with required validation
    });
  }

  // Method to send the issue reported by the user
  sendIssue() {
    const data = {
      userId: this.userId, // User ID of the user reporting the issue
      subject: this.contactForm.value.subject, // Subject of the issue
      description: this.contactForm.value.message, // Description/message of the issue
    };

    // Check if user ID is available
    if(this.userId){
      // Contact user service to submit the issue
      this.userService.submitContactForm(data, this.userId).subscribe({
        next: (response) => {
          // Display success message upon successful submission
          this.mssgService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New entry added successfully',
          });
          this.contactForm.reset(); // Reset the contact form after submission
        },
        error: (error) => {
          // Display error message if submission fails
          this.mssgService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add new entry',
          });
        } 
      })
    }
  }
}
