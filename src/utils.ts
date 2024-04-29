import { AddressType, Item, User } from "./types/common";
import { faker } from "@faker-js/faker";

export function checkPresentInItems(items: Item[], queryValue: string) {
  if (!queryValue) {
    return false;
  }

  return items.some((item) =>
    item.name.toLowerCase().includes(queryValue.toLowerCase())
  );
}

export function combineAddress(args: AddressType): string {
  const { streetAddress, city, state, country } = args;
  const addressLines = [streetAddress, city, country];
  if (state) {
    addressLines.push(`${state}`);
  }

  return addressLines.join(", ");
}

export const data: User[] = Array(100)
  .fill(1)
  .map(() => {
    return {
      id: faker.string.uuid(),
      address: {
        city: faker.location.city(),
        country: faker.location.country(),
        streetAddress: faker.location.streetAddress(),
        postalCode: faker.location.zipCode(),
        state: faker.location.state(),
      },
      items: Array(Math.floor(Math.random() * 5) + 1)
        .fill(1)
        .map(() => {
          return {
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
          };
        }),
      name: faker.person.fullName(),
      pincode: faker.location.zipCode(),
    };
  });
