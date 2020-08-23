Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
            default: false
        },
        product_id: {
            type: String,
            required: true
        },
        product: {
            type: Object,
            required: true
        }
    },
    template: `
        <div class="product">

            <div class="product_left_part">

                <img :src="image">

                <div class="panel">
                    <div class="status">
                        <span style="color: green;" v-if="number > 10">庫存充足</span>
                        <span style="color: DarkRed;" v-else-if="number > 0">尚餘 {{ number }} 件！</span>
                        <span style="color: DarkRed;" v-else>已售罄！</span>
                    </div>

                    <button class="add_to_cart" @click="addToCart" :disabled="outOfStock">加到購物車</button>
                </div>

            </div>

            <div class="product_info">

                <h1>{{ product.name }}</h1>

                <h2>商品單價</h2>
                <span class="price" v-if="premium">
                    <span class="strike">NT$ {{ product.price }}</span>
                    <span class="premium_price">NT$ {{ product.price * 0.75 }} (25% OFF)</span>
                </span>
                <span class="price" v-else>NT$ {{ product.price }}</span>

                <h2>商品資訊</h2>
                <ul>
                    <li v-for="detail in product.details">{{ detail }}</li>
                </ul>

                <h2>可選顏色</h2>
                <div class="sel_box_container">
                    <span class="sel_box"
                          v-for="(variant, idx) in product.variants"
                          :class="{selected: selected_variant === idx}"
                          @mouseover="selectVariant(idx)"
                          :style="{'background-color': variant.color}">
                        {{ variant.color_name }}
                    </span>
                </div>
                
                <h2>可選尺寸</h2>
                <div class="sel_box_container">
                    <span class="sel_box size_box"
                          v-for="(size, idx) in product.variants[selected_variant].sizes"
                          :class="{selected: selected_size === idx}"
                          @mouseover="selectSize(idx)">
                        {{ size }}
                    </span>
                </div>

            </div>

        </div>
    `,
    data() {
        return {
            selected_variant: 0,
            selected_size: 0
        };
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.product_id, this.selected_variant, this.selected_size);
        },

        selectVariant(idx) {
            this.selected_variant = idx;
        },
        selectSize(idx) {
            this.selected_size = idx;
        }
    },
    computed: {
        image() {
            return this.product.variants[this.selected_variant].image;
        },
        number() {
            return this.product.variants[this.selected_variant].quantity[this.selected_size];
        },
        outOfStock() {
            return this.product.variants[this.selected_variant].quantity[this.selected_size] === 0;
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        show_statement: true,

        premium: false,

        cart: [],
        expand_shopping_cart: false,
        stay_left: {
            'margin-left': '10px',
        },
        stay_right: {
            'margin-left': '150px' 
        },
        products: {
            '3453': {
                name: "皮克斯動畫圖案襪子",
                details: ['100% 純棉', '臺灣製造', '優質耐穿'],
                price: 150,
                variants: [
                    {
                        image: 'https://www.stance.com/dw/image/v2/BBBN_PRD/on/demandware.static/-/Sites-masterCatalog_Stance/default/dwb0f12add/prod_images/A546A20UPP_BLU.jpg?sw=625&sh=2000&sm=fit',
                        color_name: '天藍色',
                        color: '#507fb8',
                        sizes: ['XS', 'S', 'M', 'L', 'XL'],
                        quantity: [25, 10, 8, 6, 0]
                    },
                    {
                        image: 'https://www.stance.com/dw/image/v2/BBBN_PRD/on/demandware.static/-/Sites-masterCatalog_Stance/default/dw65c19a65/prod_images/A546A20FIN_BLU.jpg?sw=625&sh=1000&sm=fit',
                        color_name: '海藍色',
                        color: '#052484',
                        sizes: ['XS', 'S', 'M', 'L', 'XL'],
                        quantity: [25, 0, 0, 11, 8]
                    },
                    {
                        image: 'https://www.stance.com/dw/image/v2/BBBN_PRD/on/demandware.static/-/Sites-masterCatalog_Stance/default/dw7b3e42d7/prod_images/A546A20SUL_PUL.jpg?sw=625&sh=1000&sm=fit',
                        color_name: '蒼灰色',
                        color: '#9394b3',
                        sizes: ['XS', 'S', 'M', 'L', 'XL'],
                        quantity: [7, 0, 18, 65, 20]
                    }
                ]
            },
            '3454': {
                name: "UNIQLO 圓領素T",
                details: ['日本知名品牌 UNIQLO 必買服飾', '網友大力推薦', '輕薄涼爽'],
                price: 990,
                variants: [
                    {
                        image: 'https://cdn.bella.tw/files/%E5%A5%B3%E8%A3%9D_%E5%9C%93%E9%A0%98T%E6%81%A4__%E7%9F%AD%E8%A2%96__NT_390_%E5%96%AE%E5%93%81%E5%9C%962-removebg-preview.png',
                        color_name: '亮橘色',
                        color: '#fabb8e',
                        sizes: ['S', 'M', 'L'],
                        quantity: [23, 40, 18]
                    },
                    {
                        image: 'https://im.uniqlo.com/images/tw/uq/pc/goods/407044/item/03_407044_middlel.jpg',
                        color_name: '淺灰色',
                        color: '#c1c0bb',
                        sizes: ['S', 'M', 'L'],
                        quantity: [32, 55, 24]
                    }
                ]
            },
            '3455': {
                name: '圓筒洗衣籃',
                details: ['輕便', '可折疊', '時尚', '防水'],
                price: 99,
                variants: [
                    {
                        image: 'https://cf.shopee.tw/file/5de70b8ca9fbee1a9c9de25738842085_tn',
                        color_name: '白',
                        color: 'white',
                        sizes: ['單一尺寸'],
                        quantity: [30]
                    },
                    {
                        image: 'https://cf.shopee.tw/file/d47054ff7aa761fde1d2e16efadb23ad_tn',
                        color_name: '黑',
                        color: 'black',
                        sizes: ['單一尺寸'],
                        quantity: [35]
                    }
                ]
            }
        }
    },
    methods: {
        onCloseStatement() {
            this.show_statement = false;
        },

        /*
         *
         *  Note: Use splice() to update the variable so that the value can be updated when calling computed methods.
         *
         */
        onAddToCart(product_id, selected_variant, selected_size) {
            // take this item from the storage
            var tmp_product = this.products[product_id];
            var new_val = tmp_product.variants[selected_variant].quantity[selected_size] - 1;
            this.products[product_id].variants[selected_variant].quantity.splice(selected_size, 1, new_val);

            // put this item to the shopping cart
            this.cart.push({id: product_id, variant: selected_variant, size: selected_size});
        },
        onRemoveFromCart(idx) {
            var item = this.cart[idx];
            var product_id = item.id;
            var selected_variant = item.variant;
            var selected_size = item.size;

            // put this item back to the storage
            var tmp_product = this.products[product_id];
            var new_val = tmp_product.variants[selected_variant].quantity[selected_size] + 1;
            this.products[product_id].variants[selected_variant].quantity.splice(selected_size, 1, new_val);

            // remove this item from the shopping cart
            this.cart.splice(idx, 1);
        },

        onUpgradeMembership() {
            this.premium = true;
            alert('就是這麼容易，現在你是會員了！');
        },

        onToggleShoppingCart() {
            this.expand_shopping_cart = !this.expand_shopping_cart;       
        }
    },
    computed: {
        cartIsEmpty() {
            return this.cart.length === 0;
        },
        total() {
            var total = 0;
            for(var idx in this.cart)
                total += this.products[this.cart[idx].id].price;

            if(this.premium)
                total *= 0.75;

            return total;
        }
    }
});
