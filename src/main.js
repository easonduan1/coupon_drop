function init_coupon() {
  class CouponDrop extends HTMLElement {
    constructor() {
      super();

      // 创建一个 shadow DOM
      var shadow = this.attachShadow({ mode: "open" });
      const template = document.createElement("template");
      template.innerHTML = `
          <style>
      .coupon-drop {
      position: absolute;
      bottom: 93px;
      right: 48px;
      display: flex;
      max-width: 380px;
      padding: 16px;
      gap: 16px;
      border-radius: 16px;
      color: #fff;
      background: linear-gradient(180deg, #E584DB 4.46%, #70377C 94.06%);
      box-shadow: 0px 4px 12px 0px #0000004D;
      box-sizing: border-box;
      z-index: 999;
      }
      .coupon-left {
      display: flex;
      flex-direction: column;
      }
      .coupon-left .discount_dollar {
      font-family: Gotham;
      font-size: 32px;
      font-weight: 500;
      line-height: 32px;
      letter-spacing: 1.9px;
      text-wrap: nowrap;
      }
      .coupon-left .countdown {
      text-wrap: nowrap;
      margin-top: 15px; 
      }
      .coupon-left .count {
      display: inline-block;
      padding: 4px;
      background: #FFFFFF1A;
      }
      .coupon-right {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 202px;
      font-family: Gotham;
      font-size: 14px;
      font-weight: 400;
      line-height: 16.8px;
      letter-spacing: -0.30000001192092896px;
      text-align: left;
      }
      .coupon-right .confirm-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 33px;
      box-sizing: border-box;
      background: #FFFFFF;
      border-radius: 48px;
      border: none;
      padding: 13px;
      font-family: Gotham;
      font-size: 16px;
      font-weight: 500;
      color: #70377C;
      }
      .coupon-right .confirm-button:hover {
      cursor: pointer;
      }
      .close-button {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -50px;
        right: -16px;
        width: 24px;
        height: 24px;
        color: #FFFFFF;
        background: #00000026;
        border-radius: 20px;
        border: none;
        box-sizing: border-box;
      }
      .close-button svg {
      display: inline-block;
      width: 16px;
      height: 16px;
      }
      .close-button:hover {
      cursor: pointer;
      }
      .content-confirm {
      }
      .confirmed-button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 33px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 48px;
        border: none;
        padding: 13px;
        font-family: Gotham;
        font-size: 16px;
        font-weight: 500;
        color: #70377C;
      }
      .confirmed-button svg {
        display: block;
        margin-right: 16.8px;
      }
      .confirmed {
        display: none !important;
      }
      @media (max-width: 720px) {
      .coupon-drop {
        position: fixed;
        bottom: 50px; 
        left: 50%; 
        transform: translateX(-50%); 
        width: 343px;
        margin: 0 auto;
      }
      .coupon-left .discount_dollar {
        width: 100px;
        height: 29px;
        font-size: 24px;
        font-weight: 500;
        line-height: 28.8px;
      }
      .countdown {
        width: 100px;
        font-size: 12px;
        font-weight: 400;
        line-height: 14.4px;
        margin-top: 18px; 
      }
      .coupon-right {
        font-size: 12px;
        font-weight: 400;
        line-height: 14.4px;
        letter-spacing: 0.55px;
        width: 194px;
      }
      .confirm-button {
        font-family: Gotham;
        font-size: 14px;
        font-weight: 500;
        line-height: 16.8px;
        text-align: center;
      }
      .close-button {
        width: 16px;
        height: 16px;
        top: -40px;
      }
      .close-button svg {
        min-width: 8px;
        min-height: 8px;
      }
      }
      </style>
      <div class="coupon-drop">
      <div class="coupon-left">
      <div class="discount_dollar">$10 OFF</div>
      <div class="countdown">Dismiss in <span class="count">50.0</span> s</div>
      </div>
      <div class="coupon-right">
      <div class="not-confirmed">
        Bundle up and save up to $10! limited discount, save now!
      </div>
      <div class="content-confirm confirmed ready-confirmed">
        🎉 Code secured, discount will be auto applied at checkout.
      </div>
      <div class="confirm-button not-confirmed">Get Now</div>
      <div class="confirmed-button confirmed ready-confirmed">
        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.1102 16.1853L19.2353 6.92607L20.6598 8.32992L10.1309 19.0137L3.72063 12.6964L5.12449 11.2719L10.1102 16.1853Z" fill="#70377C"/>
        </svg>
        Secured
      </div>

      <button class="close-button">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="">
          <path d="M1 1L15 15M15 1L1 15" stroke="#FFFFFF" stroke-width="2" fill="none"/>
        </svg>
        
      </button>
      </div>
      </div>
      `;

      shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      // 计时功能
      let countdownElement = this.shadowRoot.querySelector(".count");
      let countdown = 500;
      let interval = setInterval(() => {
        countdown -= 1;
        let seconds = (countdown / 10).toFixed(1); // 将倒计时转换为秒，并保留一位小数
        countdownElement.textContent = seconds;
        if (countdown <= 0) {
          clearInterval(interval);
          this.remove(); // 倒计时结束，移除元素
        }
      }, 100);

      // 点击关闭
      this.shadowRoot
        .querySelector(".close-button")
        .addEventListener("click", () => {
          clearInterval(interval); // 确保移除时清除计时器
          this.remove(); // 提前移除元素
        });

      // 点击确认
      this.shadowRoot
        .querySelector(".confirm-button")
        .addEventListener("click", () => {
          // 改变相关状态
          this.shadowRoot.querySelectorAll(".not-confirmed").forEach((el) => {
            el.classList.add("confirmed");
          });

          this.shadowRoot.querySelectorAll(".ready-confirmed").forEach((el) => {
            el.classList.remove("confirmed");
          });

          console.log("confirm");
          // 存入cookie
          setCookie("discount_code", "JP2FRZX1CJ2T", 0);
        });
    }

    disconnectedCallback() {
      console.log("已关闭");
    }
  }

  customElements.define("coupon-drop", CouponDrop);
  let couponDrop = document.createElement("coupon-drop");

  // 一次性展示
  let currentPath = window.location.href;
  // 存储当前的product[]
  const productList = getCookie("long_time");

  if (currentPath.includes("one_time")) {
    // 一次性渲染
    document.body.appendChild(couponDrop);
  } else if (currentPath.includes("long_time")) {
    document.body.appendChild(couponDrop);
    // 存入cookie
    setCookie(
      "long_time",
      window.location.pathname.replace("/products/", "|"),
      7
    );
  } else if (
    window.location.pathname.includes("/products") &&
    productList != undefined &&
    whetherLongShow()
  ) {
    document.body.appendChild(couponDrop);
  }

  function whetherLongShow() {
    console.log(
      productList,
      window.location.pathname.replace("/products/", "")
    );

    if (
      productList.includes(window.location.pathname.replace("/products/", ""))
    )
      return true;
    else return false;
  }

  function getCookie(name) {
    // 遍历cookie下面的数据,得到对应name的cookie数组
    const value = document.cookie
      .split(";")
      .filter((value) => value.includes(name))[0]
      .split("|");
    if (document.cookie == null || value.length == 0) return [];
    return value;
  }

  function setCookie(name, value, time_day = 0) {
    let cookieString = document.cookie
      .split(";")
      .filter((value) => value.includes(name))[0]
      .split("|")
      .concat(value);
    if (time_day !== 0) {
      const expires = new Date();
      expires.setDate(expires.getDate() + time_day);
      cookieString += ` ;expires=${expires.toUTCString()};`;
    }
    document.cookie = cookieString;
  }
}

init_coupon();
