import React from "react";

const ResourceCard = ({ title, description, link }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button className="learn-more-btn">Learn More</button>
      </a>
    </div>
  );
};

export default ResourceCard;
