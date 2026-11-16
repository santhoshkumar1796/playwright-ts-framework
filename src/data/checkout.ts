export interface Customer {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const customers: Customer[] = [
  { firstName: 'Asha', lastName: 'Rao', postalCode: '605001' },
  { firstName: 'John', lastName: 'Miller', postalCode: '10001' },
];

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
} as const;
