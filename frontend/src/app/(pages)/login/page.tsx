"use client";

import React, { useState, useEffect, useRef } from "react";
import Terminal, { ColorMode } from "react-terminal-ui";
import "../../styles/teamRegistration.css";
import { Flex } from "antd";
import { useDispatch } from "react-redux";
import { setTeamName } from "@/lib/features/team/teamSlice";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/config/api";

const LoginPage = () => {
    const router = useRouter();
    const [terminalLines, setTerminalLines] = useState([
        <div key="welcome">Enter Y to login</div>,
    ]);
    const dispatch = useDispatch();
    const [isLoginStarted, setIsLoginStarted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [loginData, setLoginData] = useState({
        teamName: "",
        teamPassword: "",
    });
    const [loginComplete, setLoginComplete] = useState(false);
    const [typingText, setTypingText] = useState(""); // State to hold text for the typewriter effect
    const [isTyping, setIsTyping] = useState(false); // Flag to check if typing is happening

    const terminalRef = useRef<HTMLDivElement>(null); // Ref for the Terminal component

    const loginSteps = [
        { prompt: "Enter Team Name:", field: "teamName" },
        { prompt: "Enter Team Password:", field: "teamPassword" },
        { prompt: "Type 'submit' to complete login", field: "submit" },
    ];

    // Function to simulate typewriter effect
    const typeWriterEffect = (text: string, index: number = 0) => {
        setIsTyping(true); // Set typing state to true

        if (index < text.length) {
            setTypingText((prev) => prev + text[index]);
            setTimeout(() => typeWriterEffect(text, index + 1), 50); // Adjust typing speed here
        } else {
            setIsTyping(false); // Typing finished
        }
    };

    const showCurrentStep = () => {
        if (currentStep < loginSteps.length) {
            const stepText = loginSteps[currentStep].prompt;
            setTypingText(""); // Clear previous typing text
            typeWriterEffect(stepText); // Start typewriter effect for the new prompt
        } else {
            setTerminalLines((prevLines) => [
                ...prevLines,
                <div key="login-complete">Login complete!</div>,
            ]);
            setLoginComplete(true);
        }
    };

    const handleCommand = (input: string) => {
        const trimmedInput = input.trim();

        if (!isLoginStarted) {
            setTerminalLines((prevLines) => [
                ...prevLines,
                <div key={`input-${input}`} style={{ color: "green" }}>
                    $ {trimmedInput}
                </div>,
                <div key="start-login">Starting login process...</div>,
            ]);
            setIsLoginStarted(true);
            setCurrentStep(0);
            return;
        }

        if (loginComplete) {
            setTerminalLines((prevLines) => [
                ...prevLines,
                <div key={`input-${input}`} style={{ color: "green" }}>
                    $ {trimmedInput}
                </div>,
                <div key="login-done">Login has already been completed.</div>,
            ]);
            return;
        }

        setTerminalLines((prevLines) => [
            ...prevLines,
            <div key={`input-${input}`} style={{ color: "green" }}>
                $ {trimmedInput}
            </div>,
        ]);

        if (currentStep < loginSteps.length) {
            const currentField = loginSteps[currentStep].field;
            if (currentField === "submit") {
                setTerminalLines((prevLines) => [
                    ...prevLines,
                    <div key="login-complete">Submitting login data...</div>,
                ]);
                console.log("Login Data:", loginData);

                // Call the function to send data to the backend
                sendLoginData(loginData);

                return;
            }

            setLoginData({
                ...loginData,
                [currentField]: trimmedInput,
            });

            setCurrentStep((prev) => prev + 1);
        }
    };

    const sendLoginData = async (data: any) => {
        try {
            const formattedData = {
                team_name: data.teamName,
                team_password: data.teamPassword,
            };
            const response = await fetch(API_ENDPOINTS.LOGIN_TEAM, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            if (response.status === 200) {
                const result = await response.json();
                setTerminalLines((prevLines) => [
                    ...prevLines,
                    <div key="login-success">Login successful! Welcome, {result.team_name}.</div>,
                ]);
                setLoginComplete(true);
                dispatch(setTeamName(result.team_name));
                router.push("/quiz");
            } else if (response.status === 401) {
                const errorResult = await response.json();
                setTerminalLines((prevLines) => [
                    ...prevLines,
                    <div key="login-error" style={{ color: "red" }}>{errorResult.error}</div>,
                ]);
                setCurrentStep(0); // Reset to the first step
                setIsLoginStarted(false); // Reset login process
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            console.error('Error:', error);
            setTerminalLines((prevLines) => [
                ...prevLines,
                <div key="login-error" style={{ color: "red" }}>An error occurred. Please try again later.</div>,
            ]);
            setCurrentStep(0); // Reset to the first step
            setIsLoginStarted(false); // Reset login process
        }
    };

    useEffect(() => {
        if (isLoginStarted && !loginComplete) {
            showCurrentStep();
        }
    }, [currentStep, isLoginStarted]);

    useEffect(() => {
        if (!isLoginStarted) {
            setTerminalLines((prevLines) => [
                <div key="initial-prompt">Press Enter to Login</div>,
            ]);
        }
    }, []);

    useEffect(() => {
        if (!isTyping && typingText.length > 0) {
            // Add the finished typing text to terminal lines when typing is done
            setTerminalLines((prevLines) => [
                ...prevLines,
                <div key={`step-${currentStep}`}>{typingText}</div>,
            ]);
        }
    }, [isTyping]);

    useEffect(() => {
        // Reset scroll position of the terminal to top on component mount
        if (terminalRef.current) {
            (terminalRef.current as HTMLDivElement).scrollTop = 0;
        }
    }, []);

    return (
        <div className="quiz-terminal-container">
            <div className="terminal-box">
                <Flex align="center" justify="center">
                    <h1 style={{ color: 'gray', fontSize: "25px" }}>Terminal</h1>
                </Flex>
                <div className="terminal-container" ref={terminalRef}>
                    <Terminal
                        name="Login"
                        prompt="hacker/::$"
                        colorMode={ColorMode.Dark}
                        onInput={handleCommand}
                        startingInputValue=""
                    >
                        {terminalLines}
                        {isTyping && <div key={`typing-${currentStep}`}>{typingText}</div>}
                    </Terminal>
                </div>
            </div>
        </div >
    );
};

export default LoginPage;