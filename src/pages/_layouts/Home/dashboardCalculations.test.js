import {
  calculatePaid,
  calculateUnPaid,
  calculateOverdue,
  calculateRevenue,
} from "./dashboardCalculations";

expect.extend({
	toBeType(received, argument) {
		const initialType = typeof received;
		const type = initialType === "object" ? Array.isArray(received) ? "array" : initialType : initialType;
		return type === argument ? {
			message: () => `expected ${received} to be type ${argument}`,
			pass: true
		} : {
			message: () => `expected ${received} to be type ${argument}`,
			pass: false
		};
	}
});

const invoicesData1 = [
  {
    lineItems: {
      fnsu8v: { quantity: 48, price: 1916, description: "Bed maintenance" },
      "8aulm1": { quantity: 18, price: 1315, description: "Bed edging" },
    },
    title: "Spring/Fall Clean-Up",
    // Wed Jul 13 2022 01:56:30 GMT+0000
    dueDate: 1657677390,
    createDate: 1648571797,
    id: "v2zycc",
    isPaid: true,
    customerId: "ukx0nq",
   
  },
  {
    lineItems: {
      li6vyk: {
        quantity: 50,
        price: 1384,
        description: "Seven removals a season",
      },
      "8het0e": {
        quantity: 16,
        price: 1405,
        description: "One removal a season ",
      },
      tgx4ll: { quantity: 13, price: 7, description: "Two removals a season" },
    },
    // 	Tue Mar 08 2022 13:45:09 GMT+0000
    dueDate: 1646747109,
    createDate: 1653871054,
    id: "2w4jsf",
   
    isPaid: true,
    customerId: "gdxcp2",
    
  
  },
  {
    lineItems: {
      x95fak: { quantity: 33, price: 791, description: "Flowers" },
      "1sp72i": { quantity: 43, price: 274, description: "Holiday lighting" },
    },
    title: "Seasonal Display",
    // Tue Aug 30 2022 09:01:59 GMT+0000
    dueDate: 1661850119,
    createDate: 1646076820,
    id: "3t6n94",
    notes:
      "Thank you for your business. Please contact us with any questions regarding this invoice.",
    isPaid: true,
    customerId: "8oqtl0",
    customerAddress: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: { lat: "-43.9509", lng: "-34.4618" },
    },
    customerName: "Ervin Howell",
    customerPhone: "010-692-6593 x09125",
    customerEmail: "Shanna@melissa.tv",
  },
  {
    lineItems: {
      l37p2x: {
        quantity: 49,
        price: 1102,
        description: "Monitoring and removal of browning leaves and branches",
      },
    },
    title: "General Bed Maintenance/Detailing",
    // 	Fri Mar 04 2022 10:38:55 GMT+0000
    dueDate: 1646390335,
    createDate: 1652522881,
    id: "bqrch1",
    notes:
      "Thank you for your business. Please contact us with any questions regarding this invoice.",
    isPaid: true,
    customerId: "kzoftn",
    customerAddress: {
      street: "Rex Trail",
      suite: "Suite 280",
      city: "Howemouth",
      zipcode: "58804-1099",
      geo: { lat: "24.8918", lng: "21.8984" },
    },
    customerName: "Kurtis Weissnat",
    customerPhone: "210.067.6132",
    customerEmail: "Telly.Hoeger@billy.biz",
  },
  {
    lineItems: {
      qmjoju: {
        quantity: 50,
        price: 610,
        description: "Lawn chemical programs",
      },
    },
    title: "Lawn protect and Feed",
    // Mon Feb 28 2022 00:16:03 GMT+0000
    dueDate: 1646007363,
    createDate: 1655204129,
    id: "7ikfwb",
    notes:
      "Thank you for your business. Please contact us with any questions regarding this invoice.",
    isPaid: true,
    customerId: "nkxijd",
    customerAddress: {
      street: "Ellsworth Summit",
      suite: "Suite 729",
      city: "Aliyaview",
      zipcode: "45169",
      geo: { lat: "-14.3990", lng: "-120.7677" },
    },
    customerName: "Nicholas Runolfsdottir V",
    customerPhone: "586.493.6943 x140",
    customerEmail: "Sherwood@rosamond.me",
  },
  {
    lineItems: {
      per7a5: {
        quantity: 1,
        price: 212,
        description: "Spring sprinkler activation",
      },
    },
    title: "Irrigation System Start Up",
    // Mon Jul 04 2022 22:35:32 GMT+0000
    dueDate: 1656974132,
    createDate: 1653959133,
    id: "4czf7k",
    notes:
      "Thank you for your business. Please contact us with any questions regarding this invoice.",
    isPaid: true,
    customerId: "nkxijd",
    customerAddress: {
      street: "Ellsworth Summit",
      suite: "Suite 729",
      city: "Aliyaview",
      zipcode: "45169",
      geo: { lat: "-14.3990", lng: "-120.7677" },
    },
    customerName: "Nicholas Runolfsdottir V",
    customerPhone: "586.493.6943 x140",
    customerEmail: "Sherwood@rosamond.me",
  },
  {
    lineItems: {
      td9omj: {
        quantity: 26,
        price: 1075,
        description: "Lawn chemical programs",
      },
    },
    title: "Lawn protect and Feed",
    // Sun Jun 26 2022 16:25:53 GMT+0000
    dueDate: 1656260753,
    createDate: 1653909603,
    id: "y7ylqc",
    notes:
      "Thank you for your business. Please contact us with any questions regarding this invoice.",
    isPaid: true,
    customerId: "h470y5",
    customerAddress: {
      street: "Kattie Turnpike",
      suite: "Suite 198",
      city: "Lebsackbury",
      zipcode: "31428-2261",
      geo: { lat: "-38.2386", lng: "57.2232" },
    },
    customerName: "Clementina DuBuque",
    customerPhone: "024-648-3804",
    customerEmail: "Rey.Padberg@karina.biz",
  },
  {
    lineItems: {
      b6x4af: { quantity: 1, price: 1434, description: "System winterized" },
    },
    title: "Irrigation System Shut Down",
    // Fri Dec 30 2022 02:13:15 GMT+0000
    dueDate: 1672366395,
    createDate: 1663045150,
    id: "q8azkf",
    notes:
      "Thank you for your business. Please contact us with any questions regarding this invoice.",
    isPaid: true,
    customerId: "h7kzut",
    customerAddress: {
      street: "Dayna Park",
      suite: "Suite 449",
      city: "Bartholomebury",
      zipcode: "76495-3109",
      geo: { lat: "24.6463", lng: "-168.8889" },
    },
    customerName: "Glenna Reichert",
    customerPhone: "(775)976-6794 x41206",
    customerEmail: "Chaim_McDermott@dana.io",
  },
  {
    lineItems: {
      aijotk: {
        quantity: 34,
        price: 827,
        description: "Lawn chemical programs",
      },
    },
    title: "Lawn protect and Feed",
    // Tue Nov 22 2022 20:27:15 GMT+0000
    dueDate: 1669148835,
    createDate: 1658063739,
    id: "hgd6cv",
    notes:
      "Thank you for your business. Please contact us with any questions regarding this invoice.",
    isPaid: false,
    customerId: "ukx0nq",
    customerAddress: {
      street: "Norberto Crossing",
      suite: "Apt. 950",
      city: "South Christy",
      zipcode: "23505-1337",
      geo: { lat: "-71.4197", lng: "71.7478" },
    },
    customerName: "Mrs. Dennis Schulist",
    customerPhone: "1-477-935-8478 x6430",
    customerEmail: "Karley_Dach@jasper.info",
  },
  {
    lineItems: {
      kt8pp4: {
        quantity: 41,
        price: 785,
        description: "Groupd-cover trimming",
      },
      bkglnn: {
        quantity: 5,
        price: 103,
        description: "Ground-cover controlling",
      },
      "4rw39x": {
        quantity: 49,
        price: 825,
        description: "Ground-cover controlling",
      },
      df8pe3: { quantity: 32, price: 663, description: "Debris removal" },
      "8tcvo4": { quantity: 47, price: 1957, description: "Weeding" },
      tlr0wa: { quantity: 4, price: 1705, description: "Debris removal" },
    },
    title: "General Bed Maintenance/Detailing",
    // Fri Dec 16 2022 15:02:35 GMT+0000
    dueDate: 1671202955,
    createDate: 1666616947,
    id: "t6fmkk",
    notes:
      "Thank you for your business. Please contact us with any questions regarding this invoice.",
    isPaid: true,
    customerId: "8oqtl0",
    customerAddress: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: { lat: "-43.9509", lng: "-34.4618" },
    },
    customerName: "Ervin Howell",
    customerPhone: "010-692-6593 x09125",
    customerEmail: "Shanna@melissa.tv",
  },
];

describe("Dashboard calculations", () => {
  test("Should calculate the amount of paid invoices from invoicesData1", () => {
    expect(calculatePaid(invoicesData1)).toBe(9);
  });
  
  test("Should calculate the amount of unpaid invoices from invoicesData1", () => {
    expect(calculateUnPaid(invoicesData1)).toBe(1);
  });


  test("Should calculate the amount of overdue invoices from invoicesData1", () => {
    expect(calculateOverdue(invoicesData1)).toBe(0);
  });


  test("Should calculate the revenue from invoicesData1", ()=> {
    expect(calculateRevenue(invoicesData1)).toHaveLength(12);
    expect(calculateRevenue(invoicesData1)[1]).toBe(30500);

  
  });




});



