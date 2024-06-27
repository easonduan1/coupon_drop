//定义自定义元素（Custom Element）
class CouponDrop extends HTMLElement {
    //使用构造函数来创建和初始化资源
    constructor() {
        super();

        //创建 Shadow DOM
        var shadow = this.attachShadow({mode: 'open'});

        // 定义HTML模板（HTML template）
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .coupon-drop {
                    position: fixed;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    margin: auto;
                    top: 0;
                    width: 100%;
                    height: 100px;
                    background-color: #f5f5f5;
                    box-shadow: 0px 0px 5px gray;
                    border-radius: 10px;
                }
                
                .close-button {
                    position: absolute;
                    right: 15px;
                    top: 15px;
                    border: none;
                    background: transparent;
                    font-size: 1.5em;
                }
            </style>
            <div class="coupon-drop">
                <h3>$100</h3>
                <p>折扣!!!</p>
                <button class="close-button">❎</button>
            </div>
        `;

        // 在 Shadow DOM 中的将HTML模板加入到你定义的自定义元素中
        shadow.appendChild(template.content.cloneNode(true));
    }

    //对元素的 "生命周期" 进行修改，例如元素被添加或删除到 DOM时，或元素的属性发生变化时
    connectedCallback() {
        this.shadowRoot.querySelector('.close-button').addEventListener('click', () => {
            this.remove();
        });
    }

    disconnectedCallback() {
        console.log('Coupon Drop removed from the document body!');
    }
}

//定义自定义元素的名称
customElements.define('coupon-drop', CouponDrop);

let couponDrop = document.createElement('coupon-drop');
document.body.appendChild(couponDrop);