import { User } from "./types/common";
import { faker } from "@faker-js/faker";

export const data: User[] = Array(5)
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
