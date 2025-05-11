'use client'

import { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TypeWriterProps {
    text: string;
    speed?: number;
    className?: string;
    delay?: number;
    onComplete?: () => void;
}

function TypeWriter({
                        text,
                        speed = 30,
                        className = "",
                        delay = 0,
                        onComplete = () => {}
                    }: TypeWriterProps) {
    const [displayText, setDisplayText] = useState('');
    const [isStarted, setIsStarted] = useState(false);
    const charIndex = useRef(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Reset state when text changes
        setDisplayText('');
        charIndex.current = 0;
        setIsStarted(false);

        // Clear any existing timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Start typing after the delay
        const startTimeout = setTimeout(() => {
            setIsStarted(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [text, delay]);

    useEffect(() => {
        if (!isStarted) return;

        // Clear any existing timer to prevent overlap
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        const typeNextChar = () => {
            if (charIndex.current < text.length) {
                setDisplayText(text.slice(0, charIndex.current + 1));
                charIndex.current += 1;
                timerRef.current = setTimeout(typeNextChar, speed);
            } else {
                onComplete();
            }
        };

        timerRef.current = setTimeout(typeNextChar, speed);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isStarted, text, speed, onComplete]);

    return <span className={className}>{displayText}</span>;
}

interface CodeLineProps {
    indent?: number;
    keyName?: string;
    value?: string;
    comma?: boolean;
    keyColor?: string;
    valueColor?: string;
    delay?: number;
    onComplete?: () => void;
}

function CodeLine({
                      indent = 0,
                      keyName = "",
                      value = "",
                      comma = true,
                      keyColor = "text-green-400",
                      valueColor = "text-amber-300",
                      delay = 0,
                      onComplete = () => {}
                  }: CodeLineProps) {
    const indentSpaces = "  ".repeat(indent);
    const keyText = keyName ? `${indentSpaces}${keyName}: ` : indentSpaces;
    const valueText = `${value}${comma ? ',' : ''}`;

    return (
        <div className="whitespace-pre">
            {keyName ? (
                <>
                    <TypeWriter
                        text={keyText}
                        className={keyColor}
                        delay={delay}
                        onComplete={() => {
                            setTimeout(() => {}, 0);
                        }}
                    />
                    <TypeWriter
                        text={valueText}
                        className={valueColor}
                        delay={delay + keyText.length * 30} // Adjust delay based on key length
                        onComplete={onComplete}
                    />
                </>
            ) : (
                <TypeWriter
                    text={valueText}
                    className={valueColor}
                    delay={delay}
                    onComplete={onComplete}
                />
            )}
        </div>
    );
}

export function InteractiveTerminal() {
    const [isRunning, setIsRunning] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showConstLine, setShowConstLine] = useState(false);
    const [showName, setShowName] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    const [showPassion, setShowPassion] = useState(false);
    const [showCurlyBrace, setShowCurlyBrace] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    // Reset the animation
    const resetAnimation = () => {
        setIsRunning(false);
        setShowPrompt(true);
        setShowLoading(false);
        setShowProfile(false);
        setShowConstLine(false);
        setShowName(false);
        setShowTitle(false);
        setShowLocation(false);
        setShowPassion(false);
        setShowCurlyBrace(false);
        setShowMessage(false);
    };

    // Handle running the animation
    const runAnimation = () => {
        if (isRunning) return;

        setIsRunning(true);

        // Start the animation sequence
        setTimeout(() => setShowLoading(true), 500);
        setTimeout(() => setShowProfile(true), 1800);
        setTimeout(() => setShowConstLine(true), 2000);
        setTimeout(() => setShowName(true), 3300);
        setTimeout(() => setShowTitle(true), 4300);
        setTimeout(() => setShowLocation(true), 5300);
        setTimeout(() => setShowPassion(true), 6300);
        setTimeout(() => setShowCurlyBrace(true), 8000);
        setTimeout(() => setShowMessage(true), 9000);
    };

    return (
        <div className="relative rounded-2xl overflow-hidden border shadow-xl bg-card w-full max-w-md lg:max-w-lg">
            {/* Terminal Header */}
            <div className="bg-muted/80 px-4 py-2 flex items-center justify-between border-b">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="font-mono text-xs text-muted-foreground">elliott@developer ~</div>
                <div className="flex gap-1.5">
                    {!isRunning && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 hover:bg-green-500/20 hover:text-green-500"
                            onClick={runAnimation}
                            title="Run command"
                        >
                            <Play className="h-3 w-3" />
                        </Button>
                    )}
                    {isRunning && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 hover:bg-red-500/20 hover:text-red-500 text-xs"
                            onClick={resetAnimation}
                            title="Reset"
                        >
                            ↺
                        </Button>
                    )}
                </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm bg-black text-green-400 min-h-[350px]">
                {showPrompt && (
                    <div className="flex items-start">
                        <span className="text-green-500 mr-2">$</span>
                        {!isRunning ? (
                            <span className="typing-animation inline-block">node developer-profile.js</span>
                        ) : (
                            <span>node developer-profile.js</span>
                        )}
                    </div>
                )}

                {showLoading && (
                    <div className="mt-3 text-yellow-400">
                        <TypeWriter
                            text="loading developer profile..."
                            className="text-yellow-400"
                            speed={40}
                        />
                    </div>
                )}

                {showProfile && (
                    <div className="mt-4 border border-gray-700 rounded-lg p-4 bg-black/30 shadow-inner">
                        <code className="text-xs md:text-sm">
                            {showConstLine && (
                                <div className="mb-2">
                                    <TypeWriter
                                        text="const "
                                        className="text-blue-400"
                                        delay={0}
                                    />
                                    <TypeWriter
                                        text="developer = {"
                                        className="text-yellow-400"
                                        delay={400}
                                    />
                                </div>
                            )}

                            {showName && (
                                <CodeLine
                                    indent={0}
                                    keyName="name"
                                    value="'Elliott McPherson'"
                                />
                            )}

                            {showTitle && (
                                <CodeLine
                                    indent={0}
                                    keyName="title"
                                    value="'Full-Stack Developer'"
                                />
                            )}

                            {showLocation && (
                                <CodeLine
                                    indent={0}
                                    keyName="location"
                                    value="'Belfast, UK'"
                                />
                            )}

                            {showPassion && (
                                <CodeLine
                                    indent={0}
                                    keyName="passion"
                                    value="'Building exceptional software solutions'"
                                    comma={false}
                                />
                            )}

                            {showCurlyBrace && (
                                <CodeLine
                                    indent={0}
                                    keyName=""
                                    value="};"
                                    comma={false}
                                />
                            )}

                        </code>
                    </div>
                )}

                {showMessage && (
                    <div className="mt-4 text-white">
                        <TypeWriter
                            text="Ready to solve challenging problems and create impactful solutions."
                            speed={25}
                        />
                    </div>
                )}

                {!isRunning && (
                    <div className="absolute bottom-6 right-6">
                        <Button
                            onClick={runAnimation}
                            variant="outline"
                            size="sm"
                            className="bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 px-3 py-1 h-auto text-xs"
                        >
                            Run <Play className="ml-1 h-3 w-3" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}