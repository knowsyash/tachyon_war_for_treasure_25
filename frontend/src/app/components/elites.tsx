"use client";
import Image from "next/image";
import skull from "../assets/skull.gif"
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./use-outsideclick";
import { Button, Flex } from "antd";
import { API_ENDPOINTS } from "../../config/api";

interface User {
  EnrollNo: string;
}

interface Team {
  team_name: string;
  users: User[];
  rank?: number;
}

export function ExpandableCardDemo() {
  const [active, setActive] = useState<any | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  // Fetch teams from database
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Add cache busting to ensure fresh data
        const response = await fetch(`${API_ENDPOINTS.GET_TEAMS}?t=${Date.now()}`, {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched teams data:', data); // Debug log
          // The API returns an array directly
          const teamsData = Array.isArray(data) ? data : (data.value || data.teams || []);
          // Add rank numbers
          const rankedTeams = teamsData.map((team: any, index: number) => ({
            ...team,
            rank: index + 1,
          }));
          console.log('Ranked teams:', rankedTeams); // Debug log
          setTeams(rankedTeams);
        } else {
          console.error('Failed to fetch teams, status:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch teams:', error);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-black dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-black text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {loading ? (
          <div className="text-white text-center py-8">Loading teams...</div>
        ) : teams.length > 0 ? (
          teams.map((team) => {
            const card = {
              title: team.team_name,
              description: `Rank ${team.rank}`,
              src: skull,
              ctaText: "View Team",
              ctaLink: "#",
              content: () => (
                <div>
                  <Flex align="center" justify="center" gap={10} wrap="wrap">
                    {team.users.map((user: User) => (
                      <Button key={user.EnrollNo} className="elite-button">
                        {user.EnrollNo}
                      </Button>
                    ))}
                  </Flex>
                </div>
              ),
            };

            return (
              <motion.div
                style={{ border: "2px solid white", marginBottom: "10px" }}
                layoutId={`card-${team.team_name}-${id}`}
                key={`card-${team.team_name}-${id}`}
                onClick={() => setActive(card)}
                className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
              >
                <div className="flex gap-4 flex-col md:flex-row ">
                  <motion.div layoutId={`image-${team.team_name}-${id}`}>
                    <Image
                      width={100}
                      height={100}
                      src={skull}
                      alt={team.team_name}
                      className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                    />
                  </motion.div>
                  <div className="">
                    <motion.h3
                      layoutId={`title-${team.team_name}-${id}`}
                      className="font-medium  dark:text-neutral-200 text-center md:text-left"
                    >
                      {team.team_name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${team.team_name}-${id}`}
                      className=" dark:text-neutral-400 text-center md:text-left"
                    >
                      Rank {team.rank}
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  layoutId={`button-${team.team_name}-${id}`}
                  className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
                >
                  View Team
                </motion.button>
              </motion.div>
            );
          })
        ) : (
          <div className="text-white text-center py-8">
            No teams registered yet. Be the first to register!
          </div>
        )}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Rank 1",
    title: "Warriors",
    src: skull,

    ctaText: "Open",

    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",
    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241B110</Button>
          <Button className="elite-button">241B161</Button>
          <Button className="elite-button">241B134</Button>
          <Button className="elite-button">241B120</Button>
          <Button className="elite-button">241B219</Button>
        </Flex>
      </div>
    ),
  },
  {
    description: "Rank 2",
    title: "xspark",

    src: skull,
    ctaText: "Open",
    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",

    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241b018</Button>
          <Button className="elite-button">241b303</Button>
          <Button className="elite-button">241b071</Button>

          <Button className="elite-button">241b021</Button>
          <Button className="elite-button">241b254</Button>
        </Flex>
      </div>
    ),
  },
  {
    description: "Rank 3",
    title: "Secretseekers",
    src: skull,

    ctaText: "Open",

    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",
    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241B088</Button>
          <Button className="elite-button">241B268</Button>

          <Button className="elite-button">241B253</Button>
        </Flex>
      </div>
    ),
  },

  {
    description: "Rank 4",
    title: "PUNISHER",
    src: skull,
    ctaText: "Open",

    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",

    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241B192</Button>
          <Button className="elite-button">241B290</Button>

          <Button className="elite-button">241B033</Button>
          <Button className="elite-button">241B206</Button>
        </Flex>
      </div>
    ),
  },
  {
    description: "Rank 5",

    title: "Pegasus",
    src: skull,

    ctaText: "Open",

    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",
    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241b207</Button>
          <Button className="elite-button">241b023</Button>

          <Button className="elite-button">241b138</Button>
          <Button className="elite-button">241b289</Button>

          <Button className="elite-button">241b066</Button>
        </Flex>
      </div>
    ),
  },
  {
    description: "Rank 6",

    title: "Team Godlike",
    src: skull,

    ctaText: "Open",

    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",

    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241B067</Button>
          <Button className="elite-button">241B637</Button>
          <Button className="elite-button">241B100</Button>

          <Button className="elite-button">241B610</Button>
        </Flex>
      </div>
    ),
  },
  {
    description: "Rank 7",

    title: "Kasukabe Defence Group",
    src: skull,
    ctaText: "Open",
    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",

    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241B707</Button>
          <Button className="elite-button">241B063</Button>
          <Button className="elite-button">241B019</Button>

          <Button className="elite-button">241B631</Button>
          <Button className="elite-button">241B705</Button>
        </Flex>
      </div>
    ),
  },

  {
    description: "Rank 8",
    title: "Maharati",

    src: skull,
    ctaText: "Open",
    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",
    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241B043</Button>
          <Button className="elite-button">241B040</Button>

          <Button className="elite-button">241B050</Button>

          <Button className="elite-button">241B620</Button>

          <Button className="elite-button">241B220</Button>
        </Flex>
      </div>
    ),
  },

  {
    description: "Rank 9",

    title: "Temp",
    src: skull,

    ctaText: "Open",

    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",

    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241B048</Button>
          <Button className="elite-button">241B089</Button>
          <Button className="elite-button">241B044</Button>
        </Flex>
      </div>
    ),
  },
  {
    description: "Rank 10",

    title: "BADMOSHHH",

    src: skull,
    ctaText: "Open",
    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",
    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241B612</Button>
          <Button className="elite-button">241B276</Button>
          <Button className="elite-button">241B006</Button>

          <Button className="elite-button">241B196</Button>
          <Button className="elite-button">241B602</Button>
        </Flex>
      </div>
    ),
  },
  {
    description: "Rank 11",
    title: "Legendary seekers",

    src: skull,
    ctaText: "Open",
    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",
    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241B603</Button>
          <Button className="elite-button">241B055</Button>
          <Button className="elite-button">241B095</Button>
        </Flex>
      </div>
    ),
  },
  {
    description: "Rank 12",
    title: "MISFITS",
    src: skull,
    ctaText: "Open",
    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",
    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241B184</Button>
          <Button className="elite-button">241B704</Button>
          <Button className="elite-button">241B638</Button>

          <Button className="elite-button">241B119</Button>
          <Button className="elite-button">241B178</Button>
        </Flex>
      </div>
    ),
  },
  {
    description: "Rank 13",
    title: "JINX",
    src: skull,
    ctaText: "Open",
    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",
    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241B633</Button>
          <Button className="elite-button">241B296</Button>
          <Button className="elite-button">241B325</Button>
          <Button className="elite-button">241B187</Button>
          <Button className="elite-button">241B267</Button>
        </Flex>
      </div>
    ),
  },
  {
    description: "Rank 14",
    title: "TheTrackers",
    src: skull,

    ctaText: "Open",
    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",
    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241B113</Button>

          <Button className="elite-button">241B222</Button>
          <Button className="elite-button">241B200</Button>
          <Button className="elite-button">241B285</Button>
        </Flex>
      </div>
    ),
  },
  {
    description: "Rank 15",
    title: "#include<>",
    src: skull,
    ctaText: "Open",
    ctaLink: "https://gifsec.com/wp-content/uploads/2022/09/congrats-gif-5.gif",

    content: () => (
      <div>
        <Flex align="center" justify="center" gap={10}>
          <Button className="elite-button">241B030</Button>
          <Button className="elite-button">241B279</Button>

          <Button className="elite-button">241B278</Button>
          <Button className="elite-button">241B049</Button>
        </Flex>
      </div>
    ),
  },
];
