"use client";
import { message } from "antd";
import React, { useState, useEffect } from "react";
import Terminal, { ColorMode } from "react-terminal-ui";
import "../../styles/quiz.css";
import { Flex } from "antd";
import { useAppSelector } from "@/lib/hooks"; // Import useAppSelector
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Modal } from "antd";
import { FloatButton } from "antd";
import { API_ENDPOINTS, API_CONFIG } from "@/config/api";

const QuizPage = () => {
  const teamName = useAppSelector((state) => state.team.teamName);
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(false); // State to manage lock status
  const [terminalLines, setTerminalLines] = useState([
    <div key="welcome">Welcome to the Quiz!</div>,
  ]);
  const [messageApi, contextHolder] = message.useMessage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [quizData, setQuizData] = useState<{ question_text: string, question_id: string, question_discription: string }[]>([]);
  const [hint, setHint] = useState("");
  const [hints, setHints] = useState<string[]>([]); // State to store hints
  const [isHintModalVisible, setIsHintModalVisible] = useState(false); // State to manage hint modal visibility

  const checkTeamLocked = async () => {

    try {
      const response = await fetch(API_ENDPOINTS.TEAM_LOCKED, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ team_name: teamName }),
      });
      const data = await response.json();
      if (data.locked) {
        setIsLocked(true);
      }
    } catch (error) {
      console.error("Error checking team lock status:", error);
    }
  };

  const fetchQuizData = async () => {
    try {
      console.log(teamName);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({ team_name: teamName });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect // Type assertion added here
      };

      const response = await fetch(API_ENDPOINTS.UNSOLVED_QUESTIONS, requestOptions);
      const data = await response.json();
      console.log(data);
      setQuizData(data.map((item: any) => ({
        question_text: item.question_text,
        question_id: item.question_id,
        question_discription: item.question_description,
      })));
      console.log("quizData", data.map((item: any) => ({
        question_text: item.question_text,
        question_id: item.question_id,
        question_discription: item.question_description,
      }))); // Log the value of quizData after setting it
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const fetchHints = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_HINTS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setHints(data.map((hint: any) => hint.hintText)); // Extract hintText from each hint object
    } catch (error) {
      console.error("Error fetching hints:", error);
    }
  };

  const handleHintButtonClick = () => {
    fetchHints();
    setIsHintModalVisible(true);
  };

  useEffect(() => {
    if (!teamName) {
      router.push("/login");
    } else {
      checkTeamLocked(); // Check if the team is locked
      fetchQuizData();
    }
  }, [teamName, router]);

  useEffect(() => {
    const socket = new WebSocket(API_CONFIG.WS_URL);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const messageReceived = JSON.parse(event.data);
      if (messageReceived.type === "lock_all" || (messageReceived.type === "lock" && messageReceived.team_name === teamName)) {
        console.log("Team locked");
        setIsLocked(true);
      }
      else if (messageReceived.type === "lock" && messageReceived.team_name !== teamName) {
        console.log("Team locked");
        messageApi.open({
          type: 'warning',
          content: messageReceived.team_name + " is locked from the quiz",
          duration: 3,
        })
      }
      else if (messageReceived.type === "unlock_all" || (messageReceived.type === 'unlock' && messageReceived.team_name == teamName)) {
        setIsLocked(false);
        fetchQuizData();
        setQuizStarted(false);
        setTerminalLines([
          <div key="welcome">Welcome to the Quiz!</div>,
          <div key="instructions">Use 'answer [your answer]' to answer the questions.</div>,
        ]);
      }
      else if (messageReceived.type === "hint") {
        setHint(messageReceived.hint);
        console.log(messageReceived.hint);
        messageApi.open({
          type: 'warning',
          content: messageReceived.hint,
        })

      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return () => {
        socket.close();
      };
    }
  }, []);

  const typeWriterEffect = (text: string, index: number = 0) => {
    setIsTyping(true);
    if (index < text.length) {
      setTypingText((prev) => prev + text[index]);
      setTimeout(() => typeWriterEffect(text, index + 1), 50);
    } else {
      setIsTyping(false);
    }
  };

  const showCurrentQuestion = () => {
    if (currentQuestionIndex < quizData.length) {
      const questionText = `Question ${quizData[currentQuestionIndex].question_text}: ${quizData[currentQuestionIndex].question_discription}`;
      setTypingText("");
      typeWriterEffect(questionText);
    } else {
      setTerminalLines((prevLines) => [
        <div key="quiz-end">Quiz finished! Great job!</div>,
      ]);
    }
  };

  const validateAnswer = async (userAnswer: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.SUBMIT_ANSWER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer: userAnswer, question_id: quizData[currentQuestionIndex].question_id, team_name: teamName }),
      });
      const data = await response.json();
      console.log(data);
      return data.message;
    } catch (error) {
      console.error("Error validating answer:", error);
      return "Error validating answer.";
    }
  };

  const handleCommand = async (input: string) => {
    const trimmedInput = input.trim();
    setTerminalLines((prevLines) => [
      ...prevLines,
      <div key={`input-${Date.now()}`} style={{ color: "Green" }} >${trimmedInput}</div>
    ]);

    if (trimmedInput.toLowerCase() === "clear") {
      setTerminalLines([]);
      if (quizStarted) {
        showCurrentQuestion();
      } else {
        setTerminalLines([
          <div key="initial-prompt">Press Enter to start the quiz</div>,
          <div key="instructions">Use 'answer [your answer]' to answer the questions.</div>,
        ]);
      }
      return;
    }

    if (!quizStarted) {
      setQuizStarted(true);
      showCurrentQuestion();
      return;
    }

    if (currentQuestionIndex >= quizData.length) {
      setTerminalLines((prevLines) => [
        ...prevLines,
        <div key={`quiz-over-${Date.now()}`}>The quiz has ended.</div>,
      ]);
      return;
    }

    if (trimmedInput.startsWith("answer ")) {
      const userAnswer = trimmedInput.replace("answer ", "").trim();
      const message = await validateAnswer(userAnswer);

      const isCorrect = message === 'Correct answer! Question marked as completed.' || message === 'This team has already submitted the correct answer for this question.';
      const messageColor = isCorrect ? 'green' : 'red';

      setTerminalLines((prevLines) => [
        ...prevLines,
        <div key={`feedback-${Date.now()}`} style={{ color: messageColor }}>{message}</div>,
      ]);

      if (isCorrect) {
        setTerminalLines((prevLines) => [
          ...prevLines,
          <div key={`continue-${Date.now()}`}>Press Enter to continue...</div>,
        ]);
        setQuizStarted(false); // Temporarily stop the quiz until Enter is pressed
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to the next question
      }
    } else {
      setTerminalLines((prevLines) => [
        ...prevLines,
        <div key={`unknown-command-${Date.now()}`}>
          Unknown command: {trimmedInput}. Use 'answer [your answer]' to answer the question.
        </div>,
      ]);
    }
  };

  useEffect(() => {
    if (quizStarted && currentQuestionIndex < quizData.length) {
      showCurrentQuestion();
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (!quizStarted) {
      setTerminalLines((prevLines) => [
        <div key="initial-prompt">Press Enter to start the quiz</div>,
        <div key="instructions">Use 'answer [your answer]' to answer the questions.</div>,
      ]);
    }
  }, []);

  useEffect(() => {
    if (!isTyping && typingText.length > 0) {
      setTerminalLines((prevLines) => [
        ...prevLines,
        <div key={`step-${currentQuestionIndex}`}>{typingText}</div>,
      ]);
    }
  }, [isTyping]);

  useEffect(() => {
    if (terminalRef.current) {
      (terminalRef.current as HTMLDivElement).scrollTop = 0;
    }
  }, []);

  return (
    <div className="quiz-terminal-container">
      {contextHolder}
      <div className="terminal-box">
        <Flex align="center" justify="center">
          <h1 style={{ color: 'gray', fontSize: "25px" }}>Terminal</h1>
        </Flex>
        <div className="terminal-container" ref={terminalRef}>
          <Terminal
            name="Quiz"
            prompt="hacker/::$"
            colorMode={ColorMode.Dark}
            onInput={handleCommand}
            startingInputValue=""
          >
            {terminalLines}
            {isTyping && <div key={`typing-${currentQuestionIndex}`}>{typingText}</div>}
          </Terminal>
        </div>
      </div>
      <FloatButton
        style={{ position: 'fixed', top: 20, right: 20 }}
        onClick={handleHintButtonClick}
      >
        Hints
      </FloatButton>
      <Modal
        title="Hints"
        visible={isHintModalVisible}
        onCancel={() => setIsHintModalVisible(false)}
        footer={null}
      >
        <ul>
          {hints.map((hint, index) => (
            <li key={index}>{hint}</li>
          ))}
        </ul>
      </Modal>
      <Modal
        title="Team Locked"
        visible={isLocked}
        footer={null}
      >
        {/* <Image src={lock.src}></Image> */}
        <div className="tenor-gif-embed" data-postid="17684561" data-share-method="host" data-aspect-ratio="1.69312" data-width="100%"><a href="https://tenor.com/view/carry-minati-ajey-nagar-indian-you-tuber-carry-minati-roast-carry-gif-17684561">Carry Minati Ajey Nagar GIF</a>from <a href="https://tenor.com/search/carry+minati-gifs">Carry Minati GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
      </Modal>
    </div>
  );
};

export default QuizPage;
