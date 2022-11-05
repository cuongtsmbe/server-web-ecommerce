module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;
    //them san pham vao gio hang
    this.add = function(item, id, sl=1) {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = {item: item, quantity: 0, price: 0};
        }
        cartItem.quantity=cartItem.quantity +sl ;
        cartItem.price = cartItem.item.don_gia * cartItem.quantity;
        this.totalItems=this.totalItems+sl;
        this.totalPrice = this.totalPrice+cartItem.item.don_gia * sl;
    };
    //1.giam so luong san pham trong gio hàng
    //2.số lượng sản phẩm =0 thì xóa khỏi giỏ hàng , còn !=0 thì trừ tiền và quantity
    this.reduce = function(item, id) {
        var cartItem = this.items[id];
        if (!cartItem) {
            return false;
        }
        cartItem.quantity--;
        this.totalItems--;
        //2
        if(cartItem.quantity==0){
            this.remove(id);
            return false;
        }
        cartItem.price = cartItem.item.don_gia * cartItem.quantity;
        this.totalPrice -= cartItem.item.don_gia;
        
    };
    //xoa san pham trong gio hang 
    this.remove = function(id) {
        var cartItem = this.items[id];
        if (!cartItem) {
            return false;
        }
        this.totalItems -= this.items[id].quantity;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    //return array detail product,quantity,price
    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};