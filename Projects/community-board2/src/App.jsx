import React from "react";
import ResourceCard from "./assets/ResourceCard";

const resources = [
  { title: "Roadmap.sh", description: "Guides on becoming a developer", link: "https://roadmap.sh/" },
  { title: "MDN Web Docs", description: "Great resource for HTML, CSS, and JS", link: "https://developer.mozilla.org/" },
  { title: "The Odin Project", description: "Free tutorial and Hands-on projects to learn Web Development", link: "https://www.theodinproject.com/"},
  { title: "React Docs", description: "Official React documentation", link: "https://react.dev/" },
  { title: "Frontend Mentor", description: "Practice frontend development", link: "https://www.frontendmentor.io/" },
  { title: "CSS Tricks", description: "Tips and tricks for CSS", link: "https://css-tricks.com/" },
  { title: "JavaScript Info", description: "Comprehensive JS learning resource", link: "https://javascript.info/" },
  { title: "LeetCode", description: "Practice coding problems", link: "https://leetcode.com/" },
  { title: "CodeWars", description: "Improve coding skills through challenges", link: "https://www.codewars.com/" },
  { title: "Dev.to", description: "Community of developers", link: "https://dev.to/" },
  { title: "Smashing Magazine", description: "Articles on design and development", link: "https://www.smashingmagazine.com/" },
];

const App = () => {
  return (
    <div className="container">
      <h1>Software Engineering Learning Resources</h1>
      <div className="card-grid">
        {resources.map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>
    </div>
  );
};

export default App;
