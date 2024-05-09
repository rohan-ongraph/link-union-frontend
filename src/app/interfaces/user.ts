// Interface representing a user
export interface User {
    id: string; // Unique identifier for the user
    fullname: string; // Full name of the user
    email: string; // Email address of the user
    password?: string; // Optional password field (used for sign-up or profile update)
    // links: Link[]; // List of data associated with the user
  }
  
  // Interface representing individual data items
  export interface Link {
    _id?: string; // Unique identifier for the data item
    userId?: string // Unique identifier for the identifying which user it belongs to
    name: string; // Name/title of the data item
    link: string; // URL/link associated with the data item
    desc: string; // Description of the data item
    tags: Array<string>; // Array of tags associated with the data item
  }
  
  // Represents the structure of a decoded authentication token.
export interface DecodedToken {
  // Email address associated with the user.
  email: string;
  // Full name of the user.
  fullname: string;
  // Token issue timestamp (Unix timestamp).
  iat: number;
  // Unique identifier of the user.
  userId: string;
}

// Represents the structure of a contact form submission.
export interface ContactForm {
  // Unique identifier of the user submitting the form.
  userId: string;
  // Subject of the contact form.
  subject: string;
  // Description or message content of the contact form.
  description: string;
}
