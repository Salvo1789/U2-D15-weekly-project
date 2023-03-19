const origin_url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzYTIxNmM1NmIzNjAwMTMzZmU1NjMiLCJpYXQiOjE2NzkxNDg1NDIsImV4cCI6MTY4MDM1ODE0Mn0.St2iEhOrEFE5RlrcxnF2HxqVgIHV4WvnjSuGUf8SKXU";

class ServerError extends Error {
  constructor(status, statusMsg) {
    super();
    this.status = status;
    this.statusMsg = statusMsg;
  }
}


const showToast = (apearence, title, msg) => {
    const toastBs = document.getElementById("toast");
    toastBs.classList.add(apearence);
    const toasStatus = toastBs.querySelector("#toast_status");
    const toastMsg = toastBs.querySelector("#toast_status_msg");
  
    toasStatus.innerText = title;
    toastMsg.innerText = msg;
  
    const toast = new bootstrap.Toast(toastBs);
    toast.show();
  };
  
  const resp = async (url, method, body) => {
    const params = {
      method,
      headers: {
        Authorization: token
      },
      body
    };
  
    if (method === "POST" || method === "PUT") {
      params.headers["Content-Type"] = "application/json";
    }
  
    try {
      const response = await fetch(url, params);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new ServerError(response.status, response.statusText);
    } catch (error) {
      showToast("text-bg-danger", error.status, error.statusMsg);
    } finally {
      const loader = document.getElementById("loader");
      loader.classList.add("invisible");
    }
  };
  
  const cardTpl = (id, img, name, brand, description, price) => `
      <div class="col">
        <div class="card mb-4 shadow-sm">
          <img src="${img}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <div class="badge text-bg-success">${brand}</div>
            <p class="card-text">${description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a href="./product-details.html?id=${id}" class="btn btn-sm btn-outline-success">Scopri di più</a>
                <a href="./back-office.html?id=${id}" class="btn btn-sm btn-outline-success">Modifica</a>
              </div>
              <small class="text-muted">${price}€</small>
            </div>
          </div>
        </div>
      </div>
  `;