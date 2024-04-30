import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Link, User, DecodedToken } from '../../interfaces/user'; // Importing interfaces
import { MessageService, ConfirmationService } from 'primeng/api'; // Importing PrimeNG services
import { userService } from '../../services/user-service.service'; // Importing user service
import * as jspdf from 'jspdf'; // Importing jsPDF library
import { jwtDecode } from 'jwt-decode'; // Importing jwt_decode function from jwt-decode library

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html', // Template URL for component
  styleUrl: './link-list.component.css', // CSS file for component
})
export class LinkListComponent implements OnInit {
  visibleData: any; // Variable for visible data
  constructor(
    private fb: FormBuilder, // Form builder service
    private mssgService: MessageService, // Message service from PrimeNG
    private userService: userService, // User service
    private confirmationService: ConfirmationService // Confirmation dialog service
  ) {}
  data: Link[] = []; // Variable for data
  filteredData!: Link[]; // Variable for filtered data
  isLoading: boolean = false; // Flag for loading   state
  token!: string | null;
  decodedToken!: DecodedToken;

  //token data
  userId!: string;
  email!: string;
  fullname!: string;

  // getting user data
  userData!: User;

  filteredDataLoaded: boolean = false;

  // Infinit scroll variable's
  page: number = 1;
  pageSize: number = 5;
  totalDataCount: number = 0;
  loading: boolean = false;

  ngOnInit(): void {
    // Retrieve the JWT token from session storage
    this.token = sessionStorage.getItem('token');

    if (this.token) {
      try {
        // Decode the JWT token
        this.decodedToken = jwtDecode(this.token);
        //Access the values stored in the token
        this.userId = this.decodedToken.userId;
        this.email = this.decodedToken.email;
        this.fullname = this.decodedToken.fullname;
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
    this.fetchUserData(this.userId);
  }

  filterby = ['Name', 'Tag']; // Filter options

  selectedFilter = ''; // Selected filter option

  view = false; // Flag for view dialog
  visible = false; // Flag for add bookmark dialog
  editView = false; // Flag for edit bookmark dialog

  desc!: string; // Description variable
  link!: string; // Link variable
  name!: string; // Name variable
  tags!: Array<string>; // Tags variable
  id!: number; // ID variable

  // Function to open view dialog
  viewDialog(item: Link) {
    this.view = !this.view; // Toggle view flag

    // Assigning item properties to variables
    this.name = item.name;
    this.desc = item.desc;
    this.link = item.link;
    this.tags = item.tags;
  }

  // Function to toggle add bookmark dialog
  addBookMark() {
    this.visible = !this.visible; // Toggle visible flag
  }

  // Form group for bookmark form
  bookMarkForm: FormGroup = this.fb.group({
    name: [
      '', // Name control
      [
        Validators.required, // Required validator
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/), // Pattern validator for alphabetic characters and spaces
        Validators.maxLength(50), // Maximum length validator
      ],
    ],
    link: [
      '', // Link control
      [
        Validators.required, // Required validator
        Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/), // Pattern validator for URL format
      ],
    ],
    desc: [''], // Description control
    tags: [
      '', // Tags control
    ],
  });

  // Function to handle form submission
  onSubmit() {
    if (this.bookMarkForm.valid) {
      const newEntry: Link = {
        name: this.bookMarkForm.value.name, // Getting name from form
        link: this.bookMarkForm.value.link, // Getting link from form
        desc: this.bookMarkForm.value.desc, // Getting description from form
        tags: this.bookMarkForm.value.tags, // Getting tags from form
      };

      if (this.userId) {
        // Calling service to set user data
        this.userService.setUserData(newEntry, this.userId).subscribe({
          next: () => {
            // Adding success message
            this.mssgService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Link created successfully',
              life: 2000, // Time duration to display message
            });
            // Reset form and hide the dialog
            this.bookMarkForm.reset();

            this.page = 1
            this.fetchUserData(this.userId); // Fetch updated user data
            this.visible = !this.visible; // Toggle visible flag
          },
          error: () => {
            // Adding error message
            this.mssgService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to add link',
              life: 2000, // Time duration to display message
            });
          },
        });
        this.visible = !this.visible; // Toggle visible flag
      }
    } else {
      // Adding error message if form is invalid
      this.mssgService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong',
        life: 2000, // Time duration to display message
      });
    }
    this.visible = !this.visible; // Toggle visible flag
  }

  edId!: string; // ID for editing
  editName!: string; // Name for editing
  editLink!: string; // Link for editing
  editDesc!: string; // Description for editing
  editTags!: Array<string>; // Tags for editing

  // Function to open edit dialog
  onEdit(editItem: Link) {
    this.editView = !this.editView; // Toggle edit view flag

    // Assigning item properties to variables
    if (editItem._id) {
      this.edId = editItem._id;
    }
    this.editName = editItem.name;
    this.editLink = editItem.link;
    this.editDesc = editItem.desc;
    this.editTags = editItem.tags;
  }

  // Function to handle edit changes
  onEditChanges() {
    const editedItem: Link = {
      _id: this.edId,
      name: this.editName,
      link: this.editLink,
      desc: this.editDesc,
      tags: this.editTags,
    };

    // If userId and editedItemId is present do the following task
    if (this.userId && editedItem._id) {
      this.userService
        .editLink(this.userId, editedItem._id, editedItem)
        .subscribe({
          next: () => {
            this.mssgService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Link updated successfully',
              life: 2000, // Time duration to display message
            });
            this.editView = !this.editView;
            this.page = 1

            this.fetchUserData(this.userId);
            this.bookMarkForm.reset();
          },
          error: () => {
            this.mssgService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update Link',
              life: 2000, // Time duration to display message
            });
          },
        });
    }
  }

  // Function to handle delete operation
  onDelete(delItem: Link) {
    if (this.userId && delItem._id) {
      this.userService.deleteLink(this.userId, delItem._id).subscribe({
        next: () => {
          this.mssgService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Link deleted successfully',
            life: 2000, // Time duration to display message
          });
          this.page = 1

          this.fetchUserData(this.userId); // Fetch updated user data
        },
        error: () => {
          this.mssgService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete Link',
            life: 2000, // Time duration to display message
          });
        },
      });
    }
  }

  // Function to delete all data
  onDeleteAll() {
    if (this.userId) {
      // Delete all user data
      this.userService.deleteAllUserLinks(this.userId).subscribe({
        next: () => {
          this.fetchUserData(this.userId); // Fetch updated user data
          this.mssgService.add({
            severity: 'success', // Severity of message
            summary: 'Success', // Summary of message
            detail: 'All data deleted successfully', // Detail message
            life: 2000, // Time duration to display message
          });
        },
        error: () => {
          this.mssgService.add({
            severity: 'error', // Severity of message
            summary: 'Error', // Summary of message
            detail: 'Failed to delete all data', // Detail message
            life: 2000, // Time duration to display message
          });
        },
      });
    }
  }

  // Function to handle cancel operation
  onCancel() {
    this.bookMarkForm.reset(); // Reset form
    this.editView = false; // Close edit view dialog
  }

  searchText!: string; // Variable for search text
  // Function to filter data based on search text
  filterData(): void {
    if (this.searchText.trim() === '') {
      this.filteredData = [...this.data];
    } else {
      const searchTerm = this.searchText.toLowerCase().trim();
      this.filteredData = this.data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.tags.toString().toLowerCase().includes(searchTerm)
      );
    }
  }

  // Function to show confirmation dialog before deleting all data
  confirm() {
    this.confirmationService.confirm({
      header: 'Confirmation', // Dialog header
      message: 'Please confirm to Delete all saved links.', // Confirmation message
      icon: 'pi pi-exclamation-triangle', // Icon for confirmation dialog
      acceptButtonStyleClass: 'p-button-danger p-button-text', // CSS class for accept button
      rejectButtonStyleClass: 'p-button-text p-button-text', // CSS class for reject button
      acceptIcon: 'none', // Hide accept button icon
      rejectIcon: 'none', // Hide reject button icon
      accept: () => {
        if (this.data.length > 0) {
          // If data exists
          this.onDeleteAll(); // Delete all data
        }
      },
      reject: () => {}, // No action on reject
    });
  }

  toggleLoading() {
    this.loading = !this.loading;
  }

  // Function to fetch user data
  fetchUserData(userId: any) {
    // If user ID exists
    if (userId) {

      this.data = [];

      this.toggleLoading();

      // Fetch user data from service
      this.userService.getUserData(userId, this.page, this.pageSize).subscribe({
        next: (res: any) => {
          this.data = [...res.links]; // Append new data to existing data

          this.filteredData = [...this.data]; // Assigning filtered data

          this.totalDataCount = res.totalDataCount; // Update totalDataCount

          this.hasMoreData = this.data.length < this.totalDataCount;

          this.filteredDataLoaded = true;
        },
        complete: () => {
          this.toggleLoading();
        },
      });
    }
  }

  hasMoreData = true;

  appendData = () => {
    this.toggleLoading();

    this.userService
      .getUserData(this.userId, this.page, this.pageSize)
      .subscribe({
        next: (res: any) => {

          this.data = [...this.data, ...res.links]; // Append new data to existing data

          // Update totalDataCount
          this.totalDataCount = res.totalDataCount;

          // Check if there is more data available based on the total data count
          if (this.data.length >= res.totalDataCount) {
            this.hasMoreData = false; // No more data available
          }

          this.filteredData = [...this.data]; // Assigning filtered data
          this.filteredDataLoaded = true;

        },
        complete: () => {
          this.toggleLoading();
        },
      });
  };

  // Function to handle scrolling event
  onScroll() {
    // Calculate the total number of pages based on total data count and page size
    const totalPages = Math.ceil(this.totalDataCount / this.pageSize);
    
    // Check if the current page is less than the total number of pages
    if (this.page < totalPages) {
      // Increment the page number
      this.page++;

      // Fetch additional data only if current data length is less than total data count
      if (this.data.length < this.totalDataCount) {
        this.appendData();
      }
    }
  }

  // Function to generate PDF from data
  generatePDF(): void {
    if (this.userId) {
      // Create a new jsPDF instance with landscape orientation and 'mm' as the unit of measurement
      const pdf = new jspdf.jsPDF('l', 'mm');

      // Set initial y position and page margin
      let yPos = 20;
      const pageMargin = 20;

      // Iterate over each item in the data
      this.data.forEach((item) => {
        // Add name
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Name:', pageMargin, yPos);
        pdf.setFont('helvetica', 'normal');
        yPos = this.addWrappedText(pdf, item.name, pageMargin + 30, yPos, 170); // Adjusted width for wrapped text

        // Add link
        // yPos += 10; // Increase yPos to create space between items
        pdf.setFont('helvetica', 'bold');
        pdf.text('Link:', pageMargin, yPos);
        pdf.setTextColor(0, 0, 255); // Set text color to blue
        pdf.setFont('helvetica', 'normal');
        yPos = this.addWrappedText(pdf, item.link, pageMargin + 30, yPos, 170); // Adjusted width for wrapped text
        pdf.setTextColor(0);

        // Add description
        // yPos += 10; // Increase yPos to create space between items
        pdf.setFont('helvetica', 'bold');
        pdf.text('Description:', pageMargin, yPos);
        pdf.setFont('helvetica', 'normal');
        yPos = this.addWrappedText(pdf, item.desc, pageMargin + 30, yPos, 170); // Adjusted width for wrapped text
        yPos += 10;

        // Move to next item
        yPos += 10; // Increase yPos to create space between items
        if (yPos >= pdf.internal.pageSize.height - pageMargin) {
          // If yPos exceeds page height, add a new page
          pdf.addPage();
          yPos = pageMargin;
        }
      });

      // Save the PDF
      pdf.save('data.pdf');
    }
  }
  // Function to add wrapped text to PDF
  addWrappedText(
    pdf: any,
    text: string,
    x: number,
    y: number,
    maxWidth: number
  ): number {
    const lineHeight = pdf.getLineHeight();
    const splitText = pdf.splitTextToSize(text, maxWidth);
    pdf.text(splitText, x, y);
    return y + splitText.length * lineHeight;
  }
}
