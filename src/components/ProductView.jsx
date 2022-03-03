import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import numberWithCommas from "../utils/numberWithCommas";

import { withRouter } from "react-router-dom";
const ProductView = (props) => {
  const product = props.product;
  const [previewImg, setPreviewImg] = useState(product.image01);

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState(undefined);
  const [size, setSize] = useState(undefined);
  const [quantily, setQuantily] = useState(1);
  const updateQuatily = (type) => {
    if (type === "flus") {
      setQuantily(quantily + 1);
    } else {
      setQuantily(quantily - 1 < 1 ? 1 : quantily - 1);
    }
  };

  useEffect(() => {
    setPreviewImg(product.image01);
    setQuantily(1);
    setColor(undefined);
    setSize(undefined);
  }, [product]);

  const check = () => {
    let res = true;
    if (color === undefined) {
      alert("vui lòng chọn màu sắc! ");
      return false;
    }
    if (size === undefined) {
      alert("vui lòng chọn kích cỡ! ");
      return false;
    }

    return true;
  };

  const addToCart = () => {
    if (check()) console.log({ color, size, quantily });
  };
  const goToCart = () => {
    if (check()) props.history.push("/cart");
  };
  console.log(props.history);
  return (
    <div className="product">
      <div className="product__image">
        <div className="product__image__list">
          <div
            className="product__image__list__item"
            onClick={() => setPreviewImg(product.image01)}
          >
            <img src={product.image01} />
          </div>
          <div
            className="product__image__list__item"
            onClick={() => setPreviewImg(product.image02)}
          >
            <img src={product.image02} />
          </div>
        </div>
        <div className="product__image__main">
          <img src={previewImg} alt="" />
        </div>
        <div
          className={`product-description ${descriptionExpand ? "expand" : ""}`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product.title}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {numberWithCommas(product.price)}
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Màu Sắc</div>
          <div className="product__info__item__list">
            {product.colors.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item ? "active" : ""
                }`}
                onClick={() => setColor(item)}
              >
                <div className={`cricle bg-${item}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Kích cỡ</div>
          <div className="product__info__item__list">
            {product.size.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item ? "active" : ""
                }`}
                onClick={() => setSize(item)}
              >
                <span className="product__info__item__list__item__size">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số Lượng</div>
          <div className="product__info__item__quantily">
            <div
              className="product__info__item__quantily__btn"
              onClick={() => updateQuatily("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantily__input">
              {quantily}
            </div>
            <div
              className="product__info__item__quantily__btn"
              onClick={() => updateQuatily("flus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <Button size="sm" onClick={() => addToCart()}>
            thêm vào giỏ
          </Button>
          <Button size="sm" onClick={() => goToCart()}>
            mua ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object.isRequired,
};

export default withRouter(ProductView);
