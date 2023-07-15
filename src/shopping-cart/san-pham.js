import React, { Component } from "react";

export default class SanPham extends Component {
  render() {
    const { product, getDetailProduct, getProductAddCart } = this.props;
    return (
      <div className="col-sm-4">
        <div className="card">
          <img className="card-img-top" src={product.image} alt="" />
          <div className="card-body">
            <h4 className="card-title">{product.name}</h4>
            <button
              className="btn btn-success"
              onClick={() => {
                getDetailProduct(product);
              }}
            >
              Chi tiết
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                getProductAddCart(product);
              }}
            >
              Thêm giỏ hàng
            </button>
          </div>
        </div>
      </div>
    );
  }
}
