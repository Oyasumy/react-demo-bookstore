import React, { useState } from "react";
import { Input, Menu } from "semantic-ui-react";
import { Route, Link } from "react-router-dom";
const Navigation = () => {
  const [activeItem, setActiveItem] = useState("home");
  const handleItemClick = (e, { name }) => setActiveItem(name);
  // custom menu
  const menu = [
    {
      to: "/",
      label: "Trang Chủ",
      exact: true,
    },
    {
      to: "/bansach",
      label: "Bán Sách",
      exact: false,
    },
    {
      to: "/nhapsach",
      label: "Nhập Sách",
      exact: false,
    },
    {
      to: "/sach",
      label: "Thông tin Sách",
      exact: false,
    },
    {
      to: "/report",
      label: "Báo Cáo",
      exact: false,
    }, {
      to: "/changerules",
      label: "Thay đổi quy định",
      exact: false,
    },
  ];
  const MenuLink = ({ label, to, exactOnlyWhenActive }) => {
    return (
      <Route
        path={to}
        exact={exactOnlyWhenActive}
        children={({ match }) => {
          //   var active = match ? "active" : "";
          return (
            <Menu.Item
              as={Link}
              to={to}
              name={label}
              link={true}
              active={activeItem === label}
              onClick={handleItemClick}
            ></Menu.Item>
          );
        }}
      />
    );
  };
  //show menu
  const showMenu = () => {
    var result = null;
    result = menu.map((item) => {
      return (
        <MenuLink
          key={item.to}
          label={item.label}
          to={item.to}
          exactOnlyWhenActive={item.exact}
        />
      );
    });
    return result;
  };
  return (
    <Menu pointing>
      {showMenu(menu)}

      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navigation;
