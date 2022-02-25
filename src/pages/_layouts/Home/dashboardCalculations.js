export const calculatePaid = (invoices) => {
  let paidTotal = 0;
  invoices.forEach((invoice) => {
    if (invoice.isPaid === true) {
      paidTotal++;
    }
  });
  return paidTotal;
};


export const calculateUnPaid = (invoices) => {
  let unpaidTotal = 0
  invoices.forEach((invoice) => {
    if(invoice.isPaid === false) {
      unpaidTotal++;
    }
  })
  return unpaidTotal;
}


export const calculateOverdue = (invoices) => {
  let overdueTotal = 0;
  const now = new Date();
  const unix_now  = now.getTime()/1000;

  invoices.forEach((invoice) => {
    if(invoice.isPaid === false && invoice.dueDate < unix_now ) {
      overdueTotal++;
    }
  });

  return overdueTotal;
}

export const calculateRevenue = (invoices) => {
  if(!invoices.length) return;;
  const revenue = new Array(12).fill(0);

  for(let i = 0; i < invoices.length; i++) {
    if(invoices[i].isPaid === false) continue;
    if(!invoices[i].hasOwnProperty("lineItems")) continue;
    if(!invoices[i].hasOwnProperty("dueDate")) continue;

    const year  = new Date(invoices[i].dueDate*1000).getFullYear();
    const month = new Date(invoices[i].dueDate*1000).getMonth();

    if(year === 2022) {
      let total = 0;
      for (const [key, value] of Object.entries(invoices[i].lineItems)) {
        total += value.quantity*value.price;
      }
      revenue[month] += total;
    }
  }
  return revenue;

}






