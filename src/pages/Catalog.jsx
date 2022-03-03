import React, { useCallback, useEffect, useRef, useState } from "react";

import Helmet from "../components/Helmet";

import productData from "../assets/fake-data/products";
import CheckBox from "../components/CheckBox";

import category from "../assets/fake-data/category";
import colors from "../assets/fake-data/product-color";
import size from "../assets/fake-data/product-size";
import Button from "../components/Button";
import InfinityListt from "../components/InfinityListt";
const Catalog = () => {
  const initFilter = {
    category: [],
    color: [],
    size: [],
  };

  const productList = productData.getAllProducts();

  const [products, setProducts] = useState(productList);

  const [filter, setFilter] = useState(initFilter);

  const filterSelect = (type, item, checked) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.categorySlug],
          });
          break;
        case "COLOR":
          setFilter({
            ...filter,
            color: [...filter.color, item.color],
          });
          break;
        case "SIZE":
          setFilter({
            ...filter,
            size: [...filter.size, item.size],
          });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategary = filter.category.filter(
            (e) => e !== item.categorySlug
          );
          setFilter({
            ...filter,
            category: newCategary,
          });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item.color);
          setFilter({
            ...filter,
            color: newColor,
          });
          break;
        case "SIZE":
          const newSize = filter.size.filter((e) => e !== item.size);
          setFilter({
            ...filter,
            size: newSize,
          });
          break;
        default:
      }
    }
  };

  const clearFilter = () => setFilter(initFilter);

  const updateProduct = useCallback(() => {
    let temp = productList;
    if (filter.category.length > 0) {
      temp = temp.filter((e) => filter.category.includes(e.categorySlug));
    }

    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((color) => filter.color.includes(color));
        return check !== undefined;
      });
    }
    if (filter.size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.size.find((size) => filter.size.includes(size));
        return check !== undefined;
      });
    }

    setProducts(temp);
  }, [filter, productList]);

  useEffect(() => {
    updateProduct();
  }, [updateProduct]);

  const filterRef = useRef(null);
  const showHideFilter = () => {
    filterRef.current.classList.toggle("active");
  };

  return (
    <Helmet title="Sản Phẩm">
      {console.log(filter)}
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div className="catalog__filter__close">
            <i
              className="bx bx-left-arrow-alt"
              onClick={() => showHideFilter()}
            ></i>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              danh mục sản phẩm
            </div>
            <div className="catalog__filter__widget__content">
              {category.map((item, index) => (
                <p
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    lable={item.display}
                    onChange={(input) =>
                      filterSelect("CATEGORY", item, input.checked)
                    }
                    checked={filter.category.includes(item.categorySlug)}
                  />
                </p>
              ))}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">màu sắc</div>
            <div className="catalog__filter__widget__content">
              {colors.map((item, index) => (
                <p
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    lable={item.display}
                    onChange={(input) =>
                      filterSelect("COLOR", item, input.checked)
                    }
                    checked={filter.color.includes(item.color)}
                  />
                </p>
              ))}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">kích cỡ</div>
            <div className="catalog__filter__widget__content">
              {size.map((item, index) => (
                <p
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    lable={item.display}
                    onChange={(input) =>
                      filterSelect("SIZE", item, input.checked)
                    }
                    checked={filter.size.includes(item.size)}
                  />
                </p>
              ))}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget_content">
              <Button size="sm" onClick={clearFilter}>
                xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <Button size="sm" onClick={() => showHideFilter()}>
            Bộ Lọc
          </Button>
        </div>
        <div className="catalog__content">
          <InfinityListt data={products} />
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
