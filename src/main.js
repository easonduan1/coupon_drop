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
        position: fixed;
        bottom: 123px;
        right: 48px;
        display: flex;
        width: 380px;
        padding: 16px;
        gap: 16px;
        border-radius: 16px;
        color: #fff;
        background: linear-gradient(180deg, #E584DB 4.46%, #70377C 94.06%);
        box-shadow: 0px 4px 12px 0px #0000004D;
        box-sizing: border-box;
        z-index: 1019;
        }
        .coupon-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 9px;
          text-wrap: nowrap;
          white-space: nowrap;
        }
        .coupon-left .discount_dollar {
          font-size: 32px;
          font-weight: 500;
          line-height: 32px;
          letter-spacing: -0.3px;
        }
        .coupon-left .countdown {
          text-wrap: nowrap;
          letter-spacing: -0.35px;
        }
        .coupon-left .count {
        display: inline-block;
        text-align: center;
        min-width: 40px;
        background: #FFFFFF1A;
        }
        .coupon-right {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 8px;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        text-align: left;
        letter-spacing: -0.5px;
        }
        .coupon-right .confirm-button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 48px;
        border: none;
        padding: 3px;
        font-size: 14px;
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
          font-size: 5px;
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
          height: 25px;
          box-sizing: border-box;
          background: #FFFFFF;
          border-radius: 48px;
          border: none;
          padding: 4px;
          font-size: 14px;
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
          bottom: 123px; 
          left: 50%; 
          transform: translateX(-50%); 
          width: 343px;
          margin: 0 auto;
        }
        .coupon-left .discount_dollar {
          height: 29px;
          font-size: 24px;
          font-weight: 500;
          line-height: 28.8px;
        }
        .countdown {
          font-size: 12px;
          font-weight: 400;
          line-height: 14.4px;
        }
        .countdown .count {
            min-width: 30px;
        }
        .coupon-right {
          font-size: 12px;
          font-weight: 400;
          line-height: 14.4px;
          max-width: 195px;
          letter-spacing: 0;
        }
        .confirm-button {
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
        <div class="discount_dollar">€20</div>
        <div class="countdown">Schließen in <span class="count">15.0</span> s</div>
        </div>
        <div class="coupon-right">
        <div class="not-confirmed">
          Wow, Glückwunsch! Du hast einen geheimen Gutschein erhalten!
        </div>
        <div class="content-confirm confirmed ready-confirmed">
          🎉 In der Tasche! Du erhältst beim Bezahlen einen zusätzlichen Rabatt!
        </div>
        <div class="confirm-button not-confirmed">Holen!</div>
        <div class="confirm-button confirmed-button confirmed ready-confirmed">
          <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.1102 16.1853L19.2353 6.92607L20.6598 8.32992L10.1309 19.0137L3.72063 12.6964L5.12449 11.2719L10.1102 16.1853Z" fill="#70377C"/>
          </svg>
          Erhalten
        </div>
        
        <button class="close-button">
          <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      let countdown = 150;
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
          confimState.apply(this);
          // 存入shopify cookie, path设置为全局
          docCookies.setItem("discount_code", "WELCOME20", "", "/");
          // 停止计时
          clearInterval(interval);
          // 3.5秒后关闭
          setTimeout(() => {
            this.remove();
          }, 3500);
        });

      function confimState() {
        this.shadowRoot.querySelectorAll(".not-confirmed").forEach((el) => {
          el.classList.add("confirmed");
        });

        this.shadowRoot.querySelectorAll(".ready-confirmed").forEach((el) => {
          el.classList.remove("confirmed");
        });
      }
    }

    disconnectedCallback() {
      console.log("已关闭");
    }
  }

  // 获取当前的search url 参数并初始化& 初始化drop
  const searchParams = new URLSearchParams(window.location.search);

  customElements.define("coupon-drop", CouponDrop);
  let couponDrop = document.createElement("coupon-drop");

  // 判断是否展示drop
  if (docCookies.getItem("discount_code") == "WELCOME20") {
    console.log("do nothing");
  } else if (searchParams.get("utm_term") === "one-time") {
    // 一次性渲染
    document.body.appendChild(couponDrop);
  } else if (searchParams.get("utm_term") === "long-term") {
    document.body.appendChild(couponDrop);
    // 存入cookie
    docCookies.setItem(
      "long-term",
      window.location.pathname.replace("/products/", ""),
      "",
      window.location.pathname
    );
  } else if (
    docCookies.hasItem("long-term") &&
    docCookies
      .getItem("long-term")
      .includes(window.location.pathname.replace("/products/", ""))
  ) {
    document.body.appendChild(couponDrop);
  }
}

var docCookies = {
  getItem: function (sKey) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || null
    );
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires =
            vEnd === Infinity
              ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
              : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=" +
      encodeURIComponent(sValue) +
      sExpires +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "") +
      (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return new RegExp(
      "(?:^|;\\s*)" +
        encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
        "\\s*\\="
    ).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  },
};

init_coupon();
