export type User = {
  id: string;
  name: string;
  items: Item[];
  address: AddressType;
  pincode: string;
};

export type Item = {
  id: string;
  name: string;
};

export type AddressType = {
  streetAddress: string;
  city: string;
  state?: string; // Optional state property
  postalCode?: string; // Optional postal code property
  country: string;
};
