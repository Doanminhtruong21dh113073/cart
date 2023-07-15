import React, { Component } from "react";
import SanPham from "./san-pham";

export default class DanhSachSanPham extends Component {
  renderListProduct = () => {
    const { listProduct, getDetailProduct, getProductAddCart } = this.props;

    return listProduct.map((product) => {
      return (
        <SanPham
          key={product.id}
          product={product}
          getDetailProduct={getDetailProduct}
          getProductAddCart={getProductAddCart}
        />
      );
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">{this.renderListProduct()}</div>
      </div>
    );
  }
}
