"use client"

import { Flex, Card } from "antd";
import "./../../styles/hero.css"

export default function Developers() {
  const developers = [
    {
      name: "Vibhor Phalke",
      role: "Full Stack Developer",
      category: "developers",
      icon: "💻"
    },
    {
      name: "Tanish Bhole", 
      role: "Full Stack Developer",
      category: "developers",
      icon: "💻"
    },
    {
      name: "Shashwat Pratap Singh",
      role: "Full Stack Developer", 
      category: "developers",
      icon: "💻"
    },
    {
      name: "Srijan Sahay Srivastava",
      role: "Project Lead",
      category: "leads",
      icon: "👑"
    },
    {
      name: "Jayesh Bansal",
      role: "Technical Lead",
      category: "leads",
      icon: "👑"
    },
    {
      name: "Tanya Singh",
      role: "Design Lead",
      category: "leads",
      icon: "👑"
    },
    {
      name: "Kasturi Sinha",
      role: "Content Creator",
      category: "creators",
      icon: "🎨"
    },
    {
      name: "Brij Bhushan Sharma", 
      role: "Game Designer",
      category: "creators",
      icon: "🎨"
    }
  ];

  const groupedDevelopers = {
    developers: developers.filter(dev => dev.category === "developers"),
    leads: developers.filter(dev => dev.category === "leads"),
    creators: developers.filter(dev => dev.category === "creators")
  };

  const categoryStyles = {
    developers: {
      title: "Development Team",
      color: "#00d4ff",
      gradient: "linear-gradient(135deg, #001a2e 0%, #003d5c 100%)",
      border: "#00d4ff"
    },
    leads: {
      title: "Leadership Team", 
      color: "#ff6b35",
      gradient: "linear-gradient(135deg, #2e1a00 0%, #5c3d00 100%)",
      border: "#ff6b35"
    },
    creators: {
      title: "Creative Team",
      color: "#9c27b0",
      gradient: "linear-gradient(135deg, #2e002e 0%, #5c005c 100%)",
      border: "#9c27b0"
    }
  };

  return (
    <div style={{ 
      backgroundColor: "#0a0a0a", 
      minHeight: "100vh", 
      padding: "2rem",
      backgroundImage: "radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%), radial-gradient(circle at 75% 75%, #16213e 0%, transparent 50%)"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 style={{ 
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)", 
            color: "#ffffff", 
            marginBottom: "1rem",
            fontFamily: "Anton, sans-serif",
            textShadow: "2px 2px 20px rgba(0, 212, 255, 0.3)",
            letterSpacing: "2px"
          }}>
            MEET THE TEAM
          </h1>
          <div style={{
            width: "100px",
            height: "4px",
            background: "linear-gradient(90deg, #00d4ff, #ff6b35, #9c27b0)",
            margin: "0 auto",
            borderRadius: "2px"
          }} />
          <p style={{
            fontSize: "1.2rem",
            color: "#cccccc",
            marginTop: "1rem",
            maxWidth: "600px",
            margin: "1rem auto 0"
          }}>
            The brilliant minds behind Tachyon War for Treasure
          </p>
        </div>

        <Flex vertical gap={48}>
          {/* Development Team */}
          <section>
            <h2 style={{ 
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)", 
              color: categoryStyles.developers.color,
              marginBottom: "2rem",
              fontFamily: "Anton, sans-serif",
              textAlign: "center",
              textShadow: `0 0 10px ${categoryStyles.developers.color}`
            }}>
              {categoryStyles.developers.title}
            </h2>
            <Flex wrap gap={24} justify="center">
              {groupedDevelopers.developers.map((dev, index) => (
                <Card 
                  key={index}
                  style={{ 
                    background: categoryStyles.developers.gradient,
                    border: `2px solid ${categoryStyles.developers.border}`,
                    borderRadius: "16px",
                    minWidth: "280px",
                    maxWidth: "320px",
                    textAlign: "center",
                    boxShadow: `0 8px 32px rgba(0, 212, 255, 0.2)`,
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 16px 48px rgba(0, 212, 255, 0.4)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 8px 32px rgba(0, 212, 255, 0.2)`;
                  }}
                >
                  <div style={{ padding: "1.5rem" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                      {dev.icon}
                    </div>
                    <h3 style={{ 
                      color: "#ffffff", 
                      fontSize: "1.4rem", 
                      marginBottom: "0.8rem",
                      fontWeight: "600"
                    }}>
                      {dev.name}
                    </h3>
                    <p style={{ 
                      color: categoryStyles.developers.color, 
                      fontSize: "1.1rem", 
                      margin: 0,
                      fontWeight: "500"
                    }}>
                      {dev.role}
                    </p>
                  </div>
                </Card>
              ))}
            </Flex>
          </section>

          {/* Leadership Team */}
          <section>
            <h2 style={{ 
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)", 
              color: categoryStyles.leads.color,
              marginBottom: "2rem",
              fontFamily: "Anton, sans-serif",
              textAlign: "center",
              textShadow: `0 0 10px ${categoryStyles.leads.color}`
            }}>
              {categoryStyles.leads.title}
            </h2>
            <Flex wrap gap={24} justify="center">
              {groupedDevelopers.leads.map((dev, index) => (
                <Card 
                  key={index}
                  style={{ 
                    background: categoryStyles.leads.gradient,
                    border: `2px solid ${categoryStyles.leads.border}`,
                    borderRadius: "16px",
                    minWidth: "280px",
                    maxWidth: "320px",
                    textAlign: "center",
                    boxShadow: `0 8px 32px rgba(255, 107, 53, 0.2)`,
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 16px 48px rgba(255, 107, 53, 0.4)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 8px 32px rgba(255, 107, 53, 0.2)`;
                  }}
                >
                  <div style={{ padding: "1.5rem" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                      {dev.icon}
                    </div>
                    <h3 style={{ 
                      color: "#ffffff", 
                      fontSize: "1.4rem", 
                      marginBottom: "0.8rem",
                      fontWeight: "600"
                    }}>
                      {dev.name}
                    </h3>
                    <p style={{ 
                      color: categoryStyles.leads.color, 
                      fontSize: "1.1rem", 
                      margin: 0,
                      fontWeight: "500"
                    }}>
                      {dev.role}
                    </p>
                  </div>
                </Card>
              ))}
            </Flex>
          </section>

          {/* Creative Team */}
          <section>
            <h2 style={{ 
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)", 
              color: categoryStyles.creators.color,
              marginBottom: "2rem",
              fontFamily: "Anton, sans-serif",
              textAlign: "center",
              textShadow: `0 0 10px ${categoryStyles.creators.color}`
            }}>
              {categoryStyles.creators.title}
            </h2>
            <Flex wrap gap={24} justify="center">
              {groupedDevelopers.creators.map((dev, index) => (
                <Card 
                  key={index}
                  style={{ 
                    background: categoryStyles.creators.gradient,
                    border: `2px solid ${categoryStyles.creators.border}`,
                    borderRadius: "16px",
                    minWidth: "280px",
                    maxWidth: "320px",
                    textAlign: "center",
                    boxShadow: `0 8px 32px rgba(156, 39, 176, 0.2)`,
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 16px 48px rgba(156, 39, 176, 0.4)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 8px 32px rgba(156, 39, 176, 0.2)`;
                  }}
                >
                  <div style={{ padding: "1.5rem" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                      {dev.icon}
                    </div>
                    <h3 style={{ 
                      color: "#ffffff", 
                      fontSize: "1.4rem", 
                      marginBottom: "0.8rem",
                      fontWeight: "600"
                    }}>
                      {dev.name}
                    </h3>
                    <p style={{ 
                      color: categoryStyles.creators.color, 
                      fontSize: "1.1rem", 
                      margin: 0,
                      fontWeight: "500"
                    }}>
                      {dev.role}
                    </p>
                  </div>
                </Card>
              ))}
            </Flex>
          </section>

          {/* Alliance Message */}
          <div style={{ 
            textAlign: "center", 
            marginTop: "4rem",
            padding: "2rem",
            background: "linear-gradient(135deg, rgba(0, 191, 255, 0.1), rgba(255, 68, 68, 0.1))",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{
              fontSize: "3rem",
              marginBottom: "1rem"
            }}>🤝</div>
            <h3 style={{ 
              fontSize: "clamp(1.2rem, 4vw, 2rem)", 
              color: "#fff", 
              fontFamily: "Anton, sans-serif",
              marginBottom: "1rem",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
            }}>
              ALLIANCE FORGED
            </h3>
            <p style={{ 
              color: "#00bfff", 
              fontSize: "1.2rem",
              fontWeight: "600",
              textShadow: "0 0 8px #00bfff",
              fontFamily: "Anton, sans-serif"
            }}>
              In Partnership With VR AR MR Team �
            </p>
            <div style={{
              marginTop: "1rem",
              fontSize: "0.9rem",
              color: "#cccccc",
              fontStyle: "italic"
            }}>
              "Till All Are One" - Optimus Prime
            </div>
          </div>
        </Flex>
      </div>
      

    </div>
  );
}