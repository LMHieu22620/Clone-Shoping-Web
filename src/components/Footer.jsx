import React from "react";

import { Link } from "react-router-dom";

import Grid from "./Grid";

import logo from "../assets/images/Logo-2.png";

const footerAboutLinks = [
  {
    display: "Giới Thiệu",
    path: "/about",
  },
  {
    display: "Liên Hệ",
    path: "/about",
  },
  {
    display: "Tuyển dụng",
    path: "/about",
  },
  {
    display: "Tin Tức",
    path: "/about",
  },
  {
    display: "Hệ Thống Cửa Hàng ",
    path: "/about",
  },
];

const footerCustomerLink = [
  {
    display: "Chính Sách Đổi Trả",
    path: "/about",
  },
  {
    display: "Chính Sách Bảo Hành",
    path: "/about",
  },
  {
    display: "Chính Sách Hoàn Tiền",
    path: "/about",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Grid col={4} mdCol={2} smCol={1} gap={10}>
          <div>
            <div className="footer__title">Tổng đài hỗ trợ</div>
            <div className="footer__content">
              <p>
                Liên Hệ Đặt Hàng <strong>0123456789</strong>
              </p>
              <p>
                Thắc Mắc Đơn Hàng <strong>0123456789</strong>
              </p>
              <p>
                Góp Ý, Khiếu Nại <strong>0123456789</strong>
              </p>
            </div>
          </div>
          <div>
            <div className="footer__title">Về Yolo</div>
            <div className="footer__content">
              {footerAboutLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__title">Chăm Sóc Khách Hàng</div>
            <div className="footer__content">
              {footerCustomerLink.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div className="footer__about">
            <p>
              <Link to="/">
                <img src={logo} className="footer__logo" />
              </Link>
            </p>
            <p>
              Hướng dẫn mục tiêu mang lại niềm vui ăn mặc mới mỗi ngày cho hàng
              triệu người tiêu dùng Việt. Hãy cùng Yolo hướng đến một cuộc sống
              năng động, tích cực hơn
            </p>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
