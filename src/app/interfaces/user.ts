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
  
  export interface DecodedToken {
    email: string;
    fullname: string;
    iat: number;
    userId: string;
}

  export interface ContactForm {
    userId: string,
    subject: string,
    description: string
  }