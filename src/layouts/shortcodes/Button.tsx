import React from "react";

const Button = ({
  label,
  link,
  style,
  rel,
}: {
  label: string;
  link: string;
  style?: string;
  rel?: string;
}) => {
  return (
    <a
      href={link}
      target={link.startsWith("http") ? "_blank" : "_self"}
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className={`btn ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      }`}
    >
      {style === "outline" ? <span>{label}</span> : label}
    </a>
  );
};

export default Button;
