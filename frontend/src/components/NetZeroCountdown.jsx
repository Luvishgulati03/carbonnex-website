import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './NetZeroCountdown.css';

const API_URL = 'http://localhost:8000/api';

const NetZeroCountdown = () => {
    const [clocks, setClocks] = useState([]);
    const [selectedClock, setSelectedClock] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ years: 0, days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        const fetchClocks = async () => {
            try {
                const res = await fetch(`${API_URL}/clocks`);
                if (!res.ok) throw new Error('Failed to fetch clocks');
                const data = await res.json();
                
                if (data.length > 0) {
                    setClocks(data);
                    // Default to global if exists, else first one
                    const globalClock = data.find(c => c.is_global) || data[0];
                    setSelectedClock(globalClock);
                }
            } catch (err) {
                console.error("Could not load net zero clocks:", err);
            }
        };

        fetchClocks();
    }, []);

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [selectedClock]); // Re-run effect if selectedClock changes

    function calculateTimeLeft() {
        // Fallback to 2050 if no clock selected yet
        const targetDateStr = selectedClock ? selectedClock.target_date : '2050-01-01T00:00:00Z';
        const targetDate = new Date(targetDateStr).getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        let timeLeft = {};

        if (difference > 0) {
            const daysInYear = 365.25; // Accounting for leap years roughly
            const msPerDay = 1000 * 60 * 60 * 24;

            const totalDays = Math.floor(difference / msPerDay);
            const years = Math.floor(totalDays / daysInYear);
            const days = Math.floor(totalDays % daysInYear);

            timeLeft = {
                years: years,
                days: days,
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60)
            };
        } else {
            timeLeft = { years: 0, days: 0, hours: 0, minutes: 0 };
        }

        return timeLeft;
    }

    const formatNumber = (num) => {
        return num.toString().padStart(2, '0');
    };

    const handleClockChange = (e) => {
        const clockId = parseInt(e.target.value);
        const clock = clocks.find(c => c.id === clockId);
        if (clock) {
            setSelectedClock(clock);
        }
    };

    return (
        <motion.div
            className="net-zero-countdown-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
            <div className="net-zero-countdown">
                <div className="countdown-header">
                    <span className="scrolling-dot"></span>
                    
                    {clocks.length > 0 ? (
                        <div className="countdown-title-select-wrapper">
                            <select 
                                className="countdown-title countdown-select-green" 
                                value={selectedClock ? selectedClock.id : ''}
                                onChange={handleClockChange}
                            >
                                {clocks.map(clock => (
                                    <option key={clock.id} value={clock.id} style={{color: '#000', textShadow: 'none'}}>
                                        {clock.country_name} NET ZERO TARGET
                                    </option>
                                ))}
                            </select>
                            <span className="dropdown-arrow-green">▼</span>
                        </div>
                    ) : (
                        <span className="countdown-title">NET ZERO TARGET</span>
                    )}

                </div>
                <div className="countdown-timer">
                    <div className="time-block">
                        <span className="time-value glowing-text">{timeLeft.years}</span>
                        <span className="time-label">YRS</span>
                    </div>
                    <span className="time-separator">:</span>
                    <div className="time-block">
                        <span className="time-value glowing-text">{formatNumber(timeLeft.days)}</span>
                        <span className="time-label">DAYS</span>
                    </div>
                    <span className="time-separator">:</span>
                    <div className="time-block">
                        <span className="time-value glowing-text">{formatNumber(timeLeft.hours)}</span>
                        <span className="time-label">HRS</span>
                    </div>
                    <span className="time-separator">:</span>
                    <div className="time-block">
                        <span className="time-value glowing-text">{formatNumber(timeLeft.minutes)}</span>
                        <span className="time-label">MIN</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NetZeroCountdown;
