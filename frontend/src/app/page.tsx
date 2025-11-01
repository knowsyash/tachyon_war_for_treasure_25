"use client"

import logo from "./assets/treasure-1-removebg.png"
import hero from "./assets/pngwing.com (1).png";
import { Button, Flex, Image } from "antd";
import { useRouter } from "next/navigation";
import { TextHoverEffect } from "./components/texthover";
import { FollowPointer, FollowerPointerCard } from "./components/pointercard";
import "./styles/hero.css"
import { ExpandableCardDemo } from "./components/elites";

export default function Home() {
  const router = useRouter();
  const scrollToElites = () => {
    document.querySelector('.rules-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero-background">
      <div className="hero-headline-bg"
        style={{
          minHeight: '60vh',
          maxHeight: '700px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '2rem 0',
          backgroundImage: `url(${require('./assets/0fa650ebbe47aa5e4044108eb521dac4.gif')})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#000',
        }}
      >
        <div className="hero-wrapper" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2vw' }}>
          <Flex justify="space-between" align="center" style={{ width: "100%", marginBottom: '2rem' }}>
            <div></div>
            <div style={{ height: "100px", width: "100px" }}>
              <Image src={logo.src} preview={false}></Image>
            </div>
          </Flex>
          <div style={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: window.innerWidth <= 768 ? 'center' : 'flex-start', 
            justifyContent: 'center',
            textAlign: window.innerWidth <= 768 ? 'center' : 'left',
            padding: window.innerWidth <= 480 ? '1rem' : window.innerWidth <= 768 ? '1.5rem' : '2rem',
            gap: window.innerWidth <= 480 ? '0.5rem' : '1rem'
          }}>
            <h1 className="anton-heading" style={{ 
              fontSize: 'clamp(1.8rem, 7vw, 6rem)', 
              lineHeight: window.innerWidth <= 480 ? '1.2' : '1.1', 
              marginBottom: window.innerWidth <= 480 ? '0.2rem' : '0.5rem', 
              color: '#ffffffe3', 
              textShadow: '3px 3px 12px rgba(0,0,0,0.8)', 
              textAlign: 'inherit',
              wordBreak: 'break-word',
              hyphens: 'auto'
            }}>WAR FOR</h1>
            <h1 className="anton-heading" style={{ 
              fontSize: 'clamp(1.8rem, 7vw, 6rem)', 
              lineHeight: window.innerWidth <= 480 ? '1.2' : '1.1', 
              marginBottom: window.innerWidth <= 480 ? '1rem' : '1.5rem', 
              color: '#fff', 
              textShadow: '3px 3px 12px rgba(0,0,0,0.8)', 
              textAlign: 'inherit',
              wordBreak: 'break-word',
              hyphens: 'auto'
            }}><span className="stroke">TREZOR</span></h1>
            <div style={{ 
              display: 'flex', 
              gap: window.innerWidth <= 480 ? '0.5rem' : '1rem', 
              marginBottom: window.innerWidth <= 480 ? '1rem' : '2rem', 
              flexWrap: 'wrap',
              justifyContent: window.innerWidth <= 768 ? 'center' : 'flex-start',
              width: '100%'
            }}>
              <Button className="anton-button" style={{ 
                backgroundColor: "#0e17236e", 
                border: "1px dotted white", 
                minWidth: window.innerWidth <= 480 ? '80px' : '120px', 
                fontSize: window.innerWidth <= 480 ? '0.9rem' : '1.1rem', 
                padding: window.innerWidth <= 480 ? '0.5rem 1rem' : '0.75rem 1.5rem',
                borderRadius: '6px',
                height: 'auto'
              }} onClick={() => router.push('/register')}>Register</Button>
              <Button className="anton-button" style={{ 
                backgroundColor: "#0e17236e", 
                border: "1px dotted white", 
                minWidth: window.innerWidth <= 480 ? '80px' : '120px', 
                fontSize: window.innerWidth <= 480 ? '0.9rem' : '1.1rem', 
                padding: window.innerWidth <= 480 ? '0.5rem 1rem' : '0.75rem 1.5rem',
                borderRadius: '6px',
                height: 'auto'
              }} onClick={() => router.push('/quiz')}>Join Hunt</Button>
            </div>
            <h3 className="anton-text" style={{ 
              fontSize: 'clamp(0.9rem, 2.5vw, 2rem)', 
              marginBottom: '0.25rem', 
              color: '#fff', 
              textShadow: '2px 2px 8px rgba(0,0,0,0.8)', 
              textAlign: 'inherit',
              lineHeight: '1.4'
            }}>Mozilla Phoniex Club</h3>
            <h3 className="anton-text" style={{ 
              fontSize: 'clamp(0.9rem, 2.5vw, 2rem)', 
              color: '#fff', 
              textShadow: '2px 2px 8px rgba(0,0,0,0.8)', 
              textAlign: 'inherit',
              lineHeight: '1.4'
            }}>8 November</h3>
          </div>
        </div>
      </div>
      <section className="about-section">
        <Flex align="center" justify="space-between" style={{ marginBottom: "14vh", color: "black", height: "max-content" }}>
          <Flex vertical style={{ height: "max-content" }}>
            <h1 className="footer-heading">CREDITS</h1>
            <h1 className="footer-heading footer-10x">To our 10x Developers</h1>
            <h1 className="footer-text">Vibhor Phalke</h1>
            <h1 className="footer-text">Tanish Bhole</h1>
            <h1 className="footer-text">Shashwat Pratap Singh</h1>
            <h1 className="footer-heading footer-10x">To our Leads</h1>
            <h1 className="footer-text">Srijan Sahay Srivastava</h1>
            <h1 className="footer-text">Jayesh Bansal</h1>
            <h1 className="footer-text">Tanya Singh</h1>
            <h1 className="footer-heading footer-10x">Hunt Creaters</h1>
            <h1 className="footer-text">Kasturi Sinha</h1>
            <h1 className="footer-text">Brij Bhushan Sharma</h1>
            <h1 className="footer-heading footer-10x">Collaborated With VR AR MR Team 💖</h1>
          </Flex>
        </Flex>
      </section>
      <section className="rules-section">
        <Flex justify="center" align="center" vertical style={{ marginTop: "50px" }}>
          <h1 className="background-text rules-text">ELITES</h1>
          <h1 className="background-covertext rules-covertext">ELITE</h1>

          {/* <Flex className="desktop" align="center" justify="center" style={{ marginTop :"10px"}} gap={30}>
              {blogContent.map((content, index) => (
                  <FollowerPointerCard
                  key={index}
                  title={
                    <TitleComponent
                      title={blogContent[index].author}
                      avatar={blogContent[index].authorAvatar}
                    />
                  }
                >
                  <div className="card-maindiv">
                    <div className="card-secdiv">
                      <Flex align="center" justify="center" className="card-imageflex">
                        <Image
                        
                          preview={false}
                          src={logo.src}
                          alt="thumbnail"
                          className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 card-hoverimage`}
                        />
                      </Flex>
                    </div>
                    <Flex align="center" justify="center" style={{ padding: "4px" }} vertical>
                      <h2 className="card-title">
                        {blogContent[index].title}
                      </h2>
                      <h2 className="card-description">
                        {blogContent[index].description}
                      </h2>
                    </Flex>
                  </div>
                </FollowerPointerCard>
              ))}
          </Flex> */}

          <Flex align="center" justify="center" className="elites">
            <ExpandableCardDemo />
          </Flex>

          <Flex className="mobile" vertical align="center" justify="center" gap={40}>
            {blogContent.map((content, index) => (
              <FollowerPointerCard
                key={index}
                title={
                  <TitleComponent
                    title={blogContent[index].author}
                    avatar={blogContent[index].authorAvatar}
                  />
                }
              >
                <div className="card-maindiv">
                  <div className="card-secdiv">
                    <Flex align="center" justify="center" className="card-imageflex">
                      <Image

                        preview={false}
                        src={logo.src}
                        alt="thumbnail"
                        className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 card-hoverimage`}
                      />
                    </Flex>
                  </div>
                  <Flex align="center" justify="center" style={{ padding: "4px" }} vertical>
                    <h2 className="card-title">
                      {blogContent[index].title}
                    </h2>
                    <h2 className="card-description">
                      {blogContent[index].description}
                    </h2>
                  </Flex>
                </div>
              </FollowerPointerCard>
            ))}
          </Flex>

        </Flex>
        <div >
          <Flex justify="center" align="center">
            <TextHoverEffect text=".HUNT." />
          </Flex>
        </div>
      </section>
      {/* <footer className="footer-maindiv">
        <Flex align="center" justify="space-between" style={{ marginBottom: "14vh" }}>
          <Flex vertical>
            <h1 className="footer-heading">CREDITS</h1>
            <h1 className="footer-heading footer-10x">To our 10x Developers</h1>
            <h1 className="footer-text">Vibhor Phalke</h1>
            <h1 className="footer-text">Tanish Bhole</h1>
            <h1 className="footer-text">Shashwat Pratap Singh</h1>
          </Flex>
          <Flex vertical>
            <h1 className="footer-heading">CONTACT US</h1>
            <h1 className="footer-text">Please Dont!</h1>
            <h1 className="footer-text">&#8203;</h1>
            <h1 className="footer-text">&#8203;</h1>
          </Flex>
        </Flex>
      </footer> */}
    </div>
  );
}

const blogContent = [
  {
    slug: "amazing-tailwindcss-grid-layouts",
    author: "HACK",
    date: "28th March, 2023",
    title: "Rule 1",
    description:
      "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
    image: "./assets/",
    authorAvatar: "/manu.png",
  },
  {
    slug: "amazing-tailwindcss-grid-layouts",
    author: "HACK",
    date: "28th March, 2023",
    title: "Rule 2",
    description:
      "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
    image: "./assets/",
    authorAvatar: "/manu.png",
  },
  {
    slug: "amazing-tailwindcss-grid-layouts",
    author: "HACK",
    date: "28th March, 2023",
    title: "Rule 3",
    description:
      "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
    image: "./assets/",
    authorAvatar: "/manu.png",
  }
]

const TitleComponent = ({
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex space-x-2 items-center">
    <Image
      src={logo.src}
      height="100px"
      width="100px"
      className="rounded-full border-2 border-white"
    />
  </div>
);
