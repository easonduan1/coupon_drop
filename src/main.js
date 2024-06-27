function init_coupon() {
  class CouponDrop extends HTMLElement {
    constructor() {
      super();

      // 创建一个 shadow DOM
      var shadow = this.attachShadow({ mode: "open" });

      const template = document.createElement("template");
      template.innerHTML = `
                    <style>
      .mask {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
      }
      .coupon-drop {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 24px;
          width: 400px;
          height: 523px;
          margin: 0 auto;
          background-color: #FFFFFF;
          border-radius: 24px;
          z-index: 1000;
      }
      .img-discount {
        height: 216px;
        max-height: 216px;
        width: 100%;
        border: none;
        border-radius: 24px;
      }
      .coupon-title div{
        font-family: Gotham;
        font-size: 12px;
        font-weight: 400;
        line-height: 14.4px;
        color: #70377C;
        text-align: center;
      }
      .coupon-title p {
        font-family: Gotham;
        font-size: 48px;
        font-weight: 500;
        line-height: 48px;
        letter-spacing: -1px;
        margin: 0;
        text-align: center;
        background: linear-gradient(180deg, #AE36C1 0%, #70377C 100%);
        -webkit-background-clip: text;
        color: transparent;        
      }
      .coupon-content .content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Gotham;
        font-size: 16px;
        font-weight: 400;
        line-height: 19.2px;
        text-align: center;
        color: #333333;
      }
      .coupon-content .time {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Gotham;
        font-size: 16px;
        font-weight: 400;
        line-height: 19.2px;
        text-align: center;
        color: #333333;
      }
      .close-button {
          position: absolute;
          right: -22px;
          top: -22px;
          border: none;
          background: transparent;
          font-size: 1.5em;
          color: #FFFFFF;
      }
      .confirm-button {
        height: 46px;
        padding: 15px 48px 15px 48px;
        border-radius: 48px;
        border: none;
        color: #70377C;
      }
      .countdown {
        font-family: Gotham;
        font-size: 12px;
        font-weight: 400;
        line-height: 14.4px;
        text-align: center;
        color: #70377C;
      }
      .countdown span {
        display: inline-block;
        width: 26px;
        height: 14.4px;
        line-height: 14.4px;
        padding: 2px 4px 2px 4px;
        background: #70377C14;

      }
      .confirm-button:hover {
        cursor: pointer;
      }
  </style>
  <div class="mask">
    <div class="coupon-drop">
        <img alt="" srcset="
        
        "
        class="img-discount">
      <div class="coupon-title">
        <div>GIFT DISCOUNT</div>
        <p>$300 OFF</p>
      </div>
      <div class="coupon-content">
        <div class="content">
          Bundle up and save up to $10! limited discount, save now!
        </div>
        <div class="time">
          2024.6.12-2024.6.18
        </div>
      </div>
      <button class="close-button">X</button>
      <button class="confirm-button">Get Now</button>
      <div class="countdown">Ends in <span class="count">50.0</span> s</div>
  </div>
  </div>
            `;

      shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      let countdownElement = this.shadowRoot.querySelector(".count");
      let countdown = 500; // 倒计时开始值，代表5秒（因为我们使用的单位是十分之一秒）
      let interval = setInterval(() => {
        countdown -= 1;
        let seconds = (countdown / 10).toFixed(1); // 将倒计时转换为秒，并保留一位小数
        countdownElement.textContent = seconds;
        if (countdown <= 0) {
          clearInterval(interval);
          this.remove(); // 倒计时结束，移除元素
        }
      }, 100); // 每100ms更新一次显示，以实现更精确的倒计时

      this.shadowRoot
        .querySelector(".close-button")
        .addEventListener("click", () => {
          clearInterval(interval); // 确保移除时清除计时器
          this.remove(); // 提前移除元素
        });
    }

    disconnectedCallback() {
      console.log("Coupon Drop removed from the document body!");
    }
  }

  // 定义自定义元素的名称
  customElements.define("coupon-drop", CouponDrop);

  // 创建并添加元素的相关逻辑...
  let couponDrop = document.createElement("coupon-drop");
  document.body.appendChild(couponDrop);
}

init_coupon();
