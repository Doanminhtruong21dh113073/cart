import React, { Component } from "react";
import DanhSachSanPham from "./danh-sach-san-pham";
import Modal from "./modal";
import data from "./data.json";

export default class LiftingStateUpCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: data,
      productDetail: data[0],
      listCart: [],
    };
  }

  handleDetailProduct = (product) => {
    //nhận product từ DSSP <= SP
    this.setState({
      productDetail: product,
    });
  };

  _findIndex = (id) =>
    this.state.listCart.findIndex((product) => product.id === id);

  handleAddCart = (product) => {
    const index = this._findIndex(product.id);

    //tạo mảng listCart mới từ this.state.listCart
    let listCart = [...this.state.listCart];

    if (index !== -1) {
      //tim thay => Cap nhat SL
      listCart[index].soLuong += 1;
    } else {
      //add to listCart
      const productAddCart = {
        id: product.id,
        name: product.name,
        image: product.image,
        soLuong: 1,
        price: product.price,
      };

      listCart.push(productAddCart);
    }

    //Cập nhật lại state
    this.setState({
      listCart,
    });
  };

  handleUpdateQuantity = (maSP, isPlus) => {
    let listCartClone = [...this.state.listCart];
    const index = this._findIndex(maSP);

    if (index !== -1) {
      if (isPlus) {
        //tang SL
        listCartClone[index].soLuong += 1;
      } else {
        // giam SL
        if (listCartClone[index].soLuong > 1) {
          listCartClone[index].soLuong -= 1;
        }
      }

      //cap nhat lai state
      this.setState({
        listCart: listCartClone,
      });
    }
  };

  handleDeleteProduct = (id) => {
    //clone mảng listCart
    let listCartClone = [...this.state.listCart];

    //tim vi tri
    const index = this._findIndex(id);

    if (index !== -1) {
      //xoa
      listCartClone.splice(index, 1);
      //cap nhat state
      this.setState({
        listCart: listCartClone,
      });
    }
  };

  totalQuantity = () => {
    return this.state.listCart.reduce(
      (total, product) => (total += product.soLuong),
      0
    );
  };

  render() {
    const { productDetail, listCart } = this.state;
    return (
      <div>
        <h3 className="title">Bài tập giỏ hàng</h3>
        <div className="container">
          <button
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#modelId"
          >
            Giỏ hàng ({this.totalQuantity()})
          </button>
        </div>
        <DanhSachSanPham
          listProduct={this.state.listProduct}
          getDetailProduct={this.handleDetailProduct}
          getProductAddCart={this.handleAddCart}
        />
        <Modal
          listCart={listCart}
          getProductUpdate={this.handleUpdateQuantity}
          getDelProduct={this.handleDeleteProduct}
        />
        <div className="row">
          <div className="col-sm-5">
            <img
              className="img-fluid"
              src="./image/http://svcy3.myclass.vn/images/adidas-prophere.png"
              alt=""
            />
          </div>
          <div className="col-sm-7">
            <h3>Cart</h3>
            <table className="table">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{productDetail.name}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{productDetail.alias}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{productDetail.price}</td>
                </tr>
                <tr>
                  <td>Des</td>
                  <td>{productDetail.description}</td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td>{productDetail.quantity}</td>
                </tr>
                {/* <tr>
                  <td>image</td>
                  <td>{productDetail.image}</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
