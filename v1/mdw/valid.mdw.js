
module.exports={
    //regex: supporting +84, 84, 0084, or 0 as the prefix:
    //e.g: 0084957507468 | +84957507468 | 84957507468 | 0957507468 
    isVietnamesePhoneNumber:function(number) {
        return /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/.test(number);
    },
}
  