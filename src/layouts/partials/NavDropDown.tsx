import React, { useState } from "react";

const NavDropDown = ({ menu, pathname }: { menu: any; pathname: any }) => {
  const [showContent, setShowContent] = useState(false);

  const handleChildMenuClick = () => {
    setShowContent(!showContent);
  };
  return (
    <li
      onClick={handleChildMenuClick}
      className="nav-item nav-dropdown group relative"
    >
      <span className="nav-link inline-flex items-center cursor-pointer">
        {menu.name}
        <svg
          className={`ml-2 h-[0.65rem] w-[0.65rem] fill-current transition-transform duration-200 ease-in-out lg:group-hover:rotate-180 ${showContent && "max-lg:rotate-180"}`}
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.246 7.08718C3.20733 7.04951 3.042 6.90728 2.906 6.77479C2.05067 5.99804 0.650667 3.97174 0.223333 2.91118C0.154667 2.75011 0.00933333 2.3429 0 2.12533C0 1.91686 0.048 1.71813 0.145333 1.52848C0.281333 1.29208 0.495333 1.10244 0.748 0.998529C0.923333 0.931635 1.448 0.827722 1.45733 0.827722C2.03133 0.723809 2.964 0.666656 3.99467 0.666656C4.97667 0.666656 5.87133 0.723809 6.454 0.808887C6.46333 0.818629 7.11533 0.922542 7.33867 1.0362C7.74667 1.24467 8 1.65188 8 2.08767V2.12533C7.99 2.40915 7.73667 3.006 7.72733 3.006C7.29933 4.00941 5.968 5.98895 5.08333 6.78453C5.08333 6.78453 4.856 7.00859 4.714 7.10601C4.51 7.25799 4.25733 7.33332 4.00467 7.33332C3.72267 7.33332 3.46 7.24824 3.246 7.08718Z"
            fill="white"
          />
        </svg>
      </span>

      <ul
        className={`hidden lg:p-8 mb-2 lg:mb-0 lg:transition-[opacity_transform] lg:duration-500 lg:fixed left-1/2 lg:invisible lg:group-hover:visible lg:opacity-0 lg:group-hover:opacity-100 lg:scale-95 lg:group-hover:scale-100 lg:group-hover:grid lg:grid lg:grid-cols-3 lg:gap-x-8 min-w-max nav-dropdown-list lg:-translate-x-1/2 ${
          showContent && "max-lg:block"
        }`}
      >
        {menu.children?.map((child: any, index: number) => (
          <li key={index} className="nav-dropdown-item">
            <a
              href={child.url}
              aria-label={child.name}
              className={`nav-dropdown-link block ${
                (pathname === `${child.url}/` || pathname === child.url) &&
                "active"
              }`}
            >
              {child.name}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default NavDropDown;
