"use client"

import { Flex, Card } from "antd";
import "./../../styles/hero.css"

export default function Developers() {
  const developers = [
    {
      name: "Vibhor Phalke",
      role: "Prime Architect",
      faction: "Autobots",
      category: "developers",
      color: "#00bfff"
    },
    {
      name: "Tanish Bhole", 
      role: "Combat Engineer",
      faction: "Autobots",
      category: "developers",
      color: "#00bfff"
    },
    {
      name: "Shashwat Pratap Singh",
      role: "Tech Specialist", 
      faction: "Autobots",
      category: "developers",
      color: "#00bfff"
    },
    {
      name: "Srijan Sahay Srivastava",
      role: "Optimus Prime",
      faction: "Autobots",
      category: "leads",
      color: "#ff4444"
    },
    {
      name: "Jayesh Bansal",
      role: "Ultra Magnus",
      faction: "Autobots",
      category: "leads",
      color: "#ff4444"
    },
    {
      name: "Tanya Singh",
      role: "Arcee Commander",
      faction: "Autobots",
      category: "leads",
      color: "#ff4444"
    },
    {
      name: "Kasturi Sinha",
      role: "Matrix Guardian",
      faction: "Primes",
      category: "creators",
      color: "#ffd700"
    },
    {
      name: "Brij Bhushan Sharma", 
      role: "Spark Creator",
      faction: "Primes",
      category: "creators",
      color: "#ffd700"
    }
  ];

  const groupedDevelopers = {
    developers: developers.filter(dev => dev.category === "developers"),
    leads: developers.filter(dev => dev.category === "leads"),
    creators: developers.filter(dev => dev.category === "creators")
  };

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 75%, #000000 100%)",
      minHeight: "100vh", 
      padding: "2rem",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated background elements */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(0, 191, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 68, 68, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)
        `,
        animation: "pulse 4s ease-in-out infinite"
      }} />
      
      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 style={{ 
            fontSize: "clamp(2.5rem, 8vw, 5rem)", 
            color: "#00bfff", 
            textAlign: "center", 
            marginBottom: "1rem",
            fontFamily: "Anton, sans-serif",
            textShadow: "0 0 20px #00bfff, 0 0 40px #00bfff, 0 0 60px #00bfff",
            letterSpacing: "3px",
            animation: "glow 2s ease-in-out infinite alternate"
          }}>
            TRANSFORMERS
          </h1>
          <div style={{
            fontSize: "clamp(1.2rem, 4vw, 2rem)",
            color: "#ffffff",
            fontFamily: "Anton, sans-serif",
            letterSpacing: "2px",
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)"
          }}>
            <span style={{ color: "#ff4444" }}>AUTOBOTS</span> • <span style={{ color: "#00bfff" }}>ROLL OUT</span>
          </div>
        </div>

        <Flex vertical gap={64}>
          {/* Autobots Developers */}
          <div>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2 style={{ 
                fontSize: "clamp(1.8rem, 5vw, 3rem)", 
                color: "#00bfff", 
                marginBottom: "0.5rem",
                fontFamily: "Anton, sans-serif",
                textShadow: "0 0 15px #00bfff",
                letterSpacing: "2px"
              }}>
                🤖 AUTOBOT ENGINEERS
              </h2>
              <div style={{
                height: "3px",
                width: "200px",
                background: "linear-gradient(90deg, transparent, #00bfff, transparent)",
                margin: "0 auto",
                borderRadius: "2px"
              }} />
            </div>
            <Flex wrap gap={32} justify="center">
              {groupedDevelopers.developers.map((dev, index) => (
                <Card 
                  key={index}
                  style={{ 
                    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
                    border: `2px solid ${dev.color}`, 
                    borderRadius: "16px",
                    minWidth: "280px",
                    maxWidth: "320px",
                    textAlign: "center",
                    boxShadow: `0 8px 32px rgba(0, 191, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                    e.currentTarget.style.boxShadow = `0 16px 48px rgba(0, 191, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = `0 8px 32px rgba(0, 191, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`;
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: "-50%",
                    left: "-50%", 
                    width: "200%",
                    height: "200%",
                    background: `radial-gradient(circle, ${dev.color}20 0%, transparent 70%)`,
                    animation: "rotate 20s linear infinite"
                  }} />
                  <div style={{ position: "relative", zIndex: 1, padding: "1rem" }}>
                    <div style={{
                      fontSize: "2.5rem",
                      marginBottom: "1rem"
                    }}>⚡</div>
                    <h3 style={{ 
                      color: "#fff", 
                      fontSize: "1.3rem", 
                      marginBottom: "0.8rem",
                      fontFamily: "Anton, sans-serif",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
                    }}>
                      {dev.name}
                    </h3>
                    <p style={{ 
                      color: dev.color, 
                      fontSize: "1.1rem", 
                      margin: "0 0 0.5rem 0",
                      fontWeight: "bold",
                      textShadow: `0 0 8px ${dev.color}`
                    }}>
                      {dev.role}
                    </p>
                    <div style={{
                      fontSize: "0.9rem",
                      color: "#cccccc",
                      fontFamily: "monospace",
                      border: `1px solid ${dev.color}40`,
                      borderRadius: "12px",
                      padding: "4px 8px",
                      display: "inline-block"
                    }}>
                      {dev.faction}
                    </div>
                  </div>
                </Card>
              ))}
            </Flex>
          </div>

          {/* Prime Commanders */}
          <div>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2 style={{ 
                fontSize: "clamp(1.8rem, 5vw, 3rem)", 
                color: "#ff4444", 
                marginBottom: "0.5rem",
                fontFamily: "Anton, sans-serif",
                textShadow: "0 0 15px #ff4444",
                letterSpacing: "2px"
              }}>
                🛡️ PRIME COMMANDERS
              </h2>
              <div style={{
                height: "3px",
                width: "200px",
                background: "linear-gradient(90deg, transparent, #ff4444, transparent)",
                margin: "0 auto",
                borderRadius: "2px"
              }} />
            </div>
            <Flex wrap gap={32} justify="center">
              {groupedDevelopers.leads.map((dev, index) => (
                <Card 
                  key={index}
                  style={{ 
                    background: "linear-gradient(135deg, #2e1a1a 0%, #3e1621 50%, #230f0f 100%)",
                    border: `2px solid ${dev.color}`, 
                    borderRadius: "16px",
                    minWidth: "280px",
                    maxWidth: "320px",
                    textAlign: "center",
                    boxShadow: `0 8px 32px rgba(255, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                    e.currentTarget.style.boxShadow = `0 16px 48px rgba(255, 68, 68, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = `0 8px 32px rgba(255, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`;
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: "-50%",
                    left: "-50%", 
                    width: "200%",
                    height: "200%",
                    background: `radial-gradient(circle, ${dev.color}20 0%, transparent 70%)`,
                    animation: "rotate 15s linear infinite reverse"
                  }} />
                  <div style={{ position: "relative", zIndex: 1, padding: "1rem" }}>
                    <div style={{
                      fontSize: "2.5rem",
                      marginBottom: "1rem"
                    }}>👑</div>
                    <h3 style={{ 
                      color: "#fff", 
                      fontSize: "1.3rem", 
                      marginBottom: "0.8rem",
                      fontFamily: "Anton, sans-serif",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
                    }}>
                      {dev.name}
                    </h3>
                    <p style={{ 
                      color: dev.color, 
                      fontSize: "1.1rem", 
                      margin: "0 0 0.5rem 0",
                      fontWeight: "bold",
                      textShadow: `0 0 8px ${dev.color}`
                    }}>
                      {dev.role}
                    </p>
                    <div style={{
                      fontSize: "0.9rem",
                      color: "#cccccc",
                      fontFamily: "monospace",
                      border: `1px solid ${dev.color}40`,
                      borderRadius: "12px",
                      padding: "4px 8px",
                      display: "inline-block"
                    }}>
                      {dev.faction}
                    </div>
                  </div>
                </Card>
              ))}
            </Flex>
          </div>

          {/* Matrix Guardians */}
          <div>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2 style={{ 
                fontSize: "clamp(1.8rem, 5vw, 3rem)", 
                color: "#ffd700", 
                marginBottom: "0.5rem",
                fontFamily: "Anton, sans-serif",
                textShadow: "0 0 15px #ffd700",
                letterSpacing: "2px"
              }}>
                💎 MATRIX GUARDIANS
              </h2>
              <div style={{
                height: "3px",
                width: "200px",
                background: "linear-gradient(90deg, transparent, #ffd700, transparent)",
                margin: "0 auto",
                borderRadius: "2px"
              }} />
            </div>
            <Flex wrap gap={32} justify="center">
              {groupedDevelopers.creators.map((dev, index) => (
                <Card 
                  key={index}
                  style={{ 
                    background: "linear-gradient(135deg, #2e2e1a 0%, #3e3616 50%, #23230f 100%)",
                    border: `2px solid ${dev.color}`, 
                    borderRadius: "16px",
                    minWidth: "280px",
                    maxWidth: "320px",
                    textAlign: "center",
                    boxShadow: `0 8px 32px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                    e.currentTarget.style.boxShadow = `0 16px 48px rgba(255, 215, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = `0 8px 32px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`;
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: "-50%",
                    left: "-50%", 
                    width: "200%",
                    height: "200%",
                    background: `radial-gradient(circle, ${dev.color}20 0%, transparent 70%)`,
                    animation: "rotate 25s linear infinite"
                  }} />
                  <div style={{ position: "relative", zIndex: 1, padding: "1rem" }}>
                    <div style={{
                      fontSize: "2.5rem",
                      marginBottom: "1rem"
                    }}>✨</div>
                    <h3 style={{ 
                      color: "#fff", 
                      fontSize: "1.3rem", 
                      marginBottom: "0.8rem",
                      fontFamily: "Anton, sans-serif",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
                    }}>
                      {dev.name}
                    </h3>
                    <p style={{ 
                      color: dev.color, 
                      fontSize: "1.1rem", 
                      margin: "0 0 0.5rem 0",
                      fontWeight: "bold",
                      textShadow: `0 0 8px ${dev.color}`
                    }}>
                      {dev.role}
                    </p>
                    <div style={{
                      fontSize: "0.9rem",
                      color: "#cccccc",
                      fontFamily: "monospace",
                      border: `1px solid ${dev.color}40`,
                      borderRadius: "12px",
                      padding: "4px 8px",
                      display: "inline-block"
                    }}>
                      {dev.faction}
                    </div>
                  </div>
                </Card>
              ))}
            </Flex>
          </div>

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
              In Partnership With VR AR MR Team  
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
      
      <style jsx global>{`
        @keyframes glow {
          0% { text-shadow: 0 0 20px #00bfff, 0 0 40px #00bfff, 0 0 60px #00bfff; }
          100% { text-shadow: 0 0 30px #00bfff, 0 0 60px #00bfff, 0 0 90px #00bfff; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}