"use client";

import React, { useState, useEffect, useRef } from "react";
import Terminal, { ColorMode } from "react-terminal-ui";
import "../../styles/teamRegistration.css";
import { Flex } from "antd";
import Image from 'next/image'; // Import Image from next/image
import rankingIcon from "../../assets/icons/ranking.png"; // Import the icon
import rulesIcon from "../../assets/icons/law.png"; // Import the icon
import homeIcon from "../../assets/icons/home.png"; // Import the icon
import { API_ENDPOINTS } from "@/config/api";
import { useRouter } from "next/navigation";
const TeamRegistrationPage = () => {
    const router = useRouter();
    const [terminalLines, setTerminalLines] = useState([
        <div key="welcome">Enter Y to register your team in the event</div>,
    ]);
    const [isRegistrationStarted, setIsRegistrationStarted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [registrationData, setRegistrationData] = useState<{
        teamName: string;
        teamPassword: string;
        players: string[];
    }>({
        teamName: "",
        teamPassword: "",
        players: [],
    });
    const [registrationComplete, setRegistrationComplete] = useState(false);
    const [typingText, setTypingText] = useState(""); // State to hold text for the typewriter effect
    const [isTyping, setIsTyping] = useState(false); // Flag to check if typing is happening

    const terminalRef = useRef(null); // Ref for the Terminal component

    const maxPlayers = 5;
    const enrollmentRegex = /241\d{3}/; // Regex for first-year students
    const otherYearRegex = /^(231b|221b|211b|241\d{3})/; // Updated Regex for all years

    const registrationSteps = [
        { prompt: "Enter Team Name:", field: "teamName" },
        { prompt: "Enter Team Password:", field: "teamPassword" },
        { prompt: "Enter Player 1 Enrollment No:", field: "player1" },
        { prompt: "Enter Player 2 Enrollment No:", field: "player2" },
        { prompt: "Enter Player 3 Enrollment No:", field: "player3" },
        { prompt: "Enter Player 4 Enrollment No (optional):", field: "player4", optional: true },
        { prompt: "Enter Player 5 Enrollment No (optional):", field: "player5", optional: true },
        { prompt: "Type 'submit' to complete registration", field: "submit" }, // Updated step to submit early or continue
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
        if (currentStep < registrationSteps.length) {
            const stepText = registrationSteps[currentStep].prompt;
            setTypingText(""); // Clear previous typing text
            typeWriterEffect(stepText); // Start typewriter effect for the new prompt
        } else {
            setTerminalLines((prevLines) => [
                <div key="registration-complete">Team registration complete!</div>,
            ]);
            setRegistrationComplete(true);
        }
    };

    const handleCommand = (input: string) => {
        const trimmedInput = input.trim();

        if (!isRegistrationStarted) {
            if (trimmedInput.toLowerCase() === "y") {
                setTerminalLines((prevLines) => [
                    ...prevLines,
                    <div key={`input-${input}`} style={{ color: "green" }}>
                        $ {trimmedInput}
                    </div>,
                    <div key="start-registration">Starting team registration...</div>,
                ]);
                setIsRegistrationStarted(true);
                setCurrentStep(0);
                return;
            } else if (trimmedInput.toLowerCase() === "n" || trimmedInput.toLowerCase() === "N") {
                window.close();
            } else {
                setTerminalLines((prevLines) => [
                    ...prevLines,
                    <div key={`input-${input}`} style={{ color: "green" }}>
                        $ {trimmedInput}
                    </div>,
                    <div key="error">Please enter 'Y' to start registration.</div>,
                ]);
                return;
            }
        }

        if (registrationComplete) {
            setTerminalLines((prevLines) => [
                ...prevLines,
                <div key={`input-${input}`} style={{ color: "green" }}>
                    $ {trimmedInput}
                </div>,
                <div key="registration-done">Registration has already been completed.</div>,
            ]);
            return;
        }

        setTerminalLines((prevLines) => [
            ...prevLines,
            <div key={`input-${input}`} style={{ color: "green" }}>
                $ {trimmedInput}
            </div>,
        ]);

        if (currentStep < registrationSteps.length) {
            const currentField = registrationSteps[currentStep].field;

            if (trimmedInput.toLowerCase() === "submit") {
                if (registrationData.players.length >= 3) {
                    sendRegistrationData(registrationData)
                        .then(() => {
                            setTerminalLines((prevLines) => [
                                ...prevLines,
                                <div key="registration-complete">Team registration complete!</div>,
                            ]);
                            setRegistrationComplete(true);
                        })
                        .catch((error) => {
                            setTerminalLines((prevLines) => [
                                ...prevLines,
                                <div key="registration-error">Error in registration: {error.message}</div>, // Display error message
                            ]);
                        });
                } else {
                    setTerminalLines((prevLines) => [
                        ...prevLines,
                        <div key="error">You must enter at least 3 players before submitting.</div>,
                    ]);
                }
                return;
            }

            if (currentField.startsWith("player")) {
                if (registrationData.players.length >= maxPlayers) {
                    setTerminalLines((prevLines) => [
                        ...prevLines,
                        <div key={`error-${currentStep}`}>You cannot enter more than 5 players.</div>,
                    ]);
                    return;
                }

                if (enrollmentRegex.test(trimmedInput) || otherYearRegex.test(trimmedInput)) {
                    const players = [...registrationData.players] as string[];
                    players.push(trimmedInput);
                    setRegistrationData({ ...registrationData, players });

                    if (players.length === 5) {
                        setTerminalLines((prevLines) => [
                            ...prevLines,
                            <div key="submit-prompt">Type 'submit' to complete registration.</div>,
                        ]);
                    } else if (players.length >= 3 && players.length < 5) {
                        setTerminalLines((prevLines) => [
                            ...prevLines,
                            <div key="submit-prompt">Type 'submit' to complete registration or continue entering player enrollment numbers.</div>,
                        ]);
                    }
                } else {
                    setTerminalLines((prevLines) => [
                        ...prevLines,
                        <div key={`error-${currentStep}`}>Invalid enrollment number. Please try again.</div>,
                    ]);
                    return;
                }
            } else {
                setRegistrationData({
                    ...registrationData,
                    [currentField]: trimmedInput,
                });
            }

            setCurrentStep((prev) => prev + 1);
        }
    };

    const sendRegistrationData = async (data: any) => {
        const formattedData = {
            team_name: data.teamName,
            team_password: data.teamPassword, // Changed from team_id to team_password
            users: data.players.map((enrollmentNo: string, index: number) => ({
                EnrollNo: enrollmentNo,
                name: `User${index + 1}`,
            })),
        };
        console.log(formattedData);
        try {
            const response = await fetch(API_ENDPOINTS.REGISTER_TEAM, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse the error response
                throw new Error(errorData.message || 'Network response was not ok'); // Use the error message from the response
            }

            const result = await response.json();
            console.log('Success:', result);
            
            // Navigate to login page after successful registration
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            throw error; // Rethrow the error to be caught in handleCommand
        }
    };

    useEffect(() => {
        if (isRegistrationStarted && !registrationComplete) {
            showCurrentStep();
        }
    }, [currentStep, isRegistrationStarted]);

    useEffect(() => {
        if (!isRegistrationStarted) {
            setTerminalLines((prevLines) => [
                <div key="initial-prompt">Enter Y to register your team in the event</div>,
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
            (terminalRef.current as HTMLDivElement).scrollTop = 0; // Typecast to HTMLDivElement
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
                        name="Registration"
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

export default TeamRegistrationPage;
