export function normalizarTicket(ticket) { 
  return JSON.parse(JSON.stringify(ticket));
}

export function renderHTMLDesdeEJS(res, data) {
  return new Promise((resolve, reject) => {
    res.render("ticket", data, (err, html) => {
      if (err) reject(err);
      else resolve(html);
    });
  });
}
